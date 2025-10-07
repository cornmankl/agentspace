FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.json ./

COPY packages/types/package.json ./packages/types/
COPY packages/core/package.json ./packages/core/
COPY apps/server/package.json ./apps/server/

RUN npm install

COPY packages/types ./packages/types
COPY packages/core ./packages/core
COPY apps/server ./apps/server

RUN npm run build

EXPOSE 3001

CMD ["npm", "start", "--workspace", "@agentspace/server"]
