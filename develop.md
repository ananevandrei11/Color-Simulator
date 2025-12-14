# Development with Docker

This document describes how to work with the project using Docker for development.

## Prerequisites

Make sure you have Docker and Docker Compose installed on your system.

## Starting the Development Environment

To start the project in development mode using Docker:

```bash
docker-compose up
```

The application will be available at http://localhost:5173

If you want to run the containers in the background, use:

```bash
docker-compose up -d
```

## Stopping the Development Environment

To stop the running containers:

```bash
docker-compose down
```

This will stop and remove the containers, but preserve your data.

Alternative stopping commands:
- `docker-compose stop` - Stops containers without removing them
- `docker-compose kill` - Forcefully kills containers

## Installing New Dependencies

You have two options to install new packages:

1. **Install in the running container:**
   ```bash
   docker-compose exec app npm install package-name
   ```

2. **Add to package.json and rebuild:**
   - Add the dependency to package.json
   - Rebuild the image: `docker-compose build`
   - Restart: `docker-compose up`

The first option is faster but changes may be lost when recreating containers. The second option is more reliable for permanent changes.

## Other Useful Commands

- View logs: `docker-compose logs -f`
- Execute commands in container: `docker-compose exec app sh`
- Rebuild image: `docker-compose build --no-cache` (if needed)