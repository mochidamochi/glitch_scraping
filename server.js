const express = require('express');
const app = express();
const client = require('cheerio-httpcli');

app.use(express.static('public'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/search/:pre/:idL/:idM/:idS/', function(req, res) {
  let trgUrl = 'https://tabelog.com/' + req.params.pre + "/" + req.params.idL + "/" + req.params.idM + "/" + req.params.idS
  console.log("【server】" + trgUrl)
  let rs = {}
  let p = client.fetch(trgUrl)

  //スクレイピング
  p.then(function (result) {
    console.log("[fetch]title:" + result.$('title').text())
    result.$('.c-table.c-table--form.rstinfo-table__table').each(function (idx) {
      let tbody = result.$(this).children('tbody')
      tbody.children('tr').each(function (idx) {
        let item = result.$(this).children('th').text()
        let val = result.$(this).children('td').text()
        rs[item.replace(/\s+/g, "")] = val.replace(/\s+/g, "")
      }
    )})
    console.log(rs)
  });
  
  p.catch(function (err) {
    console.log(err);
  });
 
  p.finally(function () {
    res.json({ param: rs });
  });
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
