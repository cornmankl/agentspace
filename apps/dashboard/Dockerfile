FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.json ./

COPY packages/types/package.json ./packages/types/
COPY apps/dashboard/package.json ./apps/dashboard/

RUN npm install

COPY packages/types ./packages/types
COPY apps/dashboard ./apps/dashboard

RUN npm run build --workspace @agentspace/dashboard

FROM nginx:alpine

COPY --from=builder /app/apps/dashboard/dist /usr/share/nginx/html
COPY apps/dashboard/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
