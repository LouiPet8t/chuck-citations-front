# Chuck Citations Front

Le front en React de notre application de citations de Chuck Norris.

## Commandes

```bash
# Builder l'image de test
docker build -t chuck-citations-front-test -f docker/test/Dockerfile .
# lancer les tests
docker run --rm chuck-citations-front-test

# Créer l'image de production
docker build -t chuck-citations-front -f docker/build/Dockerfile .
# créer un conteneur pour temporaire pour récupérer et copier les fichiers de build
docker create --name temp-container chuck-citations-front
# copier les fichiers de build
docker cp temp-container:/app/dist ./dist
# supprimer le conteneur temporaire
docker rm temp-container

# Les fichiers de build sont maintenant dans le dossier ./dist
# Reste plus qu'à les copier sur le serveur de production
```
