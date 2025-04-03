# Shadow PitBoss

Like a secret, behind-the-scenes testing master (according to ChatGPT).

Small service to manage test accounts for Testing. The service uses a SQLite DB for data storeage. During development it is only held in memory.

## Routes

### `/`, `/status`, `/health`

Type(s): `GET`

Basic healthcheck end point.

#### Request

No parameters

##### Example

```
$ curl localhost:3000/status
```

#### Response

| Field | Type | Description |
|---|---|---|
| status | `string` | The status of the application |
| message | `string` | A textual representation of the state of the app |
| version | `string` | The version of the application |

##### Example
```
{
  "status": "ok",
  "message": "Shadow Pitboss is running",
  "version": "unknown"
}
```

### `/user`, `/user/:id`

Type(s): `GET`

Gets either the user specified by the ID or a random user that is not currently in use for use in tests.

#### Request

| Name | Type | Description | Optional |
|---|---|---|---|
| id | string | The numeric ID of the user required. | yes |

##### Example

```
$ curl localhost:3000/
```

#### Response

Returns the full user object from DB. Ultimately the response data should be filtered but it is not necessery for this POC.

| Field | Type | Description |
|---|---|---|
| id | `int` | The numeric ID of the user. |
| username | `string` | The username of the user. |
| pin | `string` | The user's PIN. |
| email | `string` | The user's e-mail. |
| locked | `boolean` | Whether the user is locked or not (should always be locked after being returned). This ultimately should be removed. |
| created_at | `Date` | The time and date that the record was created. This ultimately should be removed. |

##### Example
```
{
  "id": 1,
  "username": "NXT_USR_1",
  "pin": "123456",
  "email": "testing+1@flutteruki.com",
  "locked": 0,
  "created_at": "2025-04-03 13:41:26"
}
```

### `/user`

Type(s): `POST`

Creates a new user within the DB.

#### Request

The user's information.

| Name | Type | Description | Optional |
|---|---|---|---|
| username | `string` | The user's username. | no |
| pin | `string` | The user's PIN. | no |
| email | `string` | The user's e-mail address. | no |

##### Example

```
$ curl \                                                                
  --header "Content-Type: application/json" \
  --request POST \
  --data '{ "username": "test", "pin": "098765", "email": "bla@flutteruki.com" }' \
  localhost:3000/user
```

#### Response

| Field | Type | Description |
|---|---|---|
| success | `boolean` | Indicator for the success of the request. |
| user | `object` | The user data sent in the request. |

##### Example
```
{
  "success": true,
  "user": {
    "username": "test",
    "pin": "098765",
    "email": "bla@flutteruki.com"
  }
}
```

### `/user`

Type(s): `PATCH`

Updates the user data.

#### Request

| Name | Type | Description | Optional |
|---|---|---|---|
| id | `int` | The numeric ID for the user. | yes |
| username | `string` | The user's username. | yes |
| pin | `string` | The user's PIN. | yes |
| email | `string` | The user's e-mail address. | yes |

##### Example

```
$ curl \
  --header "Content-Type: application/json" \
  --request PATCH \
  --data '{ "id": 1, "username": "test", "pin": "098765", "email": "bla@flutteruki.com" }' \
  localhost:3000/user
```

#### Response

| Field | Type | Description |
|---|---|---|
| success | `boolean` | Indicator for the success of the request. |
| user | `object` | The user data sent in the request. |

##### Example
```
{
  "success": true,
  "user": {
    "id": 1,
    "username": "test",
    "pin": "098765",
    "email": "bla@flutteruki.com"
  }
}
```

### `/user`

Type(s): `DELETE`

Removes a user from the pool.

#### Request

| Name | Type | Description | Optional |
|---|---|---|---|
| id | `number` | The ID of the user to remove. | no |

##### Example

```
$ curl \
  --header "Content-Type: application/json" \
  --request DELETE \
  --data '{ "id": 1 }' \
  localhost:3000/user
```

#### Response

| Field | Type | Description |
|---|---|---|
| success | `boolean` | Indicator for the success of the request. |

##### Example
```
{
  "success": true
}
```

### `/user/release`

Type(s): `POST`

Releases the specified user account back into the pool to be utilised again.

#### Request

| Name | Type | Description | Optional |
|---|---|---|---|
| id | `int` | The ID of the user account to release. | no |

##### Example

```
$ curl localhost:3000/
```

#### Response

| Field | Type | Description |
|---|---|---|
| success | `boolean` | Indicator for the success of the request. |

##### Example
```
{
  "success": true
}
```

## Development

At this stage this is a very simple POC.

To start the local dev server...

```
$ npm i
$ npm run dev
```