# Implementation Tasks

1. [x] Update `server.js` to require `./database.js` instead of creating a new SQLite connection.
2. [x] Add `POST /api/prices` endpoint: validate input, insert into `prices(date, name, price)`, return `201` with inserted record.
3. [x] Add `GET /api/prices` endpoint: support optional `q` query to filter `name` or `date`, return `200` with JSON array.
4. [x] Remove or stop creating duplicate DB file (`database.db`) in `server.js` to avoid schema mismatch.
5. [ ] Test endpoints manually using `curl` or Postman and confirm correct status codes and JSON.
