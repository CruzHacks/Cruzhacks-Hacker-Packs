FROM node:11.7.0-alpine

WORKDIR /

# Copy the contents of the current folder into the "app_dir/" folder inside the container.
RUN mkdir /app_dir
COPY ./ /app_dir

WORKDIR /app_dir

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]