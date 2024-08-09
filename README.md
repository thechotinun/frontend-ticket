### A typical top-level directory layout

    .
    ├── ...
    ├── ticket                          # Your project directory
    │   ├── api-ticket                  # clone and installation backend
    │   │   └── .env                    # Your Backend environments
    │   ├── frontend-ticket             # clone and installation frontend
    │   │   └── .env                    # Your Frontend environments
    │   ├── docker-compose.yml          # docker file for start web application
    │   ├── default.conf                # nginx
    │   └── init.sql                    # create db ticket
    └── ...

### Installation

1. Clone the repository.
```bash
$ mkdir ticket
$ cd ticket
$ git clone https://github.com/thechotinun/frontend-ticket.git
$ git clone https://github.com/thechotinun/api-ticket.git
```

2. Install the dependencies
```bash
$ npm install
```

3. Setup ENV
* ENV for development
```
VITE_PORT=3000
VITE_API=http://localhost:3100/api/v1
```
### Running the services

1. Start development
```bash
$ npm run dev
```
### Building for Production

```bash
$ npm run build
$ npm run preview
```
2. Open your browser and navigate to `http://localhost:3000` to see the application in action.
## docker-compose.yml
```yml
services:
  db:
    container_name: db_nipa
    image: postgres:14.8-alpine
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: password
    ports:
      - 5432:5432
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U root"]
      interval: 5s
      timeout: 5s
      retries: 5
  api:
    build:
      context: ./api-ticket
    expose:
      - "3100"
    container_name: api
    depends_on:
      nginx:
        condition: service_started
      db:
        condition: service_healthy
    env_file:
      - ./api-ticket/.env
    environment:
      DATABASE_HOST: db
    restart: always
  frontend:
    build:
      context: ./frontend-ticket
    container_name: frontend
    ports:
      - "3000:3000"
    env_file:
      - ./frontend-ticket/.env
    depends_on:
      - api
  nginx:
    restart: always
    image: nginx:latest
    container_name: nginx
    volumes:
      - "./default.conf:/etc/nginx/conf.d/default.conf"
    ports:
      - "3100:80"
volumes:
  pgdata: {}
```
## default.conf
```conf
upstream api {
    server api:3100; # server name is same as the service name used in docker-compose file
                         # port on which the service is running...NOT the exposed port(the RHS port in docker-compose ports attr.)
}

server {
    listen 80;
    
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP @remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://api/;
    }
}
```
## init.sql
```sql
CREATE DATABASE ticket;
```
## Start Application with docker compose
```bash
$ docker-compose up -d --build 
```