import dotenv from "dotenv"

dotenv.config()
import "reflect-metadata"
import express from "express"
import mongoose from "mongoose"
import { ApolloServer } from "apollo-server-express"

import { AuthChecker, buildSchema, buildTypeDefsAndResolvers } from "type-graphql"
import { createServer } from 'http';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import customAuthChecker from "./config/authorization"
import {Resolvers} from "./resolver"
import IContext from "./types/context"
import { verifyJwt } from "./utils"
import { User } from "./schema/user.schema"
// import {getConfiguredRedisPubSub} from "graphql-redis-subscriptions"


  const Bootstrap = async () => {

    // const myRedisPubSub = getConfiguredRedisPubSub();
    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
      resolvers: Resolvers,
      // pubSub: myRedisPubSub,
      nullableByDefault: true,
      authChecker: customAuthChecker,
    });
  
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    // const schema = await buildSchema({
    //     resolvers,
    //     nullableByDefault: true,
    //     authChecker: customAuthChecker
    // })

    const app = express()

    
    const httpServer = createServer(app);

    const wsServer = new WebSocketServer({
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // Pass a different path here if your ApolloServer serves at
      // a different path.
      path: '/graphql',
    });

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
      // process.env.NODE_ENV === 'production'
      //   ? ApolloServerPluginLandingPageProductionDefault()
      //   : ApolloServerPluginLandingPageGraphQLPlayground(),
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
        ApolloServerPluginLandingPageLocalDefault({ embed: true })
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
    
    const serverCleanup = useServer({ schema }, wsServer);


    httpServer.listen({port:PORT},() => {
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