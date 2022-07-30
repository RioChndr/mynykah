export interface MailServiceI {
  setup(): boolean;
  send(message: MailMessageType): any;
}

export type MailMessageType = {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
};
