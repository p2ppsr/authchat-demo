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

## License

The license for the code in this repository is the Open BSV License.
