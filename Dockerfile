FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy source code
COPY . .

# Expose the dev server port
EXPOSE 5175

# Set environment variables
ENV NODE_ENV development
ENV VITE_PORT 5175

# Start the development server
CMD ["npm", "run", "dev"] 