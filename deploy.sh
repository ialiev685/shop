#!/bin/sh

set -e  # Останавливаем скрипт при любой ошибке

make -C /root/github/shop/server build-dev

cd web

yarn install --frozen-lockfile
yarn build

sudo mkdir -p /var/www/shop
sudo chmod -R 755 /var/www/shop

sudo cp -r /root/github/shop/web/dist/* /var/www/shop
sudo cp /root/github/shop/web/nginx.conf /etc/nginx/sites-available/shop.conf
sudo nginx -t
sudo systemctl reload nginx