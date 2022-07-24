FROM php:8.1.1-fpm-alpine3.14 as base

WORKDIR /opt/app

ENV APP_ENV prod

ENV DD_SERVICE='logos-service'
ENV DD_ENV='local'
ENV DD_VERSION='local'
ENV DD_TRACE_SYMFONY_ENABLED='true'

COPY docker/bin/php/* /usr/local/bin/

COPY --from=composer:2.2 /usr/bin/composer /usr/local/bin/composer

RUN os_install base \
    && os_install datadog-agent \
    && os_install git \
    && os_install nginx \
    && php_install intl \
    && php_install redis \
    && php_install rdkafka \
    && php_install amqp \
    && php_install apcu \
    && php_install opcache \
    && php_install sockets \
    && php_install zip \
    && php_install gd \
    && php_install mongodb \
    && php_install bcmath \
    && os_clear base

COPY composer.* ./
RUN os_install unzip \
    && composer install --prefer-dist --no-scripts \
    && composer clearcache \
    && os_clear unzip

COPY docker/config/php/* /usr/local/etc/php/conf.d/
COPY docker/config/php-fpm/* /usr/local/etc/php-fpm.d/
COPY docker/config/nginx/* /etc/nginx/http.d/
COPY docker/app_entrypoint /usr/local/bin/

RUN mkdir /var/content \
    && cd /var/content \
    && git init \
    && git config user.name "localhost" \
    && git config user.email "logos@localhost"

COPY . ./
RUN composer dump-autoload --no-dev --classmap-authoritative \
    && composer check-platform-reqs --no-dev \
    && php bin/console cache:warmup

ARG APP_VERSION='local'
ENV DD_VERSION=${APP_VERSION}

ENTRYPOINT ["app_entrypoint"]
CMD ["sh", "-c", "nginx && php-fpm"]

FROM base as prod

FROM base as dev

ENV APP_ENV dev

COPY docker/bin/php-dev/* /usr/local/bin/
COPY docker/config/php-dev/* /usr/local/etc/php/conf.d/

ARG XDEBUG_VERSION=3.1.0
ARG XDEBUG_PLATFORM=darwin
ARG XDEBUG_CONFIG=''

ENV XDEBUG_CONFIG=${XDEBUG_CONFIG}
ENV PHP_IDE_CONFIG="serverName=Busuu"

RUN os_install base \
    && php_install_xdebug ${XDEBUG_PLATFORM} ${XDEBUG_VERSION} \
    && os_clear base
