FROM node:16
WORKDIR /front
COPY . .
RUN yarn install

EXPOSE 8080

CMD [ "yarn", "start" ]