FROM node:alpine as builder

WORKDIR /web

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Alpine image for our web server
FROM alpine:3.17.3

# Install nginx & gettext to use envsubst
RUN apk upgrade --no-cache  \
&& apk add --no-cache nginx  \
&& apk add --no-cache gettext

# Install headers-more to allow us to hide server headers
RUN apk add nginx-mod-http-headers-more

# Copy start script
COPY start-up.sh /usr/bin

# Copy nginx config over to template config.
COPY nginx.conf /tmp/nginx.conf.template

# Set access for start script
RUN chmod 755 /usr/bin/start-up.sh

# Copy static files to new container.
COPY --from=builder /web/build /usr/share/nginx/html/

# Run startup script
CMD ["/usr/bin/start-up.sh"]