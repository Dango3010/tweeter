/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const createTweetElement = function (data) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }; //not interpreted (triggering, having effect as JS), but renders the string as normal text.
    const time = timeago.format(data['created_at']);
    let tweet = `
  <article id='single-tweet'>
    <header>
      <span>
        <img src="${data['user'].avatars}">
        <span style='color:grey;'>${data['user'].name}</span>
      </span>
      <span style='color: lightgrey;'>${data['user']['handle']}</span>
    </header>
    <br>
    <p class='text' style='margin-top: 11px; margin-bottom: 11px;'>
      <span>${escape(data['content'].text)}</span>
    </p>
    <footer>
      <span style='padding-left: 7px; font-size: 15px;'>${time}</span>
      <div>
        <span class="icon"><i class="fa-brands fa-font-awesome"></i></span>
        <span class="icon" style='padding-left:3px;'><i class="fas fa-retweet"></i></span>
        <span class="icon" style='padding-left:3px;'><i class="fa-solid fa-heart"></i></span>
      </div>
    </footer>
  </article>
  <br>
  `;
    return tweet;
  };

  const renderTweets = function (tweets) {
    $('#tweets-container').empty();
    for (let i = tweets.length - 1; i >= 0; i--) {
      const $each = createTweetElement(tweets[i]);
      $('#tweets-container').append($each);
    }
  };

  //get request func
  const loadTweets = function () {
    $.get('/tweets', function (data) {
      console.log('Success: ', data);
      renderTweets(data);
    })
  }

  //form submission
  $("form").submit(function (event) {
    event.preventDefault();
    const formValues = $(this).serialize();
    const input = $('#tweet-text').val();
    console.log(input);
    $('.new-tweet p').slideUp();
    if (!input) {
      alert('the tweet is empty');
    } else if (input.length > 140) {
      $('.new-tweet p').slideDown(function(){
        $('.new-tweet p').addClass('show');
      });
    } else {
      $.post('/tweets', formValues)
        .then(() => {
          loadTweets();
          this.reset();
        })
    }
  });

  loadTweets() //to post 2 default user tweets first
});