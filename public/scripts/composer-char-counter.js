$(document).ready(function() {
  $("textarea#tweet-text").on('keydown', function() {
    const input = $(this).val();
    const left = 140 - input.length;
    console.log(input);
    console.log('left to use:', left);
  
    $(this).parentsUntil("div").find(".counter").val(left);
  });
});