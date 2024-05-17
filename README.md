# Wordle Service

### Requerimientos
- Node Version 20.12.1
- Docker Desktop/CLI [Descargar](https://docs.docker.com/get-docker/)

### Iniciar app
```
corepack enable pnpm
pnpm install
docker compose up
pnpm typeorm:migrate
pnpm seed
pnpm dev
```

### Generar datos
```
pnpm seeds
```

### Apagar app
- Cancelar ejecución pnpm dev
```
docker compose down
docker image rm postgres
```