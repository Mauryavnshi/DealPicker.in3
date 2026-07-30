# DealPicker — Test Credentials

## Admin (JWT auth)
- Endpoint: `POST /api/auth/admin/login`  body: `{ "email": "<>", "password": "<>" }`
- Verify session: `GET /api/auth/admin/me` with `Authorization: Bearer <token>` OR cookie `dp_admin=<token>`
- Logout: `POST /api/auth/admin/logout`
- Frontend login page: `/admin/login`

### Default admin
| Field    | Value                    |
|----------|--------------------------|
| Email    | `admin@dealpicker.in`    |
| Password | `dealpicker2025`         |
| Role     | `admin`                  |

Set via env vars (`.env`):
```
ADMIN_EMAIL=admin@dealpicker.in
ADMIN_PASSWORD=dealpicker2025
ADMIN_JWT_SECRET=dp_jwt_supersecret_change_me_in_prod_2026
```
Password is hashed at seed time with **bcryptjs**. Env password change triggers re-hash on next request.

## Public API endpoints
- `GET  /api/health`
- `GET  /api/products?category=&brand=&q=`
- `GET  /api/products/:slug`
- `GET  /api/categories`
- `GET  /api/brands`
- `GET  /api/search?q=`
- `POST /api/newsletter/subscribe` — body `{ email }`
- `POST /api/contact` — body `{ name, email, message }`

## Brute-force protection
- 5 failed logins per `${ip}:${email}` = 15 min lockout (HTTP 429)
- Cleared on success

## Notes
- No test users beyond admin — admin panel itself is deferred to next phase.
- All data lives in MongoDB collections: `admins`, `products`, `newsletter`, `contact_submissions`, `login_attempts`.
