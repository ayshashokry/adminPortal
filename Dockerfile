# Builder stage
FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Clear Webpack and Next.js cache to prevent snapshot issues
RUN rm -rf .next node_modules/.cache

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./

RUN npm install --production

EXPOSE 3000

CMD ["npm", "run", "start"]
