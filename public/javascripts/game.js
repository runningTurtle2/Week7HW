document.addEventListener("DOMContentLoaded", function () {

    let randNum = newRand(1, 11);

    //console.log(randNum)   <-- Cheat Code
    document.getElementById("guess").addEventListener('click', function(){

        const arrLength = gameArr.length;
        const index = newRand(0, arrLength);
        const obj = gameArr[index];
        const userGuess = parseInt(document.getElementById("play").value.trim());

        document.getElementById("play").value = "";
        if(userGuess === randNum){
            alert('YOU WON! Here is your prize!')
            displayPrize(obj);
            removeGame(index);
        }
        else{
            alert('You lost.. gg')  
        }

        randNum = newRand(1, 11); // generate new number after guess

        //console.log(obj);
        //console.log(index);       
    })// ================================ end of button


    function newRand(min, max){
        return parseInt(Math.random()* (max - min) + min) // generate number
    }

    function removeGame(pIndex){
        gameArr.splice(pIndex, 1) // Removes game by index, only 1 game is deleted
    }

    function displayPrize(obj){
        let myUL = document.getElementById("prize");
        myUL.innerHTML = "";

        let myLi = document.createElement("li");
        myLi.innerHTML =
      "<a style='text-decoration:none' href='" + obj.ArticalLink  + "' target='_blank'><span style='font-weight: bold;'>Title:</span> " + obj.Title +
      "<br><span style='font-weight: bold;'>Genre:</span> " + obj.Genre +
      "<br><span style='font-weight: bold;'>Release:</span> " + obj.Release +
      "</a><br>" +
      '<iframe width="560" height="315" src="' + obj.URL +
      '" title= "YouTube video player"' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"allowfullscreen></iframe><br><br>';
      myUL.appendChild(myLi);
    }
});