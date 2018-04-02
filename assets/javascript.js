

$(document).ready(function() {
  createBtn();
});


var topics = [
    "street sharks",
    "legends of the hidden temple",
    "nostalgia",
    "nintendo 64",
    "toonami",
    "the adventures of pete and pete",
    "super nintendo",
    "home improvement"
  ];

function createBtn() {
  
    //makes sure there arent any duplicate buttons
  $("#buttons").empty();

  for (var i = 0; i < topics.length; i++) {
    var btn = $("<button>" + topics[i] + "</button>");
    btn.addClass("gif");
    btn.attr("data-state", "still");
    btn.attr("data-name", topics[i]);
    btn.attr("onclick", "displayGifs('" + topics[i] + "')");
    btn.appendTo("#buttons");
    console.log(btn);
  }

  
}
// Adding Buttons on click
$("#addGif").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#gifInput").val();
    topics.push(newTopic);
    console.log(topics);
    createBtn();
  });

$(".gif").on("click", function() {
    var motion = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});


// Gif Display
function displayGifs(topic) {
  //    var topic = $(this).attr("data-name");
  var queryUrl =
    "http://api.giphy.com/v1/gifs/search?q=" +
    topic +
    "&limit=10&api_key=qXGhaKB7L5bbiU7qC9oRTDEoHptmeRNy";
  var apiKey = "qXGhaKB7L5bbiU7qC9oRTDEoHptmeRNy";

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    if (response.data.length > 1) {
      for (var i = 0; i < 11; i++) {
        var result = response.data;
        var img = $("<img>");
        var imgUrl = result[i].images.original.url;
        img.attr("src", imgUrl);
        $("#gifs").prepend(img);
        console.log(response);
      }
    }
  });
}
