import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as crypto from 'crypto'
import { extname } from 'path';
import { Response } from 'express';
require('dotenv').config()

@Controller()
export class UploadController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/uploads',
            filename(_, file, callback) {
                const randomName = crypto.randomBytes(32).toString('hex')
                return callback(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            url: `http://${process.env.HOST}:5000/uploads/${file.filename}`
        }
    }

    @Get('uploads/:path')
    async get(@Param('path') path, @Res() res: Response) {
        res.sendFile(path, { root: 'public/uploads' })
    }
}
