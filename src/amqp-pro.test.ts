import amqpPro from './amqp-pro';
import { AmqpProError } from './errors';

describe('#connect should', () => {
  test('throw if no attempts left', () => {
    const dummyUri = 'dummyUri';

    expect(amqpPro.connect(dummyUri, 5, 0)).rejects.toThrow(AmqpProError);
  });

  // test('retry the connect if not successful', () => {});

  // test('return the connection once successful', () => {});
});
