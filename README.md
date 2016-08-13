# Uncle

## Installation steps

#### Project dependencies

```sh
# server side dependencies
npm install
```

#### Database setup

Install Postgres with Homebrew:
```sh
# update brew
brew update

# install postgres
brew install postgresql
```

## Running the Application

#### Local development

It may be helpful to have one terminal tab open per process

1. start the local postgres server:
  * `npm run dev:startdb`
1. run the build process to bundle server files and transpile code
  * `npm run dev:buildserver`
1. run the (node) server from the root directory of this project
  * `npm run dev:start`
1. run the build process to bundle client files and transpile code
  * `npm run dev:watchClient`


