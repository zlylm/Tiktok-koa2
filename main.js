const Koa = require('koa')
const fs = require("fs");
const app = new Koa()
const Router = require('koa-router');
const router = new Router();
const cors = require('koa2-cors')

router.get('/',(ctx,next)=>{
    ctx.body = '欢迎'
}).get('/getCity',(ctx,next)=>{
    ctx.body = readCity()
})


app.use(cors()) //处理跨域
app.use(router.routes()).use(router.allowedMethods());

app.listen(2020,()=>{
    console.log('服务启动成功')
    readCity()
})

function readCity() {
    var bin = fs.readFileSync('./city.json','utf-8');
    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) { //处理转换符问题
        bin = bin.slice(3);
    }
    return JSON.parse(bin.toString('utf-8'));
}