let gameArr = [];

//Constructor for game object
let Game = function (pTitle, pGenre, pRelease, pURL, pArticle) {
  this.Title = pTitle;
  this.Genre = pGenre;
  this.Release = pRelease;
  this.URL = pURL;
  this.ArticalLink = pArticle
  this.ID = Math.random().toString(16).slice(5); // Unique ID per object created
};


document.addEventListener("DOMContentLoaded", function () {
  // add button events
  document.getElementById("buttonAdd").addEventListener("click", function () {
    // get the input values
    let title = document.getElementById("title").value.trim();
    let genre = document.getElementById("genre").value.trim();
    let release = document.getElementById("release").value.trim();
    let url = document.getElementById("URL").value.trim();
    let article = document.getElementById("article").value.trim();

    if (!title || !genre || !release || !url || !article) {
      alert("Fill out all fields");
      return;
    }

    let game = new Game(title, genre, release, url, article);
    //gameArr.push(game);

    $.ajax({
      url : "/addGame",
      type: "POST",
      data: JSON.stringify(game),
      contentType: "application/json; charset=utf-8",
      success: function(result){
        console.log(result);

        document.location.href = "index.html#library";
        // clear the input values
        document.getElementById("title").value = "";
        document.getElementById("genre").value = "";
        document.getElementById("release").value = "";
        document.getElementById("URL").value = "";
        document.getElementById("article"). value = "";
      }
    })
  });

  document.getElementById("buttonClear").addEventListener("click", function () {
    document.getElementById("title").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("release").value = "";
    document.getElementById("URL").value = "";
    document.getElementById("article").value = "";
  });

  $(document).on("pagebeforeshow", "#library", function (event) {
    createList();
  });
});

function createList() {
  let myUL = document.getElementById("gameList");
  myUL.innerHTML = "";

  //client code
  $.get("/getGames", function (data, status) {
    gameArr = data;

    // all code tha will use this fresh data
    gameArr.forEach(function (aGame) {
      let myLi = document.createElement("li");
      // adding a class name
      myLi.classList.add("aGame");
      myLi.setAttribute("data-parm", aGame.ID);
      myLi.innerHTML = "<a href='" + aGame.ArticalLink +
        "' target='_blank'><span style='font-weight: bold;'>Title:</span> " + aGame.Title +
        "<br><span style='font-weight: bold;'>Genre:</span> " + aGame.Genre +
        "<br><span style='font-weight: bold;'>Release:</span> " + aGame.Release +
        "</a><br>" +
        '<iframe width="560" height="315" src="' + aGame.URL +
        '" title= "YouTube video player"' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"allowfullscreen></iframe><br><br>';
      myUL.appendChild(myLi);
    });

  });
  
};