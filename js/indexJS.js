let myButton = document.getElementById("start");

let playerOne;
let playerTwo;
let numOfSticks = 21;
let counter = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let allPlayers = [];
let playersScores = [];


let theIndexOfPlayer1,theIndexOfPlayer2;

myButton.addEventListener("click", function () {

    playerOne = document.getElementById("p1Name").value;
    playerTwo = document.getElementById("p2Name").value;
    if (playerOne != "" && playerTwo != "") {
        let myForm = document.querySelector("form");
        let box = document.querySelector(".box");

        box.style.display = "flex";
        box.style.justifyContent = "space-around";
        box.style.alignItems = "center";
        box.style.flexDirection = "column";
        myForm.style.display = "none";
        
        if( ! allPlayers.includes(playerOne) )
            allPlayers.push(playerOne);

        if( ! allPlayers.includes(playerTwo) )
            allPlayers.push(playerTwo);
 
        theIndexOfPlayer1 = allPlayers.indexOf(playerOne);
        theIndexOfPlayer2 = allPlayers.indexOf(playerTwo);

        playerOneScore = playersScores[theIndexOfPlayer1];
        playerTwoScore = playersScores[theIndexOfPlayer2];
        if(playerOneScore == undefined || playerOneScore === NaN)
        {
            playerOneScore = 0;
            playersScores[theIndexOfPlayer1] = 0;
        }
        if(playerTwoScore == undefined || playerTwoScore === NaN)
        {
            playerTwoScore = 0;
            playersScores[theIndexOfPlayer2] = 0;
        }
        
        playTheGame();

    }
    else {
        alert("Please enter your name..");
    }

});
let yourPick = 0;
function playTheGame() {

    if (counter % 2 == 0) {
        alert("It is " + playerOne + "'s Turn");
    }
    else
        alert("It is " + playerTwo + "'s Turn");

}

let allSticks = document.querySelectorAll(".stick");
console.log(allSticks);
let theWinnerTag = document.querySelector(".winnerClass");
let h1 = document.querySelector(".winnerClass h1");

for (let i = 0; i < allSticks.length; i++) {

    allSticks[i].addEventListener("click", function () {
        // console.log(yourPick);
        if (yourPick != 3) {
            if (numOfSticks == 1) {
                let box = document.querySelector(".box");
                // allSticks[i].style.display = "none";
                if (counter % 2 == 0)
                    {
                        alert( playerTwo + " Wins");
                        box.style.display = "none";
                        theWinnerTag.style.display = "flex";
                        theWinnerTag.style.justifyContent = "center";
                        theWinnerTag.style.alignItems = "center";
                        theWinnerTag.style.flexDirection = "column";
                        h1.innerHTML = playerTwo + " " + "wins";
                        playerTwoScore += 2;
                        playersScores.splice(theIndexOfPlayer2,1,playerTwoScore);
                    }
                else
                    {
                        alert( playerOne + " Wins");
                        box.style.display = "none";
                        theWinnerTag.style.display = "flex";
                        theWinnerTag.style.justifyContent = "center";
                        theWinnerTag.style.alignItems = "center";
                        theWinnerTag.style.flexDirection = "column";
                        h1.innerHTML = playerOne + " " + "wins";
                        playerOneScore += 2;
                        playersScores.splice(theIndexOfPlayer1,1,playerOneScore);
                    }
                showTheTop3();
            }
            else {
                allSticks[i].style.display = "none";
                yourPick++;
                numOfSticks--;
            }
        }
        else
            alert("You can't pick more than 3..");
    });
}

let endTurn = document.querySelector(".box button");
endTurn.addEventListener("click", function () {
    if (yourPick != 0) {
        counter++;
        yourPick = 0;
        playTheGame();
    }
    else
        alert("please choose one stick at least..");
});

let playAgainButton = document.querySelector(".winnerClass button");
playAgainButton.addEventListener( "click", function(){
    let myForm = document.querySelector("form");
    let highScore = document.querySelector(".highScore");
    // let box = document.querySelector(".box");
    highScore.style.display = "none";
    theWinnerTag.style.display = "none";
    // box.style.display = "flex";
    // box.style.justifyContent = "space-around";
    // box.style.alignItems = "center";
    // box.style.flexDirection = "column";
    myForm.style.display = "block";
    numOfSticks = 21;
    counter = 0;
    yourPick = 0;
    let mysticks = document.querySelectorAll(".stick");
    for( let i=0; mysticks.length; i++ ){
        mysticks[i].style.display = "block";
    }

    
    playTheGame();
} );

function showTheTop3(){


    
    let temp1=0,temp2="";
    for( let i=0; i<playersScores.length; i++){
        for(let j=i+1; j<playersScores.length; j++){
            if( playersScores[i] < playersScores[j] )
            {
                temp1 = playersScores[i]; // 5
                playersScores[i] = playersScores[j];  //6
                playersScores[j] = temp1;  // 5
                
                temp2 = allPlayers[i];
                allPlayers[i] = allPlayers[j];
                allPlayers[j] = temp2;
            }
        }
    }

    let highScore = document.querySelector(".highScore");
    highScore.style.display = "block";
    let html = "<h1 class='heading'> Scores</h1>";
    for( let i=0; i<allPlayers.length; i++ ){
        html += "<h1>" + allPlayers[i] + "  " + playersScores[i] + "</h1>" ;
    }

    highScore.innerHTML = html;

}