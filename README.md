# docker nuxt / wordpress rest api

## dev
1. docker-compose up -d
2. cd nuxt
3. copy .env from .env.template
4. yarn && yarn dev
5. nuxt localhost:3000, wordpress localhost:9000

## .sh 檔案說明
1. `dump.sh`：將 docker VM 的 DB 資料匯出至 `/db/default/wp.sql`


