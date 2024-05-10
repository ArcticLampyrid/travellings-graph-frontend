# Travellings Graph Frontend
A simple frontend for [Travellings Graph](https://github.com/ArcticLampyrid/travellings-graph)

## Usage
```
docker buildx build -t travellings-graph-frontend . --build-arg API_URL=http://localhost:8471
docker run -d -p 8080:80 travellings-graph-frontend
```
The `API_URL` build argument specifies the URL of the API server.
