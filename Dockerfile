FROM node:alpine as builder
WORKDIR /app
COPY  package.json .
RUN npm i
COPY . ./
CMD [ "npm", "run", "build"]

FROM nginx:alpine
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]