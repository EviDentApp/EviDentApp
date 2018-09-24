FROM node:8.12.0-jessie

WORKDIR /app

COPY / /app

RUN npm install -g ionic cordova
RUN npm i -D -E @angular/cli
RUN npm install

EXPOSE 8100

ENTRYPOINT ["ionic"]
CMD ["serve"] 
