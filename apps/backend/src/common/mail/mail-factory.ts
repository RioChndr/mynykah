import { MailConfig } from 'src/config/mail.config';
import { MailServiceNodemailer } from './mail-service-nodemailer';
import { MailMessageType, MailServiceI } from './mail-service.interface';

export class MailFactory implements MailServiceI {
  mailService: MailServiceI;
  setup() {
    const service = MailConfig.service;

    this.mailService = this.getMailService(service);
    return this.mailService.setup();
  }

  getMailService(service: string): MailServiceI {
    if (service === 'nodemailer') {
      return new MailServiceNodemailer();
    }
    throw 'No service email selected';
  }

  send(message: MailMessageType) {
    return this.mailService.send(message);
  }
}
