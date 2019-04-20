# https://cli.vuejs.org/guide/deployment.html#docker-nginx
FROM node:alpine as builder

# Cache npm isntallation if deps haven't changed
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy rest of app and build
COPY . .
RUN yarn build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf