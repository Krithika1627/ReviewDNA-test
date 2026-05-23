# ReviewDNA-test

Small Node.js + Express demo app for AI code review tooling.

## Setup

1. Install dependencies:

	```bash
	npm install
	```

2. Start the server:

	```bash
	npm start
	```

3. Open the app:

	- `GET /health` for a basic health check
	- `POST /auth/register` to create a mock user
	- `POST /auth/login` to get a JWT
	- `GET /users/me` with `Authorization: Bearer <token>`

## Notes

- The database is in-memory and resets when the server restarts.
- Set `JWT_SECRET` in your environment for a custom signing secret.
