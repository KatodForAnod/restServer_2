FROM golang:latest
WORKDIR /app2

COPY ./ /app2

RUN go mod download

ENTRYPOINT go run cmd/main.go -dockerStart

EXPOSE 8080:8080
