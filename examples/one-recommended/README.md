# One Project

Welcome to One!

## Setup

Now you'll need to run a postgres database. We've included a `docker-compose.yml`
that will set up everything for you, you'll want to set up docker first though:

- On Mac, we highly recommend [OrbStack](https://orbstack.dev) as it's much faster and generally a drop-in replacement.
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) works otherwise.

Once you do install one of those and run it, you should be able to run:

```bash
docker-compose up
```

And have your database come online.

```bash
yarn db:init # or npm run, bun run, pnpm run
```

## Developing

You can now run your One app in development:

```bash
yarn dev # or npm run, bun run, pnpm run
```

## Production

To build your app for production:

### Web

```bash
yarn build:web # or npm run, bun run, pnpm run
```

### iOS

First, you'll need to generate the native code for your app:

```bash
yarn prebuild:native # or npm run, bun run, pnpm run
```

Afterward, follow the instructions printed in the terminal to build and upload your iOS app for distribution.
