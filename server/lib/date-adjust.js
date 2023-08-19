"use strict";

const fs = require("fs");
let tweetsJSON = require('../data-files/initial-tweets.json');

module.exports = () => {
  // One day in milliseconds is 86400000ms or...
  // oneDayMs = 1000 milliseconds * 60 seconds * 60 minutes * 24 hours.
  const oneDayMs = 1000 * 60 * 60 * 24
  // Subtract one day in milliseconds (oneDayMs) times the tweets length minus the current index.
  // This keeps the newest tweets at the bottom, and allows for further tweets to be added.
  tweetsJSON = tweetsJSON.map((tweet, index) => {
    tweet.created_at = Date.now() - (oneDayMs * (tweetsJSON.length - index));
    return tweet;
  });
  // Re-write the tweets with the new date values.
  fs.writeFileSync('server/data-files/initial-tweets.json', JSON.stringify(tweetsJSON, null, 2), { encoding: "utf8" });
};
