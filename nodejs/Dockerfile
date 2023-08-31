FROM node:20-alpine

WORKDIR /home/app

RUN apk add --no-cache curl

RUN curl -o /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

COPY . .

ENTRYPOINT [ "wait-for", "database:3306", "-t 40", "--", "./entrypoint.sh" ]
