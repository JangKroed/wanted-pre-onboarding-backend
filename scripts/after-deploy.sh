#!/bin/bash
REPOSITORY=/home/ubuntu/projects


cd $REPOSITORY

npm install

sudo su

pm2 kill

export NODE_ENV=production && pm2 start server.js