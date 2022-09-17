import { PubSubEngine } from "graphql-subscriptions";
import { NotificationModel } from "../schema/Notification.schema";
import { TransactionModel } from "../schema/transaction.schema";
import IContext from "../types/context";
import { getNotificationInput, NotificationPayload, startOrderInput } from "../types/input";
import { NOTIFICATIONTYPE } from "../utils/util";

export class NotificationService {
async getNewNotification(input:getNotificationInput,context:IContext){
    try{
        
        const notifications = await NotificationModel.find({to: context?.user?._id})
        .sort({  createdAt: -1 })
        .limit(input.limit)
        console.log({notifications})
        return {notifications,status:true}
    }catch(e){
        return {status:false,message:"error"}
    }
}

async startOrder(input:startOrderInput,context:IContext, pubSub:PubSubEngine){
    try{
        const notifications = await NotificationModel.findOne({_id:input.notificationID})
        

        const transaction = await TransactionModel.create({
            tailor:context?.user?._id,
            client:input.clientID,
            clothID:notifications?.clothID,
            quantity:"1"
        })
        await NotificationModel.findOneAndUpdate({_id:input.notificationID},
                {
                    $set: {type:NOTIFICATIONTYPE.START_ORDER,read_status:true,tx_id:transaction._id}
                },{new:true}
            )
         // register notification
      

        const notification = await NotificationModel.create({
            from:context?.user?._id,
            to:input.clientID,
            type:NOTIFICATIONTYPE.START_ORDER,
            message:"Tailor has started your order, please check your order status",
            title:"Tailor approved order",
            clothID:notifications?.clothID,
            read_status:false,
            tx_id:transaction._id
        })

        const payload: NotificationPayload = { status: true, notification };
       
        await pubSub.publish('NOTIFICATIONS', payload);  
     return {status:true,data:"success"}
    }catch(e){
        console.log(e)
    }
}
}