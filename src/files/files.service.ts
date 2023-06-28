import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promises as fsPromises } from 'fs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private configService: ConfigService,
  ) {}

  async upload(file): Promise<object> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    let fileType: string;
    const imageTypes = [
      'image/jpeg',
      'image/png',
      'image/tiff',
      'image/svg+xml',
    ];
    const audioTypes = ['audio/mpeg'];
    const videoTypes = ['video/mpeg', 'video/mp4'];
    const documentTypes = [
      'application/msword',
      'application/gzip',
      'application/vnd.oasis.opendocument.text',
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.rar',
      'video/mp2t',
      'text/plain',
      'application/zip',
      'application/x-7z-compressed',
    ];
    const gifTypes = ['image/gif'];

    if (imageTypes.includes(file.mimetype)) {
      fileType = 'image';
    } else if (audioTypes.includes(file.mimetype)) {
      fileType = 'audio';
    } else if (videoTypes.includes(file.mimetype)) {
      fileType = 'video';
    } else if (documentTypes.includes(file.mimetype)) {
      fileType = 'document';
    } else if (gifTypes.includes(file.mimetype)) {
      fileType = 'gif';
    } else {
      throw new HttpException('Invalid file type', HttpStatus.BAD_REQUEST);
    }

    const ext = extname(file.originalname);
    const photoName = `${uuidv4()}${ext}`;
    const parentDir = join(__dirname, '..', '..');
    const destinationDir = join(parentDir, 'uploads');
    const uploadPath = join(destinationDir, photoName);
    await this.transferFile(file.path, uploadPath);

    const url = `${process.env.FRONT_END_URL}/uploads/${photoName}`;

    const result = { url, fileType: file.mimetype };
    console.log(result);

    return result;
  }

  async transferFile(
    sourceFilePath: string,
    uploadPath: string,
  ): Promise<void> {
    const uploadDir = join(uploadPath, '..');

    try {
      // Create the upload directory if it doesn't exist
      await fsPromises.mkdir(uploadDir, { recursive: true });

      // Move the file by renaming it to the upload path
     // await fsPromises.rename(sourceFilePath, uploadPath);
    } catch (error) {
      // Handle any error that occurs during the file transfer
      throw new Error(`Failed to transfer file: ${error.message}`);
    }
  }

  create(createFileDto: CreateFileDto): Promise<any> {
    const file = this.fileRepository.create(createFileDto);
    return this.fileRepository.save(file);
  }

  findAll(): Promise<File[]> {
    return this.fileRepository.find({
      relations: [],
    });
  }

  findOne(id: string): Promise<File> {
    return this.fileRepository.findOne({ where: { id } });
  }

  update(id: string, updateFileDto: UpdateFileDto) {
    const file: File = this.fileRepository.create(updateFileDto);
    file.id = id;
    return this.fileRepository.save(file);
  }

  async remove(id: string) {
    const deleteFile = await this.fileRepository.findOne({
      where: { id },
      relations: [],
    });
    await this.fileRepository.remove(deleteFile);
    return deleteFile;
  }
}
