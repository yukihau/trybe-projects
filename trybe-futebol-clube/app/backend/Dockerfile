FROM node:16-alpine

EXPOSE 3001

WORKDIR /app

COPY . .

RUN ["npm", "install"]

ENTRYPOINT ["npm", "start"]
