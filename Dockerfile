FROM node:18.16.1-alpine

RUN apk add bash

ENV LANG=ko_KR.UTF-8 \
    LANGUAGE=ko_KR.UTF-8

RUN apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    echo "Asia/Seoul" > /etc/timezone

EXPOSE 3032

WORKDIR /home/server
COPY . /home/server

RUN npm install
CMD npm start