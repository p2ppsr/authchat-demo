# authchat-demo
Simple HTML/CSS/JS demo of Authrite protected sockets

## Overview

`authchat-demo` is a demonstration project showcasing the integration of Authrite for secure socket communication. It sets up a server using Node.js and Express, enabling secure communication between a client and server.

## Installation

1. Install Node.js dependencies by running:

```bash
npm install
```

## Usage
1. Start the server by running:
```bash
npm run start
```

This will initialize an Express server.

2. Open the public/index.html page in your preferred browser. This page contains an Authrite client that will attempt to communicate over a websocket with the server at http://localhost:3000.

To view the demo site, you'll need to serve the index.html page using a package. We recommend using `live-server`. Navigate to the public folder and use the following command:

```bash
live-server
```

Then, open Chrome and visit the site.

> Note: To use this demo, ensure you are signed in to your Babbage MetaNet Client.

## How It Works

Upon serving the HTML page, you will see a chat application with an input text field. You can open two browser windows of the same page to simulate to users talking to each other.

Upon opening, the user should already be authenticated. This is facilitated by an initial Authrite authentication handshake with the server, assuming the user's MetaNet Client is active.

Subsequently, the user can type a message in one window and press enter. The typing indicator and message will be visible in the other window. The same action can be performed in reverse. This simulates two users engaging in a conversation.

Each action transmits authentication headers, ensuring that each message is mutually authenticated, not just the initial connection.

## License

The license for the code in this repository is the Open BSV License.
