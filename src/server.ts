import dotenv from "dotenv"

dotenv.config()
import "reflect-metadata"
import express from "express"
import mongoose from "mongoose"
import { ApolloServer } from "apollo-server-express"

import { AuthChecker, buildSchema } from "type-graphql"

import {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageGraphQLPlayground,
  } from 'apollo-server-core';
import customAuthChecker from "./config/authorization"
import {resolvers} from "./resolver"
import IContext from "./types/context"
import { verifyJwt } from "./utils"
import { User } from "./schema/user.schema"

  const Bootstrap = async () => {
    const schema = await buildSchema({
        resolvers,
        nullableByDefault: true,
        authChecker: customAuthChecker
    })

    const app = express()

    const server = new ApolloServer({
        schema,
        context: (ctx: IContext) => {
            const context = ctx;
            if(context.req.headers.authorization) {
              const token : string = context.req.headers.authorization.split(" ")[1]
              const user = verifyJwt<User>(token)
              // console.log({user})
              context.user = user
            }
            return context
        },
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    csrfPrevention: true
    })

    await server.start()

    const origin : string = "*";

    const corsOptions: { origin : string , credentials: boolean} = {
      origin,
      credentials: true
    };

    // apply middle ware
    server.applyMiddleware({app,path:"/graphql",cors:corsOptions})

    const PORT = process.env.PORT || 4000

    app.listen({port:PORT},() => {
        console.log(`Server is running on port ${PORT}`)
    })

    const connection: string | any = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_DEV


    try {
      await mongoose.connect(connection)
    }catch(error) {
      console.log(error)
    }
  }

Bootstrap()