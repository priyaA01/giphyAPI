// Initial array of animals
var animals = ["Dog", "Cat", "Hamster", "Mouse", "Bunny", "Monkey", "Dolphin", "Seal"];
var imageClicked = false;

// Function for displaying animal buttons 
function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < animals.length; i++) {
    var a = $("<button>");
    a.addClass("animal btn btn-primary");
    a.attr("data-name", animals[i]);
    a.text(animals[i]);
    $("#buttons-view").append(a);
    $("#buttons-view").append(" ");
  }
}

//Function to display giphy's from gipphy API
function displayAnimalInfo() {

  $("#images").html("");
  var animalName = $(this).attr("data-name");
  var limit = 10;
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=dc6zaTOxFJmzC&limit=" + limit;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");
      gifDiv.addClass("inline");
      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      animalImage.attr("data-state", "still");
      animalImage.addClass("img-thumbnail animalImage");
      animalImage.attr("hspace", "20");

      gifDiv.prepend(p);
      gifDiv.append(animalImage);
      gifDiv.append(" ");

      $("#images").append(gifDiv);
    }

  });


}

// Function to animal giphy images with the data-attributes
function animalAnimate() {

  var state = $(this).attr("data-state");
  if (state == "still") {
    var src = $(this).attr("data-animate");
    $(this).attr("src", src);
    $(this).attr("data-state", "animate");
  } else if (state == "animate") {
    var src = $(this).attr("data-still");
    $(this).attr("src", src);
    $(this).attr("data-state", "still");
  }

}


// This function handles events when one button is clicked
$("#add-animal").on("click", function (event) {

  event.preventDefault();
  var animal = $("#animal-input").val().trim();
  if (animal != "") {
    animals.push(animal.charAt(0).toUpperCase() + animal.slice(1));
    $("#animal-input").val("");
    renderButtons();
  }

});

//on click of animal button
$(document).on("click", ".animal", displayAnimalInfo);
//on click of giphy image , animate function is called
$(document).on("click", "img", animalAnimate);
//button creation function is called
renderButtons();