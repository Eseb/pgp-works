# pgp-works

PGP client designed to be used by actual human beings.

## Development

pgp.works is an [Electron](/electron/electron) app. Make sure you have the `yarn` package manager which you should be able to install globally via `npm install -g yarn`.

```
# Download dependencies.
yarn install

# Compile non-JS packages (sqlite3) for Electron.
# You need to do this every time you add/remove a dep.
npm run rebuild

# Start the app.
npm start

# Ensure your code meets the linter's expectations.
npm run lint
```
