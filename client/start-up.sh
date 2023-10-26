#!/bin/sh
envsubst '$API_URL $PORT' < /tmp/nginx.conf.template > /etc/nginx/nginx.conf
nginx -g 'daemon off;'