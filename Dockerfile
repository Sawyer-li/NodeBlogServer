FROM node:14
MAINTAINER sawyer
ADD . /app
WORKDIR /app
RUN npm i --registry=https://registry.npm.taobao.org
CMD node app.js
