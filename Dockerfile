# FROM node:20-alpine
# 1. Get Bun Image
FROM oven/bun:latest

# 2. Set Working Dir in Container
WORKDIR /usr/src/app

# 3. Copy package.json
COPY package*.json ./

# 4. Install app dependencies
RUN bun install --omit=dev

# 5. Copy app's source code
COPY . .

# 6. Expose the port the app runs on
EXPOSE 3000

# 7. Start the app
RUN echo "🚀 App starting."
CMD ["bun", "run", "index.js"]
