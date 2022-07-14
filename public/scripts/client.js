/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const loadtweets = function () {
  $.get("/tweets").then((res) => {
    renderTweets(res)
  })
}

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    createTweetElement(tweet);
  }
};

const createTweetElement = function (tweet) {
  let $tweet = `<article>
        <header>
          <div class="tweeter-name">
            <img src="${tweet.user.avatars}">
            <p>${tweet.user.name}</p>
          </div>
          <div class="tweeter-handle">
            <strong>${tweet.user.handle}</strong>
          </div>
        </header>
        <div class="tweeter-tweet">
          <strong>${tweet.content.text}</strong>
        </div>
        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <ul>
            <li>
              <i class="fa-solid fa-flag"></i>
            </li>
            <li>
              <i class="fa-solid fa-retweet"></i>
            </li>
            <li>
              <i class="fa-solid fa-heart"></i>
            </li>
          </ul>
        </footer>
      </article>`;
  return $(".main-tweets").append($tweet);
};

$(document).ready(function () {
  loadtweets();

  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    $.post("/tweets", tweet).then((data) => {
      console.log(data)
    });
  });
});
