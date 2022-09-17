import { PubSubEngine } from "graphql-subscriptions";
import {  Arg, Authorized, Ctx, Mutation, PubSub, Query, Resolver, Root, Subscription } from "type-graphql";
import { AddItemToCartResponse } from "../Response/AuthenticationResponse";
import { NotificationResponseSub, NotificationResponseSubArray } from "../Response/Client";

import { NotificationService } from "../services/notification.service"
import IContext from "../types/context";
import { getNotificationInput, NotificationPayload, startOrderInput } from "../types/input";


@Resolver()

export class NotificationResolver {
    constructor(private notificationService: NotificationService) {
        this.notificationService = new NotificationService()

    }

    @Authorized()
    @Query(() => NotificationResponseSubArray)
    getNewNotification(@Arg('input')input:getNotificationInput, @Ctx() context:IContext){
        return this.notificationService.getNewNotification(input,context)
    }

    @Authorized()
    @Mutation(()=>AddItemToCartResponse)
    startOrder(@Arg('input') input: startOrderInput,@Ctx() context:IContext, @PubSub() pubSub: PubSubEngine) {
        return this.notificationService.startOrder(input,context, pubSub)
    }

        @Subscription({ 
            topics: "NOTIFICATIONS",
            // filter: ({ payload, args }:{payload:Notifications,args:any}) => {
            //     console.log(payload,args)
               
            //     return args.priorities.includes(payload.to)
            // }
           
        })
        newNotification(
            @Root() param: NotificationPayload
            ): NotificationResponseSub {
          return { ...param };
        }
     
}