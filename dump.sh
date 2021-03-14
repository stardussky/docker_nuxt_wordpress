#!/bin/sh

set -e
. .env
NOW=$(date +'%Y-%m-%d-%H:%M:%S')

# export wordPress database
mv db/default/wp.sql db/backup/wp-"$NOW".sql # backup
docker-compose exec mysql sh -c "MYSQL_PWD=$MYSQL_ROOT_PASSWORD mysqldump -uroot $MYSQL_DATABASE" > db/default/wp.sql # export to db/default/wp.sql