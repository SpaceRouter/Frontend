FROM node

RUN mkdir /front
WORKDIR /front

COPY . /front/

RUN npm install .
RUN npm install -g serve
RUN npm run build

CMD serve -s build