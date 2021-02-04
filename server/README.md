# Interview Scheduler API

## Setup

Install dependencies with `npm install`.

## Creating The DB

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`. This command **MUST** be run in a vagrant terminal, we are using the PostgreSQL installation provided in the vagrant environment.

Create a database with the command `CREATE DATABASE whodo_development;`.



## Seeding

Run a the development server with `npm start` in the Host environment. We are only using vagrant for `psql` this week.

Both of these achieve the same result.

- Make a `GET` request to `/debug/reset` with `curl http://localhost:8001/debug/reset`.
- Use the browser to navigate to `http://localhost:8001/debug/reset`.


## Run The Server

Running the server normally
```sh
npm start
```

Running the server so it returns an error when saving/deleting for testing the client's error handling capabilities
```sh
npm run error
```

## Api

### Users

`GET /users`

Response

```json
[
  {
    "id": 1,
    "name": "Saoussen",
    "last_name": " Slii",
    "birth_date": "1985-04-23T05:00:00.000Z",
    "gender": "female",
    "email": "sawsan_sli3i@live.fr",
    "password": "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u",
    "profile_pic": null,
    "country": "Canada",
    "region": "North America",
    "city": "Ottawa",
    "referrer": "a",
    "type": "normal",
    "relationship": "married",
    "family": " I have at least one sibling|I have children"
  }
]
```

### Topics

`GET /topics`

Response:

```json
[
{
"id": 1,
"topic": "Public/strangers"
},
{
"id": 2,
"topic": "Family"
},
{
"id": 3,
"topic": "Romance"
},
{
"id": 4,
"topic": "Friends"
},
{
"id": 5,
"topic": "Partner/Dating"
},
{
"id": 6,
"topic": "Neighbors"
},
{
"id": 7,
"topic": "School"
},
{
"id": 8,
"topic": "Work"
},
{
"id": 9,
"topic": "General"
}
]
```



### Questions

`GET /questions`

Response:

```json
[
{
"id": 1,
"topic_id": 1,
"creator_id": 3,
"question": "Allowing yourself to be seated at a bad table even though you had reservations",
"time": "2020-01-15T09:05:06.000Z",
"approved": true
},
{
"id": 2,
"topic_id": 1,
"creator_id": 3,
"question": "Asking to share a table with strangers at a crowded restaurant or bar",
"time": "2020-01-16T09:05:06.000Z",
"approved": true
}
]
```
