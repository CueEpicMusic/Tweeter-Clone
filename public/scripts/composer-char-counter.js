$(document).ready(function() {
  $("#tweet-text").on("input", function (event) {
    let currentLength = $(this).val().length
    let output = $(".main-tweets output")
    output.val(140 - currentLength)

    if (currentLength > 140) {
      output.addClass("counter-red")
    } else {
      output.removeClass("counter-red")
    }
  })
});