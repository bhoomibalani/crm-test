# Use Node.js with PHP
FROM node:18-alpine

# Install PHP and MySQL extensions
RUN apk add --no-cache php php-pdo php-pdo_mysql

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Rename composer.json.temp back to composer.json if it exists
RUN if [ -f composer.json.temp ]; then mv composer.json.temp composer.json; fi

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
