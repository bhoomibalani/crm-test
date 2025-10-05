# Use PHP 8.2
FROM php:8.2-cli

# Install MySQL extension
RUN docker-php-ext-install pdo pdo_mysql

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Rename composer.json.temp back to composer.json if it exists
RUN if [ -f composer.json.temp ]; then mv composer.json.temp composer.json; fi

# Expose port
EXPOSE 8080

# Start PHP built-in server
CMD ["php", "-S", "0.0.0.0:8080", "-t", "."]
