# Multi-Tenant SaaS Platform - Frontend Dockerfile
# Multi-stage build for optimized production deployment

# Build stage - compile React application
FROM node:20-alpine as builder
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Runtime stage - serve static files
FROM node:20-alpine
WORKDIR /app

# Install lightweight HTTP server
RUN npm install -g serve

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Serve built files
CMD ["serve", "-s", "dist", "-l", "3000"]
