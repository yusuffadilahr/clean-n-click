import express, { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import router from './routes'
import dotenv from 'dotenv'
import { dbConnect } from './connection'
import { portConnect } from './utils/asciiText/dbConnect'
import fs from 'fs'
import { logger } from '@/utils/logger'
import mysql from 'mysql2/promise'

dotenv.config()
const port: string | undefined = process.env.PORT as string

const app: Express = express()
app.use(express.json())

const corsOption = {
    origin: '*',
    credentials: true
}
app.use(cors(corsOption))
app.use('/api', router)

interface IError extends Error {
    msg: string,
    status: number
}

interface UploadedFiles {
    images?: { path: string }[];
}

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST as string,
            user: process.env.DATABASE_USER as string,
            password: process.env.DATABASE_PASSWORD as string,
            database: process.env.DATABASE_NAME as string,
            port: 3306
        });

        console.log('Connected to DB!');
        await connection.end();
    } catch (error) {
        console.error('Connection error:', error);
    }
}


app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
    // const imagesUpload = req.files as UploadedFiles | undefined;
    // if (imagesUpload?.images?.length != 0 || imagesUpload?.images?.length != undefined) {
    //     imagesUpload?.images?.forEach((img) => {
    //         fs.rmSync(`${img?.path}`)
    //     });
    // }
    logger.error(`ERROR ${error.status || 500} ${error.msg} - URL: ${req.method} ${req.url} ERROR_SERVER: ${error?.message || ''}`);
    if (error?.message === 'jwt expired') throw { msg: 'jwt expired', status: 628 }
    res.status(error?.status || 500).json({
        error: true,
        message: error?.msg || 'Ada kesalahan dari sisi server',
        data: {}
    })
})

dbConnect()
testConnection();

app.listen(port, () => console.log(portConnect))