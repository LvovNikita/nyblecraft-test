FROM node:19-alpine

WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install typescript -g
COPY . .
RUN tsc
RUN npx prisma generate
RUN npx prisma migrate dev --name init
WORKDIR /app/dist
EXPOSE 3000
CMD ["npm", "run", "dev"]