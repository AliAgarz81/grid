import { Controller, Get, NotFoundException, Param, Res } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs';

@Controller()
export class AppController {

    @Get('uploads/:filename')
    showFile(@Res() res, @Param('filename') filename) {
        const filePath = path.resolve('./uploads', filename);
        if(fs.existsSync(filePath)) {
            return res.sendFile(filePath);
        } else {
            throw new NotFoundException("File doesn't exists");
        }
    }
}