import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database.module';
import { DbConnectorService } from './db-connector.service';

describe('Test db connector service', () => {
  let modelRef: TestingModule;
  let dbConnectorService: DbConnectorService;

  beforeAll(async () => {
    modelRef = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    dbConnectorService = modelRef.get<DbConnectorService>(DbConnectorService);
  });

  afterAll(() => {
    modelRef.close();
  });

  it('Can connect to database by select user', async () => {
    const user = await dbConnectorService.user.findMany();
    expect(Array.isArray(user)).toBeTruthy();
  });
});
