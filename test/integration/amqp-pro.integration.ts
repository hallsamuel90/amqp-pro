import amqplib, { connect } from 'amqplib';
import * as amqpPro from '../../src';

const RABBIT_URI = 'amqp://localhost:5672';

describe('amqp-pro should', () => {
  test('eventually connect', async () => {
    const connection = await amqpPro.connect(RABBIT_URI);

    // pulling known property of the connection
    expect(connection.connection.serverProperties.product).toEqual('RabbitMQ');

    await connection.close();
  }, 30 * 1000);
});
