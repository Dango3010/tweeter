$(document).ready(function() {
  $(".text").on('input', function() {
    const input = $(this).val().length;
    const left = 140 - input;
    console.log(input);
    console.log('left to use:', left);
  
    $(this).siblings("div").children(".counter").text(left);
    if (input > 140) {
      $(function(){
        $("output").addClass("negative");
      });
    } else {
      $("output").removeClass("negative");
    }
  });
});