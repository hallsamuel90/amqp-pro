import amqplib, { Connection } from 'amqplib';
import amqpPro from './amqp-pro';
import { AmqpProError } from './errors';

describe('#connect should', () => {
  let amqpLibConnectSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetAllMocks();

    amqpLibConnectSpy = jest.spyOn(amqplib, 'connect');
  });

  test('throw if no attempts left', async () => {
    const dummyUri = 'dummyUri';

    expect(amqpPro.connect(dummyUri, 5, 0)).rejects.toThrow(AmqpProError);
  });

  test('retry the connect if not successful', async () => {
    amqpLibConnectSpy.mockRejectedValueOnce(new Error()).mockResolvedValueOnce(({
      fakeConnection: 'fakeConnection',
    } as unknown) as Connection);

    const dummyUri = 'dummyUri';

    expect(await amqpPro.connect(dummyUri)).toEqual({
      fakeConnection: 'fakeConnection',
    });
  });

  test('return the connection once successful', async () => {
    amqpLibConnectSpy.mockResolvedValue(({
      fakeConnection: 'fakeConnection',
    } as unknown) as Connection);

    const dummyUri = 'dummyUri';

    expect(amqpPro.connect(dummyUri)).resolves.toEqual({
      fakeConnection: 'fakeConnection',
    });
  });
});
