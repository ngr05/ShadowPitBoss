# Shadow PitBoss

Like a secret, behind-the-scenes testing master (according to ChatGPT).

Small service to manage test accounts for Testing.

## Routes

### /, /status, /health

Types: GET

Basic healthcheck end point.

```
$ curl localhost:3000/status | jq
{
  "status": "ok",
  "message": "Shadow Pitboss is running",
  "version": "unknown"
}
```

## Development

At this stage this is a very simple POC.

To start the local dev server...

```
$ npm run dev
```