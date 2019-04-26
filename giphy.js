var topics = ['darth vader', 'the force', 'yoda', 'anakin', 'princess leia', 'lightsaber', 'stormtrooper', 'chewbacca', 'han solo'];
//render buttons from topics array
function renderButtons() {
    $("#sw-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("topic btn btn-dark");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#sw-buttons").append(button);
    }
};

//on click to add
$("#add").on("click", function(e){
    e.preventDefault();
    //grab from inputh
    var newButton = $("#sw-input").val().trim();
    //push from input to array if valid
    if (newButton.length != 0){    
        topics.push(newButton);
    }
    // call renderButtons()
    renderButtons();
    $("#sw-input").val(null);
});

$(document).on("click", ".topic", "#sw-buttons", function(){
    //we want to replace the gifs with every click of a new button
    $("#gifs").empty();

    var swTopic = $(this).attr("data-name");
    console.log(swTopic);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + swTopic + "&api_key=OafaKqcWs9iA3sgWfU3jf3rLuhV8u94h&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(resp){
        var results = resp.data;
        console.log(results);

        for (var i = 0; i < results.length; i++) {
            var gifArea = $("<div id=\"item\">");

            var rating = results[i].rating;
            console.log(rating);

            var ratingInfo = $("<p>").text("Rating: " + rating);

            var swImages = $("<img>");

            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            //important attributes to change state with clicks
            swImages.attr("src", still);
            swImages.attr("data-state", "still");
            swImages.attr("data-still", still);
            swImages.attr("data-animate", animated);
            swImages.addClass("sw-image");
            //apend onto gifArea
            gifArea.append(ratingInfo);
            gifArea.append(swImages);
            $("#gifs").append(gifArea);
        };
    });
});

$(document).on("click", ".sw-image", function(){
    var state = $(this).attr("data-state");
    //if still, we want to change to animated, and vice-versa
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

renderButtons();