## Project setup
1) Setup .env file, and PostgreSQL DB
2) ```
    npm install
    ```

## Run

### Using Docker Compose
1) Build and Start the Containers:
```
docker compose up --build
```

### Using Node.js Directly
```
npm run start
```


### Swagger-Docs:
On local machine: `http://localhost:<API_PORT>/api-docs`

On remote machine: `some.remote.host/api-docs`

<span style="color: #808080;">API_PORT находится в .env файле (как и множество других переменных окружения)</span>
