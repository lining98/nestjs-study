import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { zip } from 'compressing';
import { join } from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log('file', file);
    return 'aaaaaaaa';
  }

  @Get('export')
  downLoad(@Res() res: Response) {
    const url = join(__dirname, '../images/1694852777165.jpg');
    res.download(url);
  }

  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1694852777165.jpg');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=xiaoning`);

    tarStream.pipe(res);
  }
}
