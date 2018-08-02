# Snipstory

[![Build Status](https://travis-ci.org/oSoc17/snipstory.svg?branch=develop)](https://travis-ci.org/oSoc17/snipstory)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Dependencies Status](https://david-dm.org/osoc17/snipstory.svg)

> Educational web app that teaches history based on human stories

More detailed documentation is available in the Github wiki.

## Local development

### Install dependencies

```shell
npm install # or yarn
```

### Run the dev server

```
npm start
```

### Build for production

```
npm run build
```

### Deploy on firebase

```
npm install -g firebase-tools # if you don't already have it
firebase deploy
```

### Change firebase project

change the id in `.firebaserc` and change the config object in `src\helpers\firebase.js`.
