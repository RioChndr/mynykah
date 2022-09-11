import { createTransport, Transporter } from 'nodemailer';
import { MailConfig } from 'src/config/mail.config';
import { isAllValueNotNullish } from 'src/utils/function';
import { MailMessageType, MailServiceI } from './mail-service.interface';

export class MailServiceNodemailer implements MailServiceI {
  transporter: Transporter;

  setup(...params: any): boolean {
    const configAuth = this.getTransporterConfig();
    if (!configAuth) return false;
    this.transporter = createTransport(configAuth);
    return true;
  }

  send(message: MailMessageType) {
    if (!message.from) {
      message.from = MailConfig.from;
    }
    return this.transporter.sendMail(message);
  }

  private getTransporterConfig() {
    const configAuth = MailConfig?.stmpAuth ?? null;
    if (!configAuth || !isAllValueNotNullish(configAuth)) return false;

    return configAuth;
  }
}
