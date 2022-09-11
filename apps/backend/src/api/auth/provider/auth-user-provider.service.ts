import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/database/repos/user.repository";
import { ProviderGoogleDTO } from "./type";
import { OAuth2Client } from 'google-auth-library';
import { DbConnectorService } from "src/database/connector/db-connector.service";
import { FederatedCredentials } from "@prisma/client";


@Injectable()
export class AuthUserProviderService {
  constructor(
    private db: DbConnectorService,
  ) { }

  async validateFederatedCredentials(payload: {
    provider: string,
    subject: string,
    user: {
      name?: string,
      email?: string,
      picture?: string
    }
  }) {
    let federate = await this.db.federatedCredentials.findFirst({
      where: {
        subject: payload.subject
      },
      include: {
        user: true
      }
    })
    if (!federate) {
      federate = await this.db.federatedCredentials.create({
        data: {
          provider: payload.provider,
          subject: payload.subject,
          user: {
            connectOrCreate: {
              create: {
                email: payload.user.email,
                name: payload.user.name,
                picture: payload.user.picture,
                verifidAt: new Date(), // auto verified
              },
              where: {
                email: payload.user.email
              }
            }
          }
        },
        include: {
          user: true
        }
      })
    }
    return federate
  }

  /** Provider */
  async loginGoogle(payload: ProviderGoogleDTO) {
    const clientId = process.env.GOOGLE_CLIENT_ID

    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: payload.token,
      audience: clientId
    })
    const ticketPayload = ticket.getPayload()
    return this.validateFederatedCredentials({
      provider: ticketPayload.iss,
      subject: ticketPayload.sub,
      user: {
        name: ticketPayload.name,
        email: ticketPayload.email,
        picture: ticketPayload.picture
      }
    })
  }
}