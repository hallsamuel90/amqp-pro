import amqplib from 'amqplib';

export type Channel = amqplib.Channel;
export type Connection = amqplib.Connection;

export interface AmqpPro {
  connect(amqpUri: string, reconnectInterval?: number): Promise<Connection>;
  createChannel(connection: Connection, channelName: string): Promise<Channel>;
  subscribe(channel: Channel, channelName: string, handler: Function): void;
  publish<T>(channel: Channel, channelName: string, payload: T): void;
}
