$(document).ready(function () {

    // all my global variables mostly counters
    const totalRows = 3;
    const totalCols = 3;
    const totalSquares = totalRows * totalCols;
    var pcCount = -1;
    var humanCount;
    var pcArray = [];
    var humanArray = [];
    var tryNine = 0;
    var chosenRow;
    var chosenCol;
    var win5=0;


    // the rules of the game once you click on the game a .hide() makes go away

    $("#rules").html("<b>RULES:</b><br> " +
        "Play will alternate between the human player and an automated computer player. "+
        "<i>Computer player does not play intelligently; it will guess randomly.</i><br><br> "+
        "The player makes a move by clicking on an open square. An image of a human will be placed in the square. " +
        "<br><br> "+ "The human player can't cheat and choose a square that already "+
        "contains a marker (either an human or an PC). The computer player's is a computer.<br><br> "+
        "<i>The computer makes a move by generating a random number between 1 and 9.</i> "+
        "If the space is open (has neither an human nor PC). <br><br>If it is not, "+
        "it generates a new random number until a valid position is found. Once a valid number is generated, "+
        "places an image of a PC in that square. <br><br> "+
        "<h5> Game ends in a win or draw. Eight ways to win:  "+
        " Three in a row horizontally, vertically, or diagonally.</h5> ");

    // tryNine I need this to determine draws

    tryNine = parseInt(tryNine);

    createBoard();

    // hide what we don't need to see

    $("#reStart").hide();
    $("#pCreStart").hide();
    $("#draWreStart").hide();

    // human and PC wins display then turn off the square until user click button

    function humanWins()
    {

        $("#endGame").text("HUMANS WIN! " );
        $("span.square").off();
        $("#reStart").show().text("PLAY AGAIN!").click(function() {
            window.location.reload();
        });

    }
    function pCWins() {
        $("#pCendGame").text("Computer WIN! ")
        $("span.square").off();
        $("#pCreStart").show().text("PLAY AGAIN!").click(function() {
            window.location.reload();
        });}

    function drawAction(){
        $("#draw").text("All the squares are used up");
        $("span.square").off();
        $("#draWreStart").show().text("DRAW: PLAY ANOTHER").click(function () {
            window.location.reload();
        });}
    // if we have a win and there a five squares for human THEN NOT A DRAW

    function humanFiveWin() {
        $("#draw").text("All the squares are used up and we see: ");
        $("span.square").off();
        $("#draWreStart").show().text("HUMAN WINS").click(function () {
            window.location.reload();
        });
    }
    // created by Stacy Read

    function humanPlayerTurn() {
        // what square was clicked?
        var chosenSquare = $(this);
        // get the row and col info from the data attributes
        chosenRow = chosenSquare.data("row");
        chosenCol = chosenSquare.data("col");
        console.log(`Human player chose row ${chosenRow} col ${chosenCol}`);

        var squareOccupied = chosenSquare.hasClass("human-player")
            || chosenSquare.hasClass("computer-player");
        if (!squareOccupied) {
            console.log("It was free");
            // Give the square a CSS class
            chosenSquare.addClass("human-player");
            tryNine++;

            // Checking for Draw
            // ahh how to access that last square (the missing link)
            if(tryNine !== 9) {
                // let the computer have a turn
                computerPlayerTurn();
                // remember 5 squares placed WITH a win is NOT a draw
            }
            else if (win5 === 5){
                humanFiveWin();
            }
            else if (tryNine === 9 || tryNine === undefined || tryNine === null || tryNine === ''){
                drawAction();   // check on this
            }

            // human picture :: Gavin my grand son :)
            var x = document.createElement("IMG");
            x.setAttribute("src", "gavin.png");
            x.setAttribute("width", "180");
            x.setAttribute("height", "180");
            x.setAttribute("alt", "The Big X");
            document.body.appendChild(x);

            chosenSquare.html(x);

            //////////////////////do math //////////////////////////////////

            // with human we get a row and col int math them together to make an element value

            humanCount = chosenRow*3 + chosenCol;
            pcArray.push(pcCount);
            if(humanCount === 4) {humanArray[0]='x'; win5++;}
            if(humanCount === 5) {humanArray[1]='x'; win5++;}
            if(humanCount === 6) {humanArray[2]='x'; win5++;}
            if(humanCount === 7) {humanArray[3]='x'; win5++;}
            if(humanCount === 8) {humanArray[4]='x'; win5++;}
            if(humanCount === 9) {humanArray[5]='x'; win5++;}
            if(humanCount === 10) {humanArray[6]='x'; win5++;}
            if(humanCount === 11) {humanArray[7]='x'; win5++;}
            if(humanCount === 12) {humanArray[8]='x'; win5++;}

            function findFive()
            {
                if(win5 === 5) {
                    humanFiveWin();
                }
                else{
                    humanWins();
                }
            }

            if(humanArray[0] === 'x' && humanArray[1] === 'x' && humanArray[2] === 'x')  findFive();
            if(humanArray[3] === 'x' && humanArray[4] === 'x' && humanArray[5] === 'x')  findFive();
            if(humanArray[6] === 'x' && humanArray[7] === 'x' && humanArray[8] === 'x')  findFive();
            if(humanArray[0] === 'x' && humanArray[3] === 'x' && humanArray[6] === 'x')  findFive();
            if(humanArray[1] === 'x' && humanArray[4] === 'x' && humanArray[7] === 'x')  findFive();
            if(humanArray[2] === 'x' && humanArray[5] === 'x' && humanArray[8] === 'x')  findFive();
            if(humanArray[0] === 'x' && humanArray[4] === 'x' && humanArray[8] === 'x')  findFive();
            if(humanArray[2] === 'x' && humanArray[4] === 'x' && humanArray[6] === 'x')  findFive();
            if(pcCount === 0) pcArray[0]='x';
            if(pcCount === 1) pcArray[1]='x';
            if(pcCount === 2) pcArray[2]='x';
            if(pcCount === 3) pcArray[3]='x';
            if(pcCount === 4) pcArray[4]='x';
            if(pcCount === 5) pcArray[5]='x';
            if(pcCount === 6) pcArray[6]='x';
            if(pcCount === 7) pcArray[7]='x';
            if(pcCount === 8) pcArray[8]='x';
            if(pcArray[0] === 'x' && pcArray[1] === 'x' && pcArray[2] === 'x')  pCWins();
            if(pcArray[3] === 'x' && pcArray[4] === 'x' && pcArray[5] === 'x')  pCWins();
            if(pcArray[6] === 'x' && pcArray[7] === 'x' && pcArray[8] === 'x')  pCWins();
            if(pcArray[0] === 'x' && pcArray[3] === 'x' && pcArray[6] === 'x')  pCWins();
            if(pcArray[1] === 'x' && pcArray[4] === 'x' && pcArray[7] === 'x')  pCWins();
            if(pcArray[2] === 'x' && pcArray[5] === 'x' && pcArray[8] === 'x')  pCWins();
            if(pcArray[0] === 'x' && pcArray[4] === 'x' && pcArray[8] === 'x')  pCWins();
            if(pcArray[2] === 'x' && pcArray[4] === 'x' && pcArray[6] === 'x')  pCWins();

            // pc gave us a number so no extra calculation needed

            //////////////////////////// end math /////////////////////////////\\

        }
    }
    // more from Stacy Read

    function computerPlayerTurn() {
        var squareOccupied = false;
        var chosenSquare;

        do {
            // pick a random square number
            var randomSquareNum = Math.floor(Math.random() * totalSquares);
            console.log("Computer player chose square #" + randomSquareNum);

            pcCount = randomSquareNum;

            // select the chosen square
            chosenSquare = $(".square").eq(randomSquareNum);


            // does the square have the class "computer-player" or "human-player"?
            if (chosenSquare.hasClass("computer-player")
                || chosenSquare.hasClass("human-player")) {
                squareOccupied = true;
                console.log("It was already taken!");

            } else {
                squareOccupied = false;
                console.log("It was free");
                tryNine++;
            }
            $("#rules").hide();
        } while (squareOccupied);

        // give the square a CSS class
        chosenSquare.addClass("computer-player");

        // computer picture
        var x = document.createElement("IMG");
        x.setAttribute("src", "computer.png");
        x.setAttribute("width", "180");
        x.setAttribute("height", "180");
        x.setAttribute("alt", "The computer");
        document.body.appendChild(x);

        chosenSquare.html(x);

    }



    // CREATE BOARD NOTHING NEW TO SEE HERE [gone too far] //

    // rest from Stacy Read the game platform developer
    // I did remove the random color square part replaced with grey

    function createBoard() {
        // How big can each square be?
        // Add 2 to allow for one square's worth of padding on either side
        var squareWidth = Math.round(window.innerWidth / (totalCols + 2));
        console.log("width: " + squareWidth);
        var squareHeight = Math.round(window.innerHeight / (totalRows + 2));
        console.log("height: " + squareHeight);

        // Choose the smaller of the two dimensions so both height and width
        // will fit in the viewport and still be a square
        var bestDimension = Math.min(squareWidth, squareHeight);
        console.log("Squares should be: " + bestDimension);


        // store the board div in a variable
        var gameBoardDiv = $("#board");

        // loop to print rows of squares
        for (var rowNum = 1; rowNum <= totalRows; rowNum++) {
            // Create a new row
            var rowOfSquares = $("<div>");
            // give the row the class of "row" (for Bootstrap)
            rowOfSquares.addClass("row justify-content-center");
            // add the row to the gameboard
            gameBoardDiv.append(rowOfSquares);

            // loop to print the squares in each row
            for (var colNum = 1; colNum <= totalCols; colNum++) {
                // create an empty element to be a square on the board
                var square = $("<span>");
                // give the square its row number as data
                square.data("row", rowNum);
                // give the square its column number as data
                square.data("col", colNum);
                // set the width and height of the square
                square.width(bestDimension);
                square.height(bestDimension);
                // give the square the class of "square" to make it inline-block
                square.addClass("square");
                // display the square's row and column info
                // square.html(`Row ${rowNum}<br>Col ${colNum}`); //don't need
                // make the square run a function when clicked
                square.click(humanPlayerTurn);
                // color of the squares
                square.css("background-color", "grey");

                // add the square to the current row
                rowOfSquares.append(square);
            }
        }
    }


});