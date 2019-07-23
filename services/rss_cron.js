const { CronJob } = require("cron");
const rssService = require("./../services/rss_service");

const feeds = [
  "https://medcitynews.com/feed/", 
  "https://www.digitalhx.com/feed/", 
  "https://www.healthcareitnews.com/home/feed"
]

// Intial fetch upon starting up server
feeds.forEach(feed => rssService.fetchRSS(feed));

// */10 -> triggers every 2 hours
// Midnight: "00 00 00 * * *";
const job = new CronJob('* * */2 * * *', function() {
  feeds.forEach(feed => rssService.fetchRSS(feed));
  const d = new Date();
  console.log("Fetched RSS feed", d);
})

job.start();