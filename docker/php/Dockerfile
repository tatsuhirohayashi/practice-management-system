FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    zip unzip git curl libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Laravel 本体
COPY backend/src/ /var/www/

# 依存関係
RUN composer install \
    --no-dev \
    --no-scripts \
    --optimize-autoloader

# 🔴 Laravel が起動に必要なディレクトリを全作成
RUN mkdir -p \
    storage/logs \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    bootstrap/cache \
 && chmod -R 777 storage bootstrap/cache

RUN php artisan config:clear || true \
 && php artisan cache:clear || true

EXPOSE 8080

# artisan を使わず PHP 標準サーバー（安定）
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT} -t public"]
