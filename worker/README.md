###

Install docker, npm, node

```
npm run install
```

Run redis

```
docker run -p 6379:6379 redis
```


Copy `.env.sample` to `.env`

and modify the data accordingly

Run the worker

```
node index.js
```

