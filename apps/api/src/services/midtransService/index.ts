import prisma from "@/connection"
import dotenv from 'dotenv'
import { Status } from "@prisma/client"
import { IHandleMidtransNotification } from "./type"
import { addHours } from "date-fns"

dotenv.config()
export const handleMidtransNotificationService = async ({ orderId, transactionStatus }: IHandleMidtransNotification) => {
    await prisma.$transaction(async (tx) => {
        const transactionRecord = await tx.order.findUnique({
            where: { id: orderId },
        });

        if (!transactionRecord) throw { msg: "Transaksi tidak tersedia", status: 404 };
        let updatedStatus: Status;

        if (transactionStatus === "settlement" || transactionStatus === "capture") {
            updatedStatus = "PAYMENT_DONE";
            const lastStatus = await tx.orderStatus.create({
                data: {
                    orderId: orderId,
                    status: updatedStatus,
                    createdAt: new Date()
                },
            });

            if (!lastStatus) throw { msg: 'Order status gagal di-update, silahkan coba lagi' }
            const findDataStatus = await tx.order.findFirst({ where: { id: orderId } })

            if (!findDataStatus?.isPaid) {
                const order = await tx.order.update({
                    where: {
                        id: orderId
                    },
                    data: {
                        isPaid: true
                    }
                })

                if (!order) throw { msg: 'Order tidak ditemukan', status: 404 }
            }

            return true
        } else if (transactionStatus === "pending") {
            updatedStatus = Status.AWAITING_PAYMENT;
        } else if (transactionStatus === "deny" || transactionStatus === "expire" || transactionStatus === "cancel") {
            updatedStatus = Status.AWAITING_PAYMENT;
            await tx.order.update({
                where: { id: orderId },
                data: { isPaid: false, paymentMethod: null }
            })
            
            throw { msg: 'Ada kesalahan saat membayar', status: 400 }
        } else {
            updatedStatus = Status.AWAITING_PAYMENT;
        }
    })
}