import prisma from "@/connection"
import { validateEmail } from "@/middlewares/validation/emailValidation"
import { phoneNumberValidation } from "@/middlewares/validation/phoneNumberValidation"
import { compile } from "handlebars"
import fs from 'fs'
import { transporter } from "@/utils/transporter"
import { IContactMessage } from "./types"
import path from "path"

export const createContactMessageService = async ({ email, phoneNumber, userId, textHelp, name }: IContactMessage) => {
    if (!validateEmail(email)) throw { msg: 'Harap masukan format email dengan benar', status: 401 }
    if (!phoneNumberValidation(phoneNumber)) throw { msg: 'Harap masukan format dengan angka', status: 401 }
    const messageUser = await prisma.contact.create({ data: { name, email, phoneNumber, userId: userId, textHelp } })

    if (messageUser) {
        const emailFile = fs.readFileSync(path.join(__dirname, '../../../src/public/sendMail/emailContact.html'), 'utf-8')
        let template = compile(emailFile)
        const compiledHtml = template({ firstName: name, url: 'https://clean-n-click-application.vercel.app/' })
        await transporter.sendMail({
            to: email,
            subject: 'Terimakasih telah menghubungi kami',
            html: compiledHtml
        })
    }
}

export const getContactMessageService = async () => {
    const findMessageUser = await prisma.contact.findMany({
        where: { deletedAt: null },
        include: {
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    profilePicture: true,
                    phoneNumber: true,
                    email: true,
                },
            }
        }
    })

    return { findMessageUser }
}
