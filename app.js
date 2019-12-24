var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use('/public',express.static('./public/'))

//配置使用 art-tempplate模板引擎
// 第一个参数表示，当渲染以.art 结尾得文件得时候，使用art-templa模板引擎
//express-art-template 是专门用来在express中把art-templa 整个到express
// 虽然外面这里不需要加载art-template 但是也必须安装
//因为express-art-template 依赖了art-template
// Express 为 Response 相应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中

// 如果想要修改默认的 views 目录，则可以
// app.set('views', render函数的默认路径)



var comments = [{
  name: '张三',
  message: '今天天气不错！',
  dateTime: '2015-10-16'
},
  {
	name: '张三2',
	message: '今天天气不错！',
	dateTime: '2015-10-16'
  },
  {
	name: '张三3',
	message: '今天天气不错！',
	dateTime: '2015-10-16'
  },
  {
	name: '张三4',
	message: '今天天气不错！',
	dateTime: '2015-10-16'
  },
  {
	name: '张三5',
	message: '今天天气不错！',
	dateTime: '2015-10-16'
  }
]



app.engine('html',require('express-art-template'))


//配置body-parser插件，专门用来解析表单post请求体
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/',function (req,res) {
res.render('index.html',{
  comments:comments
})
})
app.get('/post',function (req,res) {
 res.render('post.html')
})
//post方式  当以POST请求/post得时候，执行指定得处理函数
//这样得话，我们就可以利用不同得请求方法让一个请求路径使用多次
app.post('/post',function (req,res) {
	//1.获取表单post请求体数据
  //req.query只能拿get请求参数
	//console.log(req.body)
  //2.处理
  //3.发送响应
  var comment = req.body
  comment.dateTime = '2019-23-24 18:51:32'
  comments.unshift(comment)
  //重定向：
  res.redirect('/')

})


//get方式
/*app.get('/pinglun',function (req,res) {
  var comment = req.query
  comment.dateTime = '2019-23-24 18:51:32'
  comments.unshift(comment)
  //重定向：
  //res.statusCode = 302
  //res.setHeader('Location','/')
	res.redirect('/')
})*/



app.listen(3000,function () {
console.log('running')
})