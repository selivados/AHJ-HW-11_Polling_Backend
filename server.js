const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const { faker } = require('@faker-js/faker');

const app = new Koa();
const router = new Router();
let messages = [];

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());


router.get('/messages/unread', (ctx) => {
  if (Math.random() > 0.8) {
    ctx.response.status = 500;

    return;
  }

  const newMessageCount = Math.floor(Math.random() * 4);

  for (let i = 0; i < newMessageCount; i++) {
    const newMessage = {
      id: faker.string.uuid(),
      from: faker.internet.email(),
      subject: faker.lorem.words(),
      body: faker.lorem.paragraphs(2),
      received: faker.date.between({
        from: "2020-01-01T00:00:00.000Z",
        to: Date.now(),
      }),
    };
  
    messages.push(newMessage);
  }

  ctx.response.body = JSON.stringify({
    status: "ok",
    timestamp: Date.now(),
    messages: messages,
  });

  messages = [];
});

const port = process.env.PORT || 7070;
app.listen(port);
