FROM node:16
WORKDIR /server
COPY . .
RUN yarn install

EXPOSE 8080

CMD [ "yarn", "start" ]