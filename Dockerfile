# build
FROM node:lts AS builder

RUN mkdir /home/node/src
WORKDIR /home/node/src

COPY --chown=node:node . .
RUN npm ci && npm run build

# deploy
FROM nginx:alpine

COPY --from=builder /home/node/src/dist /usr/share/nginx/html