# REST API Documentation

The Strapi backend provides a comprehensive REST API for managing content and performing various operations.

## Authentication

### Login
```http
POST /api/auth/local
Content-Type: application/json

{
  "identifier": "user@example.com",
  "password": "password"
}
```

Response:
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "user",
    "email": "user@example.com"
  }
}
```

### Register
```http
POST /api/auth/local/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password"
}
```

## Content Types

### List Content Types
```http
GET /api/content-types
Authorization: Bearer <token>
```

### Get Single Content Type
```http
GET /api/content-types/:uid
Authorization: Bearer <token>
```

## Content Management

### Create Content
```http
POST /api/:contentType
Authorization: Bearer <token>
Content-Type: application/json

{
  "data": {
    "title": "New Content",
    "content": "Content body"
  }
}
```

### Update Content
```http
PUT /api/:contentType/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "data": {
    "title": "Updated Content"
  }
}
```

### Delete Content
```http
DELETE /api/:contentType/:id
Authorization: Bearer <token>
```

## Media Library

### Upload File
```http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
```

### Get File
```http
GET /api/upload/files/:id
Authorization: Bearer <token>
```

## Users & Permissions

### Get Current User
```http
GET /api/users/me
Authorization: Bearer <token>
```

### Update User
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "updatedusername"
}
```

## Error Handling

The API returns standard HTTP status codes and error messages:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Invalid email or password"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per minute for authenticated users
- 50 requests per minute for unauthenticated users

## Best Practices

1. **Authentication**
   - Always use HTTPS
   - Store tokens securely
   - Implement token refresh

2. **Requests**
   - Use appropriate HTTP methods
   - Include proper headers
   - Handle errors gracefully

3. **Performance**
   - Use pagination for large datasets
   - Implement caching where appropriate
   - Optimize query parameters

## Example Usage

```javascript
// Using fetch
const response = await fetch('http://localhost:1337/api/articles', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

## Testing

You can test the API using tools like:
- Postman
- cURL
- Swagger UI (available at `/documentation`)

## Documentation

For more detailed information, visit:
- [Strapi REST API Documentation](https://docs.strapi.io/dev-docs/api/rest)
- [API Reference](https://docs.strapi.io/dev-docs/api/rest/api-endpoints) 