# Build stage
FROM node:20.9.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run stage
FROM node:20.9.0
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5454
CMD ["npm", "start", "--", "-p", "5454"]

