# RemoteClass

## Overview

The aim of this project is to deliver an education platform for both teachers and students, where students can progress outside of class via lessons, exercises and tests set by teachers, as well as provide an overall fun, learning experience for them.

## Features

- Access and manage your very own dashboard as either a student or teacher
- Readily available interactive resources for students at their finger tips
- Connect with students as a teacher at both a classroom and individual level
- Schedule classroom events for students and see how well they do overall
- View classroom events as a student to see what your teacher have set for you

## Running this project locally

From this repo:

1.  Clone this project locally

2.  Install the required dependencies for this project

```sh
  # yarn
  $ yarn
  # npm
  $ npm i
```

3.  Use the `populateDB.js` in script in the backend packages

```sh
  # ./packages/backend
  $ node populateDB.js 'MONGODB_CONNECTION_STRING'
```

4. Setup your .env files for both frontend/backend packages

5. Run the dev command to build the web app on watch mode

```sh
  # yarn
  $ yarn dev
  # npm
  $ npm run dev
```

## Dependencies

## Frontend

- [Next.JS](https://nextjs.org/)
- [Theme-UI](https://theme-ui.com/)
- [Typescript](https://www.typescriptlang.org/)
- [SWR](https://swr.vercel.app/docs/getting-started)
- [Radix-UI](https://www.radix-ui.com/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

## Backend

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [Passport](https://www.passportjs.org/)
- [Brcypt](https://github.com/kelektiv/node.bcrypt.js)
- [Nodemon](https://nodemon.io/)

### Monorepo

- [Lerna](https://lerna.js.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/#/)
- [Lint-Staged](https://github.com/okonet/lint-staged)
- [Commitizen](https://commitizen-tools.github.io/commitizen/)
- [Commitlint](https://commitlint.js.org/#/)

## Maintainers

- [@TazDeCoder](https://github.com/TazDeCoder)
- [@henokkh](https://github.com/henokkh)
- [@Eloi-Perez](https://github.com/Eloi-Perez)

**A special thanks to the team at Chingus for helping making this possible!**
