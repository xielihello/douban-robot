var request = require('co-request');
var cheerio = require('cheerio');
var co = require('co');
var CronJob = require('cron').CronJob;
var debug = require('debug')('douban-robot');
var config = require('./config');

var robot = new CronJob('0 */10 9-21 * * *', co(cronTask), null, true, 'Asia/shanghai'); 
robot.start();

function* cronTask() {
  // var groupIndex = (yield request({url: config.group, jar: true, headers: config.headers})).body;
  // var $ = cheerio.load(groupIndex);
  // var topicUrls = $('#group-topics tr').map(function () {
  //   var td = $(this).children('td');
  //   return {
  //     url: td.eq(0).find('a').attr('href'),
  //     comment: +td.eq(2).text()
  //   };
  // });


  const len = Math.floor(Math.random() * config.messages.length);
  var message = config.messages[len];
  yield request({followRedirect: false, method: 'post', url: config.url[len] + '/add_comment', form: {ck: 'BhyO', rv_comment: message}, jar: true, headers: config.headers});
  debug('%s -> %s', config.url[len], message);


  // for (var i = topicUrls.length - 1; i >= 0; i--) {
  //   var topicUrl = topicUrls[i];
  //   if (topicUrl.comment === 0 && topicUrl.url) {
  //     var topicIndex = (yield request({url: topicUrl.url, jar: true, headers: config.headers})).body;
  //     // 取到 ck
  //     var ck = '';
  //     $ = cheerio.load(topicIndex);
  //     $('input').each(function () {
  //       if ($(this).attr('name') == 'ck') ck = $(this).val();
  //     });
  //     // 回复随机内容 or 调用 simsimi api
  //     // yield request({followRedirect: false, method: 'post', url: config.url.u2 + '/add_comment', form: {ck: ck, rv_comment: message}, jar: true, headers: config.headers});
  //     // yield request({followRedirect: false, method: 'post', url: config.url.u3 + '/add_comment', form: {ck: ck, rv_comment: message}, jar: true, headers: config.headers});
  //     // yield request({followRedirect: false, method: 'post', url: config.url.u4 + '/add_comment', form: {ck: ck, rv_comment: message}, jar: true, headers: config.headers});
  //   }
  // }
}