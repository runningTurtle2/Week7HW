var express = require('express');
var router = express.Router();
var fs = require("fs");

let gameArr = [];


let fileManager = {
  read: function () {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    gameArr = goodData;
  },
  write: function () {
    let data = JSON.stringify(gameArr);
    fs.writeFileSync('objectdata.json', data);
  },
  validData: function () {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if (rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};



//Constructor for game object
let Game = function (pTitle, pGenre, pRelease, pURL, pArticle) {
  this.Title = pTitle;
  this.Genre = pGenre;
  this.Release = pRelease;
  this.URL = pURL;
  this.ArticalLink = pArticle
  this.ID = Math.random().toString(16).slice(5); // Unique ID per object created
};

if(!fileManager.validData()) {
gameArr.push(new Game("Red Dead Redemption 2","Action; Open World","10/26/2018","https://www.youtube.com/embed/HVRzx17WHVk",
  "https://www.ign.com/games/red-dead-redemption-2/articles"));
gameArr.push(new Game("Pokémon Legends: Arceus","Adventure; Open World","1/28/2022","https://www.youtube.com/embed/I4RynqpahT8",
    "https://www.ign.com/games/pokemon-legends-arceus/articles"));
gameArr.push(new Game("Diablo 4","Action; Adventure","6/6/2023","https://www.youtube.com/embed/Ro26B394ZBM",
    "https://www.ign.com/games/diablo-iv/articles"));
gameArr.push(new Game("The Legend of Zelda: Tears of the Kingdom","Action; Open World","5/12/2023","https://www.youtube.com/embed/uHGShqcAHlQ",
    "https://www.ign.com/games/the-legend-of-zelda-tears-of-the-kingdom/articles"));
gameArr.push(new Game("Hollow Knight: Silksong","Action; Adventure","TBA 2023","https://www.youtube.com/embed/JSfuFlhsxZY",
    "https://www.ign.com/games/hollow-knight-silksong/articles"));
fileManager.write();
}
else {
  fileManager.read();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/**Get all game data */
router.get('/getGames', function(req, res){
  fileManager.read();
  res.status(200).json(gameArr);
})

/**Add a new game */
router.post('/addGame', function(req, res){
  const newGame = req.body;
  gameArr.push(newGame);
  fileManager.write();
  res.status(200).json(newGame);
});

// add route for delete
router.delete('/deleteGame/:ID', (req, res) => {
  console.log('in server');
  const delID = req.params.ID;

  let found = false;
  let pointer = GetArrayPointer(delID);
  //if did not find game in array
  if(pointer == -1){
    console.log("not found");
    return res.status(500).json({
      status: "error - no such ID"
    });
  }
  // if did find the game
  else{
    gameArr.splice(pointer, 1); // remove 1 element at index
    fileManager.write();  // update after deletetion
    res.send('Game with ID: ' + delID + ' deleted!');
  }
});

function GetArrayPointer(localID){
  for (let i = 0; i < gameArr.length; i++){
    if(localID === gameArr[i].ID){
      return i;
    }
  }
}

module.exports = router;