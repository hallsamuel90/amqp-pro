## AMQP Pro
[![CI Pipeline](https://github.com/hallsamuel90/amqp-pro/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/hallsamuel90/amqp-pro/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A high-level AMQP client with built-in reconnect.

## Getting Started
To get a local copy up and running follow these simple steps.

### Prerequisites
* [npm](https://www.npmjs.com/get-npm)
* [yarn](https://classic.yarnpkg.com/en/) (optional)

### Installation
Install the npm package using `npm` or `yarn`!
  ```sh
  npm install amqp-pro
  ```
  ```sh
  yarn add amqp-pro
  ```

## Usage
Amqp Pro provides a simple interface for connecting, creating a channel, and subscribing and publishing messages.

The general flow for setting up a subscriber is to create the connection, create the channel, and then subscribe to the channel with a handler that processes incoming messages.

```typescript
const connection = await amqpPro.connect('amqp://your-channel');

const channel = await amqpPro.createChannel(
  connection,
  'your channel name'
);

amqpPro.subscribe(
  channel,
  'your channel name',
  (msg: JSON) => { handler(msg); }
);
```

Publishing is done in a similar manner.

```typescript
interface Payload {
  example: string;
}

const connection = await amqpPro.connect('amqp://your-channel');

const channel = await amqpPro.createChannel(
  connection,
  'your channel name'
);

const payload = {
  example: 'o hi mark'
};

amqpPro.publish<Payload>(
  channel,
  'your channel name',
  payload
);
```


## Roadmap
See the [open issues](https://github.com/github_username/repo_name/issues) for a list of proposed features (and known issues).

## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Sam Hall 
* [@biggHealthy_](https://twitter.com/biggHealthy_) 
* hallsamuel90@gmail.com

