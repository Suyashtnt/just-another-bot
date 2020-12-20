FROM balenalib/raspberrypi4-64-debian-node:14.7-buster-run

COPY package.json package.json
RUN yarn install
COPY src src

CMD [ "yarn", "run", "start" ]