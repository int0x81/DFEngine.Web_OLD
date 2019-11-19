FROM node:12.2.0 as build

WORKDIR /app

ARG NG_ENVIRONMENT

COPY . /app
RUN npm install
RUN npm install -g @angular/cli@7.3.9

RUN ng build -c ${NG_ENVIRONMENT}

FROM nginx:alpine

COPY --from=build /app/nginx.conf /etc/nginx/

COPY --from=build /app/dist/* /usr/share/nginx/html/