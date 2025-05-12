# XERTIS

Xertis is a blockchain powered platform that let's users create verifiable certificates on the blockchain.

## INSTALLATION
For this installation i'll be using [bun](https://bun.sh)

clone the repo and in the terminal run
```
cd frontend
bun install
bun run start
```

The aplication should be up and running without any challenges

To run the server, you need to have your env variables set. Below is the env variables

```
PORT=
DB_URI=
ENVIRONMENT=
JWT_SECRET=
EMAIL_PASSWORD=
EMAIL_USER=
EMAIL_SERVICE=
PINATA_API_KEY=
PINATA_SECRET=
```

If you would like to run the server, open a new terminal and cd into where the project was cloned to and run the following
```
cd server
bun install
bun run dev
```
