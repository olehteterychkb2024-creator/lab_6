const Koa = require('koa');
const serve = require('koa-static');
const { koaBody } = require('koa-body');
const { Resend } = require('resend');
const path = require('path');

const app = new Koa();
const resend = new Resend('re_jaEKXHSd_NQULS5Byy1pByWM1ReDUEPkm');


app.use(serve(path.join(__dirname, 'public')));

// Обробка даних з форм
app.use(koaBody());

app.use(async (ctx) => {
    // Якщо прийшов POST запит на /send
    if (ctx.method === 'POST' && ctx.path === '/send') {
        const { name, email, message } = ctx.request.body;

        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'твій-мейл@gmail.com', // Куди прийде лист
                subject: `Повідомлення від ${name}`,
                html: `<p><strong>Від:</strong> ${email}</p><p>${message}</p>`
            });
            ctx.body = { success: true };
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: error.message };
        }
    }
});

app.listen(3000, () => {
    console.log('Сервер працює на http://localhost:3000');
});