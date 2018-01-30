// Initial array of movies
var animals = ["Dog", "Cat", "Hamster", "Bear"];
var imageClicked=false;

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

  function displayAnimalInfo() {

    $("#images").html("");
    var animalName=$(this).text();
    //$(this).focus();
    var limit=10;
    var rating="pg";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ animalName +"&api_key=dc6zaTOxFJmzC&limit="+limit+"&rating="+rating;
    
   $.ajax({
    url: queryURL,
    method: "GET"
   }).then(function(response) {
    for(var i=0;i<=limit;i++){
        $("#images").append("<img class='img-thumbnail' hspace='20' src="+JSON.stringify(response.data[i].images.fixed_height_still.url)+">");
      
     } });


      }


  // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        
        event.preventDefault();
        var animal = $("#animal-input").val().trim();        
        animals.push(animal.charAt(0).toUpperCase()+animal.slice(1));
        $("#animal-input").val("");

        renderButtons();

      });

 $(document).on("click", ".animal", displayAnimalInfo);
 //$("#images").on("click","img",displayAnimalInfo);


  renderButtons();

