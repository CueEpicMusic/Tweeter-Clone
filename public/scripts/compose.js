const scrollFunction = function () {
  let scrollTop = $(window).scrollTop()
  if (scrollTop < 50) {
    $(".scrollUp").hide()
  } else {
    $(".scrollUp").show()
  }
};

$(window).scroll(scrollFunction)

//Scroll up function
$(".scrollUp").click(function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});
