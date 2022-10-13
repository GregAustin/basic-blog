FROM node:alpine as builder

WORKDIR /web

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Nginx image for our web server
FROM nginx:stable-alpine

# Create a template config. Nginx image allows us to replace environment variables in this file.
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy static files to new container.
COPY --from=builder /web/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]