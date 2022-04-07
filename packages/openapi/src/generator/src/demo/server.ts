import * as trpc from '@trpc/server';
import http from 'http';
import { router } from './router';

const handler = trpc.createHttpHandler({
  router: router.transformer({
    serialize: (data) => {
      console.log({ type: 'serialize', data });
      return data;
    },
    deserialize: (data) => {
      console.log({ type: 'deserialize', data });
      return data;
    },
  }),
});

const server = http.createServer((req, res) => {
  // do whatever you want here
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  handler(req, res);
});

server.listen(2022);
