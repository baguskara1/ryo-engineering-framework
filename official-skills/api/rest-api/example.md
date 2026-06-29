# Examples

## Example 1: RESTful Resource Endpoints

```
GET    /api/v1/users          - List users (paginated)
POST   /api/v1/users          - Create a user
GET    /api/v1/users/:id      - Get a user
PUT    /api/v1/users/:id      - Replace a user
PATCH  /api/v1/users/:id      - Partially update a user
DELETE /api/v1/users/:id      - Delete a user
GET    /api/v1/users/:id/posts - List user's posts
```

## Example 2: Paginated Response

```json
GET /api/v1/users?page=1&limit=20

{
  "data": [{ "id": 1, "name": "Alice" }],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  },
  "links": {
    "self": "/api/v1/users?page=1&limit=20",
    "next": "/api/v1/users?page=2&limit=20",
    "prev": null
  }
}
```
