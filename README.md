### A typical top-level directory layout

    .
    ├── ...
    ├── ticket                          # Your project directory
    │   ├── api                         # clone and installation backend
    │   │   └── .env                    # Your Backend environments
    │   ├── frontend                    # clone and installation frontend
    │   │   └── .env                    # Your Frontend environments
    │   ├── docker-compose.yml          # docker file for start web application
    │   └── .env
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
### Start Application with docker compose
```bash
$ docker-compose up -d --build 
```