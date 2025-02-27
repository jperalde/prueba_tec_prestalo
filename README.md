# Prueba Técnica Prestalo - Desarrollador Full Stack Ssr

Este proyecto es una aplicación de solicitud de préstamos que incluye un frontend desarrollado con Next.js y un backend desarrollado con NestJS. La aplicación se puede levantar utilizando Docker y Docker Compose.

## Requisitos

- Docker
- MongoDB
- NodeJS
- NextJS
- NestJS

## Instrucciones para levantar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/prueba_tec_prestalo.git
cd prueba_tec_prestalo
```

### 2. Levantar el contenedor

Ejecutamos el documento docker-compose.yaml

```bash
docker-compose up -d
```

Para este proyecto se ha decidido usar los puertos:

- 27017: MongoDB (BBDD)
- 3000: NestJS (API)
- 8000: NextJS (Front)

Si se desea crear las imagenes por separado (no recomendado), se pueden utilizar los siguientes comandos.

```bash
docker run -d --name mongo-prueba -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -p 27017:27017 -v mongoprueba:/data/db  mongo:latest
docker build -t nextjs-docker .
docker run -d --name next-prueba -p 8000:8000 nextjs-docker
docker build -t backend-docker .
```

### 3. Poblar la base de datos

Para poder utilizar la aplicación de forma efectiva, se recomienda para ello ejecutar el documento C:\Proyectos\prueba_tec_prestalo\playground-1.mongodb.js
O hacer uso de la extensión MongoDB for VS Code (tener en cuenta el usuario y contraseña de acceso para realizar la conexión).

### 4. Acceder a la aplicación

- Frontend: <http://localhost:8000>
- Backend: <http://localhost:3000>

### 5. Estructura del proyecto

- frontend: Contiene el código del frontend desarrollado con Next.js.
- backend: Contiene el código del backend desarrollado con NestJS.
- docker-compose.yml: Archivo de configuración de Docker Compose.

### 6. Variables de entorno

Asegúrate de configurar las variables de entorno necesarias en los archivos .env tanto en el directorio frontend como en el directorio backend.
