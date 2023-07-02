import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as shell from 'shelljs';
import { Connection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('download')
  async downloadTables(@Res() res: Response) {
    const exportFileName = 'database_dump.sql';

    const username = this.configService.get<string>('username');
    const password = this.configService.get<string>('password');
    const database = this.configService.get<string>('database');

    // Use mysqldump command-line utility to generate the SQL dump
    shell.exec(
      `mysqldump -u ${username} -p${password} ${database} > ${exportFileName}`,
    );

    // Read the content of the SQL dump file
    const fileContent = fs.readFileSync(exportFileName, 'utf8');

    // Set headers for the response
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `inline; filename=${exportFileName}`);
    console.log(fileContent, 'file');
    // Send the file content as the response
    res.send(fileContent);

    // Remove the temporary SQL dump file
    shell.rm(exportFileName);
  }
}
