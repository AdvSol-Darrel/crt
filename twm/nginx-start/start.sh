#!/bin/sh

echo "---> Creating keycloak.json ..."
envsubst < ~/keycloak.json.tmpl > ~/keycloak.json

echo "---> Creating nginx.conf ..."
envsubst < /tmp/src/nginx.conf.tmpl > /etc/nginx/nginx.conf