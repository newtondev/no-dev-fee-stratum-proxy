# XMR PROXY

Intercepts requests and responses to be modified.

## Installation instructions

1. Clone the repository to a VM or to your machine you want to run the proxy on.

2. Install nodejs (8+) and npm.

3. Run `npm install` in the folder you checked out.

4. `cp .env.example .env`.

5. Edit the `.env` file and change it to match your config.

6. Run `npm start` or `npm server.js`

7. In your miner config switch your remote host and port to point to your local host and port provided in your config. Make sure your local host is set to your public IP or your public host name.

You can run it in a screen instance, or you can install pm2 to run your instance as a daemon.