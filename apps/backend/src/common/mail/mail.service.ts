import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailFactory } from './mail-factory';
import { MailMessageType } from './mail-service.interface';

@Injectable()
export class MailService implements OnModuleInit {
  MailFactory: MailFactory;

  onModuleInit() {
    if (!this.MailFactory) {
      this.MailFactory = new MailFactory();
    }
    this.MailFactory.setup();
  }

  sendEmail(message: MailMessageType) {
    return this.MailFactory.send(message);
  }
}
