# RD & Company CRM - PHP Backend

This is the PHP backend for the RD & Company CRM system.

## Setup Instructions

### 1. Database Setup
1. Make sure MySQL is running on your system
2. Import the database schema:
   ```sql
   mysql -u root -p < database/schema.sql
   ```
3. Update database credentials in `config/database.php` if needed

### 2. Web Server Setup
1. Place this folder in your web server directory (e.g., `htdocs` for XAMPP, `www` for WAMP)
2. Make sure PHP 7.4+ is installed
3. Enable PDO MySQL extension

### 3. API Endpoints

#### Login
- **URL**: `POST /api/login.php`
- **Body**: 
  ```json
  {
    "email": "admin@rdcompany.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "user": {
      "id": 1,
      "email": "admin@rdcompany.com",
      "name": "Admin User",
      "role": "admin"
    }
  }
  ```

#### Logout
- **URL**: `POST /api/logout.php`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logout successful"
  }
  ```

#### Verify Session
- **URL**: `GET /api/verify.php`
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "id": 1,
      "email": "admin@rdcompany.com",
      "name": "Admin User",
      "role": "admin"
    }
  }
  ```

### 4. Sample Users
The database includes these sample users (password: `password123`):
- admin@rdcompany.com (Admin)
- manager@rdcompany.com (Manager)
- sales@rdcompany.com (Sales)
- office@rdcompany.com (Office)
- client@rdcompany.com (Client)

### 5. CORS Configuration
The API is configured to allow requests from any origin. For production, update the CORS headers in each API file.
