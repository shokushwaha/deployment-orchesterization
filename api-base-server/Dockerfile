FROM Ubuntu:focal

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

RUN apt-get install git -y
WORKDIR /home/app
COPY . .
RUN npm install --force
CMD ["node","index.js"]
EXPOSE 9000