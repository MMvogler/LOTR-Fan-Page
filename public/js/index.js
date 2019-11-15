// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

$(document).on("click", ".navbar-right .dropdown-menu", function(e) {
  e.stopPropagation();
});

$(document).ready(function() {
  $("#signUp").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    console.log("test");
    event.preventDefault();
    var newUser = {
      firstName: $("#firstName")
        .val()
        .trim(),
      lastName: $("#lastName")
        .val()
        .trim(),
      email: $("#email")
        .val()
        .trim()
    };
    if (!(newUser.firstName && newUser.lastName && newUser.email)) {
      alert("You must fill out the entire form.");
      return;
    }
    console.log(newUser);
    // Send the POST request.
    $.ajax("/api/user", {
      type: "POST",
      data: newUser
    }).then(function() {
      
      console.log("added new user");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $("#submitMessage").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var newMessage = {
      title: $("#title")
        .val()
        .trim(),
      name: $("#name")
        .val()
        .trim(),
      message: $("#message")
        .val()
        .trim()
    };
    if (!(newMessage.title && newMessage.name && newMessage.message)) {
      alert("You must fill out the entire form.");
      return;
    }
    // Send the POST request.
    $.ajax("/api/message", {
      type: "POST",
      data: newMessage
    }).then(function() {
      console.log("added new message");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $.ajax("/api/message", {
    type: "GET"
  }).then(function(data) {
    for (var i = data.length - 1; i >= 0; i--) {
      var card = $("<div class='card' id='messageCard'>");
      var cardHead = $("<div class='card-header'>");
      cardHead.html(
        `
        <h3>${data[i].title}</h3>
        `
       );
      var cardBody = $("<div class='card-body'>");
      cardBody.html(
        `
        ${data[i].message}
        `
      );
      var cardFooter = $("<div class='card-footer'>");
      cardFooter.html(
        `
        <b>Posted By: </b>${data[i].name}
        `
      )
      card.append(cardHead);
      card.append(cardBody);
      card.append(cardFooter);
      $("#forumMessages").append(card);
    }
  });

  $("#submitSpotify").on("click", function(event) {
    $.ajax("/api/soundtracks", {
        type: "GET"
    }).then(function(data) {
        console.log(data);
    for (var i = 0; i < data.tracks.items.length; i++) {
    var myCol = $('<div class="col-md-3 d-flex mb-4"></div>');
    var card = $("<div class='card' id='musicCard'>");
    var cardImg = $(
    `
    <img src="${data.tracks.items[i].album.images[1].url}" class="card-img-top" alt="album-cover"> 
    `
    )
    var cardHead = $(
    `
    <h6 class="card-body">
    `
    )
    var cardFooter = $(
      `
      <div class="card-footer">
      <a href="${data.tracks.items[i].album.external_urls.spotify}" target="_blank" class="btn btn-primary">Play on Spotify</a>
      `
    );
    
    cardHead.text(data.tracks.items[i].album.name);
    //var cardBody = $("<div class='card-body'>");
    //cardBody.text(data[i].message);
    card.append(cardImg);
    card.append(cardHead);
    card.append(cardFooter);
    card.appendTo(myCol);
    //card.append(cardBody);
    myCol.appendTo('#albumsDiv');
  
  }
  });
  });
});
