/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(data) {
  const time = timeago.format(data['created_at']);
  let $tweet = `
  <article id='single-tweet'>
    <header>
      <span>
        <i class="fas fa-skull"></i>
        <span style='color:grey; padding-left: 10px;'>${data['user'].name}</span>
      </span>
      <span style='color: lightgrey;'>${data['user']['handle']}</span>
    </header>
    <br>
    <footer>
      <textarea>${data['content'].text}</textarea>
    </footer>
    <div>
      <span>${time}</span>
      <span>
        <span class="icon"><i class="fa-brands fa-font-awesome"></i></span>
        <span class="icon" style='padding-left:3px;'><i class="fas fa-retweet"></i></span>
        <span class="icon" style='padding-left:3px;'><i class="fa-solid fa-heart"></i></span>
      </span>
    </div>
  </article>
  <br>
  `; //create the tweet element
  return $tweet;
};

const renderTweets = function(tweets) {
  for (let item of tweets) {
    const $each = createTweetElement(item)
    console.log($each);
    $(document).ready(function(){
      $('#tweets-container').append($each);
    });
  }
};

//form submission
$(document).ready(function(){
  $("form").submit(function(event) {
    event.preventDefault();
    const formValues = $(this).serialize(); 
    console.log(formValues);
    $.post('/tweets', formValues)
    .then(loadTweets)
  });
});

//get request func
const loadTweets = function(){
  $.get('/tweets', function(data){
    console.log('Success: ', data);
    renderTweets(data);
  })
}