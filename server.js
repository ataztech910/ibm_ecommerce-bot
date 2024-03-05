// TODO use typescript and build stage for this file
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Telegraf, Markup } = require('telegraf');

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const token = process.env.NEXT_PUBLIC_TG_BOT_API_KEY;

// Create a new Telegram bot instance
const bot = new Telegraf(token, { polling: true });

// Listen for incoming messages

bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.hears('successful_payment', async (ctx, next) => { 
  await ctx.reply('Successful Payment')
});

bot.hears('pay', (ctx) => {
    const chatId = ctx.chat.id;
    const invoice = {
      chat_id: chatId,
      title: 'IBM Shop Test',
      description: 'Test for the bot payment',
      payload: {
        unique_id: `${chatId}_${Number(new Date())}`,
        provider_token: '284685063:TEST:ZGIxYTEzYmQxZDAz',
      },
      provider_token: '284685063:TEST:ZGIxYTEzYmQxZDAz',
      currency: 'EUR',
      prices: [
        { label: 'Test invoice', amount: 1000 }
      ],
      start_parameter: 'e_shop_test',
      photo_url: '',
      need_shipping_address: false,
      is_flexible: true,
     };

    return ctx.replyWithInvoice(invoice);
})



bot.on("message", async (ctx) => {
  console.log(ctx.message);
  if(ctx.message.text === 'show me your best goods') {
    await ctx.reply(
      "Sure, here is the list of products",
      Markup.inlineKeyboard([
        Markup.button.webApp(
          "Open list",
          "https://t.me/IBMIX_Commerce_Bot/IBM_wep_app?start_app=somevalue",
        ),
      ])
    );
  }
  console.log('ctx');
});

bot.on("polling_error", (msg) => console.log(msg));

bot.use(Telegraf.log());
bot.launch();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
 
      if (pathname === '/generateInvoice') {
        const invoice = {
          chat_id: query.query_id,
          title: 'IBM Shop Test',
          description: 'Test for the bot payment',
          payload: {
            unique_id: `${query.query_id}_${Number(new Date())}`,
            provider_token: '284685063:TEST:ZGIxYTEzYmQxZDAz',
          },
          provider_token: '284685063:TEST:ZGIxYTEzYmQxZDAz',
          currency: 'EUR',
          prices: [
            { label: 'Test invoice', amount: 1000 }
          ],
          start_parameter: 'e_shop_test',
          photo_url: '',
          need_shipping_address: false,
          is_flexible: true,
        };
   
        res.statusCode = 200;
        const invoiceLink = await bot.telegram.createInvoiceLink(invoice);
        res.end(JSON.stringify({data: {
          invoiceLink
        }}));
       }
      else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error('err', err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on https://${hostname}:${port}`);
    })
});

