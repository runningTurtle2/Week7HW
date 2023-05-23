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
gameArr.push(
  new Game(
    "Red Dead Redemption 2",
    "Action; Open World",
    "10/26/2018",
    "https://www.youtube.com/embed/HVRzx17WHVk",
    "https://www.ign.com/games/red-dead-redemption-2/articles"
  )
);
gameArr.push(
  new Game(
    "Pokémon Legends: Arceus",
    "Adventure; Open World",
    "1/28/2022",
    "https://www.youtube.com/embed/I4RynqpahT8",
    "https://www.ign.com/games/pokemon-legends-arceus/articles"
  )
);
gameArr.push(
  new Game(
    "Assassin's Creed Mirage",
    "Action; Rogue-like",
    "TBA 2023",
    "https://www.youtube.com/embed/x55lAlFtXmw",
    "https://www.ign.com/games/assassins-creed-mirage/articles"
  )
);
gameArr.push(
  new Game(
    "Diablo 4",
    "Action; Adventure",
    "6/6/2023",
    "https://www.youtube.com/embed/Ro26B394ZBM",
    "https://www.ign.com/games/diablo-iv/articles"
  )
);
gameArr.push(
  new Game(
    "The Legend of Zelda: Tears of the Kingdom",
    "Action; Open World",
    "5/12/2023",
    "https://www.youtube.com/embed/uHGShqcAHlQ",
    "https://www.ign.com/games/the-legend-of-zelda-tears-of-the-kingdom/articles"
  )
);
gameArr.push(
  new Game(
    "Hollow Knight: Silksong",
    "Action; Adventure",
    "TBA 2023",
    "https://www.youtube.com/embed/JSfuFlhsxZY",
    "https://www.ign.com/games/hollow-knight-silksong/articles"
  )
);

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
    gameArr.push(game);
    document.location.href = "index.html#library";
    // clear the input values
    document.getElementById("title").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("release").value = "";
    document.getElementById("URL").value = "";
    document.getElementById("article"). value = "";

    // refresh library
    //createList();
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

  gameArr.forEach(function (aGame) {
    let myLi = document.createElement("li");
    // adding a class name
    myLi.classList.add("aGame");
    myLi.setAttribute("data-parm", aGame.ID);
    myLi.innerHTML = "<a href='" + aGame.ArticalLink  +
      "' target='_blank'><span style='font-weight: bold;'>Title:</span> " + aGame.Title +
      "<br><span style='font-weight: bold;'>Genre:</span> " + aGame.Genre +
      "<br><span style='font-weight: bold;'>Release:</span> " + aGame.Release +
      "</a><br>" +
      '<iframe width="560" height="315" src="' + aGame.URL +
      '" title= "YouTube video player"' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"allowfullscreen></iframe><br><br>';
    myUL.appendChild(myLi);
  });
}