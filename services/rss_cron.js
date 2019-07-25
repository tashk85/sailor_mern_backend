const { CronJob } = require("cron");
const rssService = require("./../services/rss_service");
// Feeds that our app pulls from:
const feeds = [
  "https://medcitynews.com/feed/", 
  "https://www.digitalhx.com/feed/", 
  "https://www.healthcareitnews.com/home/feed"
]

// Intial fetch upon starting up server
feeds.forEach(feed => rssService.fetchRSS(feed));

// */2 -> triggers every 2 hours
const job = new CronJob('0 0 */2 * * *', function() {
  console.log("*** CRON is running ***")
  feeds.forEach(feed => rssService.fetchRSS(feed));
  const d = new Date();
  console.log("All articles fetched CRON ", d);
})

job.start();