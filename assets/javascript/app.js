var animalsArray = ["cat", "dog", "elephant", "lion"];

// Create a button 

function putAnimals() {
  for (var i = 0; i < animalsArray.length; i++) {
    var newButton = $("<button>");
    newButton.text(animalsArray[i]);
    newButton.attr("data-search", animalsArray[i].toLowerCase());
    $("#animals-views").append(newButton);
  }
  addEvents();
};

// Create a function to get the Giffs

function addEvents() {
  $('button').on('click', function () {
    console.log("Clicked");
    console.log(this)
    var a = $(this).data("search");
    console.log(a)

    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + a + "&api_key=tQLibo125m6ouB7MGYhXIKAwy3pQlsdK&limit=10";
    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).then(function (response) {
      $("#GIFArea").empty();
      for (var i = 0; i < response.data.length; i++) {
        $("#GIFArea").prepend("<p>Rating: " + response.data[i].rating + "</p>");
        var img = $("<img>");
        img.attr("src", response.data[i].images.downsized_still.url);
        img.attr("data-still", response.data[i].images.downsized_still.url);
        img.attr("data-animate", response.data[i].images.downsized.url);
        img.attr("data-state", "still");
        $("#GIFArea").prepend(img);
      }

      $("img").on("click", function () {
        console.log($(this));
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    })
  })



  // The Main process
  $("#add-animal").on("click", function (event) {
    console.log("I am putting in an animal");
    $("#animals-views").empty();
    var animalsText = $("#animals-input").val();
    animalsArray.push(animalsText);
    event.preventDefault();
    putAnimals();
  });
}

putAnimals();