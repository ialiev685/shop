import fp from 'fastify-plugin';

export const routes = fp((instance) => {
  instance.get('/', (_req, res) => {
    res.send('hello world');
  });
});
