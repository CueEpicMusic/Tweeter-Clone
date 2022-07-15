/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const loadtweets = function () {
  $.get("/tweets").then((res) => {
    $(".main-tweets .tweet-container").html("");
    renderTweets(res);
  });
};

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    createTweetElement(tweet);
  }
};

const safeHTML = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
          <strong>${safeHTML(tweet.content.text)}</strong>
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
  return $(".main-tweets .tweet-container").prepend($tweet);
};
const displayError = (error) => {
  $("#tweet-form").find(".error-section").slideDown("slow");
  $("#tweet-form").find(".error-message").text(error);
};

$(document).ready(function () {
  loadtweets();
  $(".error-section").hide();
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    if ($(this).find("textarea").val().length < 1) {
      const errorMessage = "Cannot send empty tweet!";
      return displayError(errorMessage);
    }
    if ($(this).find("textarea").val().length > 140) {
      const errorMessage = "Cannot send tweet with more than 140 characters!";
      return displayError(errorMessage);
    }
    const tweet = $(this).serialize();
    $(".error-section").slideUp("slow");
    $.post("/tweets", tweet).then((data) => {
      $(this).find("textarea").val("");
      loadtweets();
    });
  });
});
