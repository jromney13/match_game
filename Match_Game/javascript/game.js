"use strict"

document.getElementById("startButton").addEventListener("click",buttonPress);

var numSymbols = 0;
var clicks = [];
var clickCount = 0;


function buttonPress()
{
numSymbols = document.getElementById('numSymbols').value;
if (numSymbols > 8)
{
    numSymbols = 8;
}
else if (numSymbols < 1)
{
    numSymbols = 1;
}
document.getElementById('startForm').remove()
generateBoard()
}

function shuffleArray(array) {              // Credit: Richard Durstenfeld 1964 - "Durstenfeld Shuffle Algorithm"
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function generateBoard()
{   
    var num = 8 - parseInt(numSymbols)
    var symbolArray1 = ['!','@','#','$','%','^','&','*'];
    for (var i = 0; i < num; i++)
    {
        symbolArray1.pop();
    }
    var symbolArray2 = symbolArray1;
    var finalArray = symbolArray1.concat(symbolArray2);
    shuffleArray(finalArray)  
    
    
    var game = document.getElementById('game')
    game.innerHTML = '<table id="table"><tbody id="gameTable"></tbody></table>'
    if (numSymbols == 2)
    {
        var count = 0
        for (var i = 0; i < numSymbols; i++)
        {   
            document.getElementById('gameTable').innerHTML += '<tr><td>' + finalArray[0 + count] 
            + '</td><td>'+ finalArray[1 + count] + '</td></tr>'
            count = count + 2
        }
    }
    else if (numSymbols == 8)
    {
        var count1 = 0
        for (var i = 0; i < 4; i++)
        {
            document.getElementById('gameTable').innerHTML += '<tr><td>' + finalArray[0 + count1] + '</td><td>'
             + finalArray[1 + count1] + '</td><td>' + finalArray[2 + count1] + '</td><td>' + finalArray[3 + count1] + '</td></tr>'
            count1 = count1 + 4
        }
    }
    else if (numSymbols == 1)
    {
        var count2 = 0
        for (var i = 0; i < 1; i++)
        {
            document.getElementById('gameTable').innerHTML += '<tr><td>'
             + finalArray[0 + count2] + '</td><td>' + finalArray[1 + count2] + '</td></tr>'
        }
        count2 = count2 + 2
    }
    else if (numSymbols == 3)
    {
        var count3 = 0;
        for (var i = 0; i < 2; i++)
        {
            document.getElementById('gameTable').innerHTML += '<tr><td>' + finalArray[0 + count3]
             + '</td><td>' + finalArray[1 + count3] + '</td><td>' + finalArray[2 + count3] + '</td></tr>'
            var count3 = count3 + 3;
        }
    } 
    else if (numSymbols == 4)
    {
        var count4 = 0;
        for (var i = 0; i < 2; i++)
        {
            document.getElementById('gameTable').innerHTML += '<tr><td>' + finalArray[0 + count4]
             + '</td><td>' + finalArray[1 + count4] + '</td><td>' + finalArray[2 + count4]
              + '</td><td>' + finalArray[3 + count4] + '</td></tr>'
            count4 = count4 + 4
        }
    }
    else if (numSymbols == 5)
    {
        var count5 = 0
        for (var i = 0; i < 2; i++)
        {
            document.getElementById('gameTable').innerHTML += '<tr><td>' + finalArray[0 + count5]
             + '</td><td>' + finalArray[1 + count5] + '</td><td>' + finalArray[2 + count5] + '</td><td>'
             + finalArray[3 + count5] + '</td><td>' + finalArray[4 + count5] + '</td></tr>'
            count5 = count5 + 5
        }
    }
    else if (numSymbols == 6)
    {
        var count6 = 0
        for (var i = 0; i < 3; i++)
        {
            document.getElementById('gameTable').innerHTML += '<tr><td>' + finalArray[0 + count6] + '</td><td>' 
            + finalArray[1 + count6] + '</td><td>' + finalArray[2 + count6] + '</td><td>' + finalArray[3 + count6] + '</td></tr>'
            count6 = count6 + 4
        }
    }
    else if (numSymbols == 7)
    {
        var count7 = 0
        for (var i = 0; i < 2; i++)
        {
            document.getElementById('gameTable').innerHTML += '<tr><td>' + finalArray[0 + count7] + '</td><td>' 
            + finalArray[1 + count7] + '</td><td>' + finalArray[2 + count7] + '</td><td>' + finalArray[3 + count7] 
            + '</td><td>' + finalArray[4 + count7] + '</td><td>' + finalArray[5 + count7] + '</td><td>' + finalArray[6 + count7] + '</td></tr>'
            count7 = count7 + 7
        }
    }
    var countP = document.createElement("p")
    countP.setAttribute("id","countP")
    document.body.appendChild(countP)
    countP.innerHTML = "Number of guesses: "

    clickCells()
}


function clickCells()
{
    var tableCells = document.querySelectorAll("table#table td")
    for (var i = 0; i<tableCells.length; i++)
    {
        tableCells[i].addEventListener("mousedown",
        function(a)
            {
                clickCount += 1;
                a.target.className = "clicked";
                if (clickCount % 2 == 0)
                {
                    countP.innerHTML = "Number of guesses: " + (clickCount/2);
                }
                if (clickCount % 2 == 0 && clickCount != 0)
                {
                lockClick()
                window.setTimeout(checkClick,700)
                window.setTimeout(unlockClick,700)
                }
            }
        );
    }
}

function checkClick()
{
    var clicked = document.getElementsByClassName("clicked")
    if (clicked[0].innerHTML != clicked[1].innerHTML)
    {
        for (var i = 0; i<clicked.length; i++)
        {
            clicked[i].className = "unmatched"
        }
        for (var i = 0; i<clicked.length; i++)
        {
            clicked[i].className = "unmatched"
        }
    }
    else
    {
        for (var i = 0; i<clicked.length; i++)
        {
            clicked[i].className = "matched"
        }
        for (var i = 0; i<clicked.length; i++)
        {
            clicked[i].className = "matched"
        }
    }
    
    var win = true;
    var tdCount = document.querySelectorAll("table#table td")
    for (var i = 0; i<tdCount.length; i++)
    {
        if (tdCount[i].className != "matched")
        {
            win = false;
        }
    }

    if (win == true)
    {
        document.getElementById("table").style.display = "none"
        countP.innerHTML = "Winner! It took you " + clickCount/2 + " guesses. Thanks for Playing!"
        countP.style.color = "red"
        countP.style.textShadow = "2px 2px black"
    }

}

function lockClick()
{
    var game = document.getElementById('game')
    game.setAttribute("id","game_off")
}

function unlockClick()
{
    var game1 = document.getElementById('game_off')
    game1.setAttribute("id","game")
}