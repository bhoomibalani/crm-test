# Use Node.js with PHP
FROM node:18-alpine

# Install PHP and MySQL extension
RUN apk add --no-cache php php-pdo php-pdo_mysql

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
