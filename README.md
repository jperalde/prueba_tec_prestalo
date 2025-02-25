# Prueba Técnica Prestalo - Desarrollador Full Stack Ssr
Desarrollo de un sistema comparador de prestamos
docker run -d --name mongo-prueba -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -p 27017:27017 -v mongoprueba:/data/db  mongo:latest
docker build -t nextjs-docker .
docker run -d --name next-prueba -p 8000:8000 nextjs-docker