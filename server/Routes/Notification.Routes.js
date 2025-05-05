import express from "express"

import { deleteNotification, getAllNotifications, markAllAsRead, markAsRead } from "../Controllers/Notification.Controller"


const Router=express.Router()



Router.route("/getNotifications").get(getAllNotifications)
Router.route("/markAsRead/:id").put(markAsRead)
Router.route("/markAllAsRead").put( markAllAsRead);
Router.route("/deleteNotification/:id").delete(deleteNotification)









export default Router