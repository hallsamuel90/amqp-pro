import amqplib from 'amqplib';
import { AmqpProError } from './errors';
import { Channel, Connection } from './types';

const DEFAULT_RECONNECT_INTERVAL = 2;
const DEFAULT_ATTEMPTS = 30;

export async function connect(
  amqpUri: string,
  reconnectInterval: number = DEFAULT_RECONNECT_INTERVAL,
  remainingAttempts: number = DEFAULT_ATTEMPTS
): Promise<Connection> {
  if (!remainingAttempts) {
    throw new AmqpProError(
      `🔥 failed to connect to ${amqpUri} in ${remainingAttempts} tries. Please 
        verify the uri or increase the number of retries.`
    );
  }

  try {
    return await amqplib.connect(amqpUri);
  } catch (e) {
    console.error(`🔥 Something went wrong, it is likely the message broker is
      not available or ${amqpUri} is not a valid address, 💪 Retrying in
      ${reconnectInterval} seconds...`);

    await sleep(reconnectInterval);

    return connect(amqpUri, reconnectInterval);
  }
}

export async function createChannel(
  connection: Connection,
  channelName: string
): Promise<Channel> {
  try {
    const channel = await connection.createChannel();
    await channel.assertQueue(channelName);

    return channel;
  } catch (e) {
    console.error('🔥 ' + e);

    throw new AmqpProError(`🔥 could not create channel ${channelName}`);
  }
}

export async function subscribe(
  channel: Channel,
  channelName: string,
  callback: Function
): Promise<void> {
  channel.consume(channelName, async (message) => {
    if (message != null) {
      await callback(JSON.parse(message.content.toString()));
      channel.ack(message);
    }
  });
}

export function publish<T>(
  channel: Channel,
  channelName: string,
  payload: T
): void {
  channel.sendToQueue(channelName, Buffer.from(JSON.stringify(payload)));
}

function sleep(reconnectInterval: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, reconnectInterval * 1000);
  });
}

export default { connect, createChannel, subscribe, publish };
