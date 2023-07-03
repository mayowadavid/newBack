import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminEmailSettingDto } from './dto/create-admin-email-setting.dto';
import { UpdateAdminEmailSettingDto } from './dto/update-admin-email-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { AdminEmailSetting } from './entities/admin-email-setting.entity';
@Injectable()
export class AdminEmailSettingsService {
  constructor(
    @InjectRepository(AdminEmailSetting)
    private AdminSettingsRepository: Repository<AdminEmailSetting>,
  ) {}
  async sendMail(createAdminEmailSettingDto: CreateAdminEmailSettingDto) {
    const {
      email,
      password,
      sender,
      outgoing_mail,
      s_smtp_port,
      technical_information,
      information,
      receiver,
    } = createAdminEmailSettingDto;
    const data = {
      email,
      password,
      sender,
      outgoing_mail,
      s_smtp_port,
      technical_information,
      information,
    };
    const res = Object.entries(data).find(
      (d) => d[1] == '' || d[1] == null || d[1] == undefined,
    );
    if (res) throw new BadRequestException(`${res[0]} can't be undefined`);
    const transporter = nodemailer.createTransport({
      port: s_smtp_port,
      host: outgoing_mail,
      auth: {
        user: email,
        pass: password,
      },
      secure: true,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailData = {
      from: email,
      to: receiver,
      subject: technical_information,
      html: information,
    };

    await transporter.sendMail(mailData, function (err, info) {
      const message = 'Your email successfully sent!';
      if (err) {
        throw new BadRequestException(err);
      } else {
        return message;
      }
    });
  }

  async create(createAdminEmailSettingDto: CreateAdminEmailSettingDto) {
    const res = Object.entries(createAdminEmailSettingDto).find(
      (d) => d[1] == '' || d[1] == null || d[1] == undefined,
    );
    if (res) throw new BadRequestException(`${res[0]} can't be undefined`);
    const adminSettings = await this.AdminSettingsRepository.create(
      createAdminEmailSettingDto,
    );
    return this.AdminSettingsRepository.save(adminSettings);
  }

  findAll(): Promise<AdminEmailSetting[]> {
    return this.AdminSettingsRepository.find({});
  }

  findOne(id: string) {
    return this.AdminSettingsRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    updateAdminEmailSettingDto: UpdateAdminEmailSettingDto,
  ): Promise<AdminEmailSetting> {
    const AdminEmailSetting: AdminEmailSetting =
      await this.AdminSettingsRepository.findOne({
        where: {
          id,
        },
      });
    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updateAdminEmailSettingDto);
    const result = { ...AdminEmailSetting, ...value };
    return this.AdminSettingsRepository.save(result);
  }

  async remove(id: string) {
    const deleteAdminEmailSetting = await this.AdminSettingsRepository.findOne({
      where: { id },
    });
    const copy = { ...deleteAdminEmailSetting };
    const result = await this.AdminSettingsRepository.save(copy);
    await this.AdminSettingsRepository.remove(result);
    return copy;
  }
}
