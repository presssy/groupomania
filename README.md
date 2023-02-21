# Groupomania

OpenClassrooms Project

### Installation
- #### Pré-requis :
    - Node.js 16 >=
    - Docker & docker-compose
- #### 1. Cloner
```shell
git clone https://github.com/presssy/groupomania.git
```
- #### 2. Environement
Avant de continuer, il vous faut configurer l'environement. Pour cela veuillez renommer ```example.env``` en ```.env``` et remplir correctement les variables.

- #### 3. Lancement
Dans votre terminal, placez vous à la racine du projet. Si c'est le premier lancement alors lancez cette commande :
```shell
yarn build
```

sinon :
```shell
yarn start
```

Si tout va bien, vos container docker sont lancés.

- #### 4. Importer la migration avec Prisma
Connectez vous au container Docker de l'API Groupomania via : 
```shell
docker exec -ti api-groupomania sh
```

Puis lancer la commande prisma avec :
```shell
npx prisma db push
```

- #### 5. Enjoy
Retrouvez l'application sur **http://localhost:5173**



