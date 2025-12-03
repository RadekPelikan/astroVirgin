### BUILDER STAGE ##############################################################
FROM oven/bun:latest AS builder
WORKDIR /app

# Install only the package manager metadata first for caching
COPY package*.json bun.lockb* ./
RUN bun ci

# Copy source files
COPY . .

# Build the project
RUN bun run build


### RUNTIME STAGE ##############################################################
FROM oven/bun:canary-alpine AS runtime
WORKDIR /app

# Copy only built assets + production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

ENV HOST=$HOST
ENV PORT=$PORT

EXPOSE $PORT
CMD ["bun", "dist/server/entry.mjs"]
