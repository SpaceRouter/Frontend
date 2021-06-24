FROM node:alpine

RUN mkdir /front
WORKDIR /front

COPY . /front/

RUN npm install -g serve

RUN npm install . && \
    npm run build && \
    rm node_modules -rf


CMD serve -s build