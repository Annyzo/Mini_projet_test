# Mini_projet_test NodeJs

## Prérequis

- node js version >= 10.xx.x
- npm version >= 6.xx.x
- mongod (mongoDB server) version = 4.4.8

## Lance en local

Il faut d'abord insatller l'environnement (MongoDb, ) et apres cree un base de donnee

Cloner le projet

```bash

git clone https://github.com/Annyzo/Mini_projet_test

```

Change le dossier vers le projet

```bash

cd Mini_projet_test

```

Installer les dependencies

```bash

npm install

```

Lance le server

```bash

npm run dev

```


## Le projet contenant

- Authentication utiliser JWT (access-token & refresh-token) et bcrypt pour le cryptage
- Register
- Login
- Deconnect
- Update User
- GetOne user
- GetAll users

## Test API sur Postman

Import le fichier " MiniTest.postman_collection.json " sur postman
