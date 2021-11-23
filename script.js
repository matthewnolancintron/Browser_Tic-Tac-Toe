/**
 * things to add later:
 * 
 * fill the underline with wining players color on victory
 * animate the fill too
 * 
 * animate or add more effect when pressing the gamesquare
 * could add that via just css directly in the style sheets
 * or also add classes here
 * 
 * css animations...
 * 
 */

//module
const gameBoardObject = (function() {
    //declare private variables and/or functions
    /**
     * could add a set board function
     * that calls displayGameBoard and
     * calls another function adds the
     * event listner on each square element
     * 
     * but display game board already
     * loops over each game square to set
     * it's text content
     * why not just set the event listner
     * during that loop instead of 
     * call two function by a master
     * function just to set up a similiar
     * situation sound less performant
     * and redundant goes against dry
     * for the sake of naming and clariety
     * could just fix current naming 
     * instead of set board and display
     * board just call one function called 
     * set board since it doesn't 
     * display a board it just sets it...
     * 
     * 
     */

    //
    function setGameBoard(p1,p2,gameMode,difficulty) {
        /**
         * 3. share in the chatroom  
         */

        if(gameMode == "vsAi"){
            let gameBoardElement = document.getElementById('gameBoard');
            let gameBoardSquareElements = document.getElementsByClassName('gameSquare');
            let possibleMovesLeft = [];

            //animate the border kinda
            gameBoardElement.style.border = 'inset 27px black';

            //sets each game square to the gameboard arrays vaules
            for( let index = 0; index < gameBoardSquareElements.length; index++){
                //each game square's textContent correspods to a value
                //at a specific index from the gameboard array
                gameBoardSquareElements[index].textContent = this.gameBoard[index];

                //set event listner to listen for clicks
                // or listen for player clicks...
                gameBoardSquareElements[index].addEventListener('click',(e) => {
                /**
                 * check if gameSquare already has playerMarker
                 * in it
                 */
                if(gameBoardObject.gameBoard[index] == p1.playerMarker || gameBoardObject.gameBoard[index] == p2.playerMarker){
                    //spot is already filled
                    //console.log(gameBoardObject.gameBoard[index],'is here')
                    /**
                     * todo:
                     * could add animation effect for when player tries to 
                     * add mark to an already filled square
                     * sound effect too...
                     */
                } else {
                    //TODO: turn diffrent parts into a function

                    //set the color of square to the players color
                    gameBoardSquareElements[index].style.backgroundColor = p1.isPlayerTurn ? p1.playerColor : p2.isPlayerTurn ? p2.playerColor: 'white';
                    
                    //set background color of marker
                    //to black or white depending on color of square
                    gameBoardSquareElements[index].style.color = (() => {
                        //capture rgb color channel digits.
                        let rbgDigitsReg = /\d+/g;
                        console.log(gameBoardSquareElements[index].style.background,'0')
                        let rgbDigits = gameBoardSquareElements[index].style.backgroundColor.match(rbgDigitsReg);
                        let r = rgbDigits[0];
                        let g = rgbDigits[1];
                        let b = rgbDigits[2];

                        console.log(rgbDigits,'rgb digits');

                        // invert color components
                       let r_i = (255 - parseInt(r));
                       let g_i = (255 - parseInt(g));
                       let b_i = (255 - parseInt(b));
                        
                       let inversePlayerColor = `rgb(${r_i},${g_i},${b_i})`
                       //
                       //gameBoardElement.style.color = inversePlayerColor;
                       gameBoardSquareElements[index].style.borderColor = inversePlayerColor;
                                              
                        gameBoardElement.style.borderColor = (r * 0.299 + g * 0.587 + b * 0.114) > 186
                        ? '#000000'
                        : '#FFFFFF';
                        
                        //  console.log(r,g,b);
                        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                        ? '#000000'
                        : '#FFFFFF';
                        
                    })();
                    
                    
                    //update gameboard array depending which players turn it is
                    gameBoardObject.gameBoard[index] = p1.isPlayerTurn ? p1.playerMarker : p2.isPlayerTurn ? p2.playerMarker: '';
                    

                    //update the possible moves
                    //empty array
                    possibleMovesLeft = [];

                    gameBoardObject.gameBoard.filter((x,index,array)=>{
                        if(x == ''){
                            possibleMovesLeft.push(index);        
                        }
                    });
                    ///console.log(possibleMovesLeft);
                    
                    //update dom
                    e.target.textContent = p1.isPlayerTurn ? p1.playerMarker : p2.isPlayerTurn ? p2.playerMarker: '';
                    
                    //style cursor for that square to show that no further action is allowed
                    gameBoardSquareElements[index].classList.add("alreadyFilled");
                    
                    //check for win:
                    /**
                     * could update
                     * to gameflow to keep track the number of moves
                     * and only start checking for a win
                     * at the third move
                     * which is the minumum number of moves
                     * to win. 
                     */
                    
                    let result = checkForWin(gameBoardObject.gameBoard,(p1.isPlayerTurn ? p1.playerMarker : p2.isPlayerTurn ? p2.playerMarker: ''));
                    console.log(result);
                    
                    /**
                     * todo: create display win function
                     * set background color of win display to playercolor
                     * use the color of the player mark for the textcolor
                     * 
                     * find a way to pass in the right values from checkForWin for color styles
                     * or add a player marker color prop set that and then use it for the win display color styles
                    */
                   
                   //condtions based on result
                   //if x has won
                   if(result == 'X wins'){
                       let winDisplayElement =  document.createElement('h2');
                       console.log('conditional works');
                       gameBoardElement.classList.add("halt");
                       gameBoardElement.classList.add("not-allowed");
                       winDisplayElement.textContent = `${result}, Congratulations ${p1.playerName}!`;
                       winDisplayElement.classList.add('winDisplay');
                       document.body.appendChild(winDisplayElement);
                       return 'end game';
                    }  
                    
                    //if o has won
                    if(result == 'O wins'){
                        //
                        let winDisplayElement =  document.createElement('h2');
                        gameBoardElement.classList.add("not-allowed");                 
                        gameBoardElement.classList.add("halt");
                        winDisplayElement.textContent = `${result}, Congratulations ${p2.playerName}!`;
                    
                        //
                        winDisplayElement.classList.add('winDisplay');
                        document.body.appendChild(winDisplayElement);

                        return 'end game';
                    }
                    
                    //if tie
                    if(result == 'Tie'){
                        let winDisplayElement =  document.createElement('h2');
                        gameBoardElement.classList.add("not-allowed");
                        gameBoardElement.classList.add("halt");
                        winDisplayElement.textContent = `${result}!`
                        
                        winDisplayElement.classList.add('winDisplay');
                        document.body.appendChild(winDisplayElement);

                        document.body.style.backgroundColor = "";
                        document.body.style.background = `linear-gradient(0.25turn, ${p1.playerColor}, ${p2.playerColor})` ;
                        
                        return 'end game';
                    }


                    //should only toggle player turns 
                    //when a square that has not been filled is filled
                    //for the first turn
                    //toggle both players isturn bools
                    console.log(p1.isPlayerTurn,'p1');
                    console.log(p2.isPlayerTurn,'ai');
                    p1.isPlayerTurn = !p1.isPlayerTurn;
                    p2.isPlayerTurn = !p2.isPlayerTurn;
                    
                    //update styles based off player turn
                    //update background color
                    //gameBoardElement.style.borderColor = p1.isPlayerTurn ? p1.playerColor : p2.isPlayerTurn ? p2.playerColor: 'white'; 
                    document.body.style.backgroundColor = p1.isPlayerTurn ? p1.playerColor : p2.isPlayerTurn ? p2.playerColor: 'white'; 

                
                    //AI's turn (depends on difficulty set)
                    //if difficult == easy,medium,hard
                    //TODO:
                    /**
                     * use minmax algorithm to make AI smart
                     * and use difficulty var with conditional
                     * to scale difficulty.
                     * 
                     * also add alpha prune algorithm
                     * for performence.
                     */

                    //random move (when easy)
                    let aiMoveChoice = possibleMovesLeft[Math.floor(Math.random()*possibleMovesLeft.length)];

                    //set the color of square to the players color
                    gameBoardSquareElements[aiMoveChoice].style.backgroundColor = p1.isPlayerTurn ? p1.playerColor : p2.isPlayerTurn ? p2.playerColor: 'white';
                    
                    //set background color of marker
                    //to black or white depending on color of square
                    gameBoardSquareElements[aiMoveChoice].style.color = (() => {
                        //capture rgb color channel digits.
                        let rbgDigitsReg = /\d+/g;
                        console.log(gameBoardSquareElements[aiMoveChoice].style.background,'0')
                        let rgbDigits = gameBoardSquareElements[aiMoveChoice].style.backgroundColor.match(rbgDigitsReg);
                        let r = rgbDigits[0];
                        let g = rgbDigits[1];
                        let b = rgbDigits[2];

                        console.log(rgbDigits,'rgb digits');

                        // invert color components
                       let r_i = (255 - parseInt(r));
                       let g_i = (255 - parseInt(g));
                       let b_i = (255 - parseInt(b));
                        
                       let inversePlayerColor = `rgb(${r_i},${g_i},${b_i})`
                       //
                       //gameBoardElement.style.color = inversePlayerColor;
                       gameBoardSquareElements[aiMoveChoice].style.borderColor = inversePlayerColor;
                                              
                        gameBoardElement.style.borderColor = (r * 0.299 + g * 0.587 + b * 0.114) > 186
                        ? '#000000'
                        : '#FFFFFF';
                        
                        //  console.log(r,g,b);
                        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                        ? '#000000'
                        : '#FFFFFF';
                    })();

                    //update gameboard array depending which players turn it is
                    gameBoardObject.gameBoard[aiMoveChoice] = p1.isPlayerTurn ? p1.playerMarker : p2.isPlayerTurn ? p2.playerMarker: '';
                    

                      //update the possible moves
                      //empty array
                      possibleMovesLeft = [];
  
                      gameBoardObject.gameBoard.filter((x,index,array)=>{
                          if(x == ''){
                              possibleMovesLeft.push(index);        
                          }
                      });
                    


                    //update dom
                    gameBoardSquareElements[aiMoveChoice].textContent = p1.isPlayerTurn ? p1.playerMarker : p2.isPlayerTurn ? p2.playerMarker: '';
                    
                    //style cursor for that square to show that no further action is allowed
                    gameBoardSquareElements[aiMoveChoice].classList.add("alreadyFilled");
                    
                    result = checkForWin(gameBoardObject.gameBoard,(p1.isPlayerTurn ? p1.playerMarker : p2.isPlayerTurn ? p2.playerMarker: ''));
                   
                   //condtions based on result
                   //if x has won
                   if(result == 'X wins'){
                       let winDisplayElement =  document.createElement('h2');
                       console.log('conditional works');
                       gameBoardElement.classList.add("halt");
                       gameBoardElement.classList.add("not-allowed");
                       winDisplayElement.textContent = `${result}, Congratulations ${p1.playerName}!`;
                       winDisplayElement.classList.add('winDisplay');
                       document.body.appendChild(winDisplayElement);
                       return 'end game';
                    }  
                    
                    //if o has won
                    if(result == 'O wins'){
                        //
                        let winDisplayElement =  document.createElement('h2');
                        gameBoardElement.classList.add("not-allowed");                 
                        gameBoardElement.classList.add("halt");
                        winDisplayElement.textContent = `${result}, Congratulations ${p2.playerName}!`;
                    
                        //
                        winDisplayElement.classList.add('winDisplay');
                        document.body.appendChild(winDisplayElement);

                        return 'end game';
                    }
                    
                    //if tie
                    if(result == 'Tie'){
                        let winDisplayElement =  document.createElement('h2');
                        gameBoardElement.classList.add("not-allowed");
                        gameBoardElement.classList.add("halt");
                        winDisplayElement.textContent = `${result}!`
                        
                        winDisplayElement.classList.add('winDisplay');
                        document.body.appendChild(winDisplayElement);

                        document.body.style.backgroundColor = "";
                        document.body.style.background = `linear-gradient(0.25turn, ${p1.playerColor}, ${p2.playerColor})` ;
                        
                        return 'end game';
                    }


                    //should only toggle player turns 
                    //when a square that has not been filled is filled
                    //for the first turn
                    //toggle both players isturn bools
                    p1.isPlayerTurn = !p1.isPlayerTurn;
                    p2.isPlayerTurn = !p2.isPlayerTurn;
                    
                    //update styles based off player turn
                    //update background color
                    //gameBoardElement.style.borderColor = p1.isPlayerTurn ? p1.playerColor : p2.isPlayerTurn ? p2.playerColor: 'white'; 
                    document.body.style.backgroundColor = p1.isPlayerTurn ? p1.playerColor : p2.isPlayerTurn ? p2.playerColor: 'white'; 
                } 
            });    
        }

        //
        gameFlowObject.setGameRestart();
        
        }

        if(gameMode == "vsLocal"){
            console.log('9')
            // * ideas for the names:
        // * display the names during play:
        // * the left side of the board is p1 name
        // * the right is p2
        // * 
        // * when creating players during set up
        // * could name player instances based on input
        // * 
        // * when displaying win screen could add players name to the
        // * congratulations
        // * 
        console.log(`${p1.playerName} is player 1 and ${p1.playerColor} is there color`);
        console.log(`${p2.playerName} is player 2 and ${p2.playerColor} is there color`);

        //console.log('game board is being set')
        let gameBoardElement = document.getElementById('gameBoard');
        let gameBoardSquareElements = document.getElementsByClassName('gameSquare');
        
        //animate the border kinda
        gameBoardElement.style.border = 'inset 27px black';
        

        //sets each game square to the gameboard arrays vaules
        for( let index = 0; index < gameBoardSquareElements.length; index++){
            //each game square's textContent correspods to a value
            //at a specific index from the gameboard array
            gameBoardSquareElements[index].textContent = this.gameBoard[index];

            //set event listner to listen for clicks
            // or listen for player clicks...
            gameBoardSquareElements[index].addEventListener('click',(e) => {
                console.log('?');
                // //check which players turn it is
                // if(p1.isPlayerTurn == true){
                //     console.log("it's player one's turn");
                //     // e is the clicked target or html
                //     console.log(`square ${e} has been clicked! by ${p1}`);
                // } else if(p2.isPlayerTurn == true) {
                //     console.log("it's player two's turn");
                //     console.log(`square ${e} has been clicked! by ${p2}`);
                // } else {

                // }
                
                //This is the gameBoard.
                //console.log(this);

                /**
                 * check if gameSquare already has playerMarker
                 * in it
                 */
                if(gameBoardObject.gameBoard[index] == p1.playerMarker || gameBoardObject.gameBoard[index] == p2.playerMarker){
                    //spot is already filled
                    //console.log(gameBoardObject.gameBoard[index],'is here')
                    /**
                     * todo:
                     * could add animation effect for when player tries to 
                     * add mark to an already filled square
                     * sound effect too...
                     */
                    console.log(gameBoardSquareElements[index],'?');
                    
                    console.log(gameBoardSquareElements[index],'?');
                } else {
                    //spot is empty and can be filled
                   
                    //set the color of square to the players color
                    gameBoardSquareElements[index].style.backgroundColor = p1.isPlayerTurn ? p1.playerColor : p2.isPlayerTurn ? p2.playerColor: 'white';
                    
                    //set background color of marker
                    //to black or white depending on color of square
                    gameBoardSquareElements[index].style.color = (() => {
                        //capture rgb color channel digits.
                        let rbgDigitsReg = /\d+/g;
                        let rgbDigits = gameBoardSquareElements[index].style.backgroundColor.match(rbgDigitsReg);
                        let r = rgbDigits[0];
                        let g = rgbDigits[1];
                        let b = rgbDigits[2];

                        console.log(rgbDigits,'rgb digits');

                        // invert color components
                       let r_i = (255 - parseInt(r));
                       let g_i = (255 - parseInt(g));
                       let b_i = (255 - parseInt(b));
                        
                       let inversePlayerColor = `rgb(${r_i},${g_i},${b_i})`
                       //
                       //gameBoardElement.style.color = inversePlayerColor;
                       gameBoardSquareElements[index].style.borderColor = inversePlayerColor;
                                              
                        gameBoardElement.style.borderColor = (r * 0.299 + g * 0.587 + b * 0.114) > 186
                        ? '#000000'
                        : '#FFFFFF';
                        
                        //  console.log(r,g,b);
                        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                        ? '#000000'
                        : '#FFFFFF';
                        
                    })();
                    
                    
                    //update gameboard array depending which players turn it is
                    gameBoardObject.gameBoard[index] = p1.isPlayerTurn ? p1.playerMarker : p2.isPlayerTurn ? p2.playerMarker: '';
                    //console.log(gameBoardObject.gameBoard);
                    //update dom
                    e.target.textContent = p1.isPlayerTurn ? p1.playerMarker : p2.isPlayerTurn ? p2.playerMarker: '';
                    
                    //style cursor for that square to show that no further action is allowed
                    gameBoardSquareElements[index].classList.add("alreadyFilled");
                    
                    //check for win:
                    /**
                     * could update
                     * to gameflow to keep track the number of moves
                     * and only start checking for a win
                     * at the third move
                     * which is the minumum number of moves
                     * to win. 
                     */
                    
                    let result = checkForWin(gameBoardObject.gameBoard,(p1.isPlayerTurn ? p1.playerMarker : p2.isPlayerTurn ? p2.playerMarker: ''));
                    console.log(result);
                    
                    /**
                     * todo: create display win function
                     * set background color of win display to playercolor
                     * use the color of the player mark for the textcolor
                     * 
                     * find a way to pass in the right values from checkForWin for color styles
                     * or add a player marker color prop set that and then use it for the win display color styles
                    */

                    
                   
                   //condtions based on result
                   //if x has won
                   if(result == 'X wins'){
                       let winDisplayElement =  document.createElement('h2');
                       console.log('conditional works');
                       gameBoardElement.classList.add("halt");
                       gameBoardElement.classList.add("not-allowed");
                       winDisplayElement.textContent = `${result}, Congratulations ${p1.playerName}!`;
                       winDisplayElement.classList.add('winDisplay');
                       document.body.appendChild(winDisplayElement);
                       return 'end game';
                    }  
                    
                    //if o has won
                    if(result == 'O wins'){
                        //
                        let winDisplayElement =  document.createElement('h2');
                        gameBoardElement.classList.add("not-allowed");                 
                        gameBoardElement.classList.add("halt");
                        winDisplayElement.textContent = `${result}, Congratulations ${p2.playerName}!`;
                    
                        //
                        winDisplayElement.classList.add('winDisplay');
                        document.body.appendChild(winDisplayElement);

                        return 'end game';
                    }
                    
                    //if tie
                    if(result == 'Tie'){
                        let winDisplayElement =  document.createElement('h2');
                        gameBoardElement.classList.add("not-allowed");
                        gameBoardElement.classList.add("halt");
                        winDisplayElement.textContent = `${result}!`
                        

                        winDisplayElement.classList.add('winDisplay');
                        document.body.appendChild(winDisplayElement);

                        document.body.style.backgroundColor = "";
                        document.body.style.background = `linear-gradient(0.25turn, ${p1.playerColor}, ${p2.playerColor})` ;
                        
                        return 'end game';
                    }


                    
                    //should only toggle player turns 
                    //when a square that has not been filled is filled
                    //for the first turn
                    //toggle both players isturn bools
                    p1.isPlayerTurn = !p1.isPlayerTurn;
                    p2.isPlayerTurn = !p2.isPlayerTurn;
                    
                    //update styles based off player turn
                    //update background color
                    //gameBoardElement.style.borderColor = p1.isPlayerTurn ? p1.playerColor : p2.isPlayerTurn ? p2.playerColor: 'white'; 
                    document.body.style.backgroundColor = p1.isPlayerTurn ? p1.playerColor : p2.isPlayerTurn ? p2.playerColor: 'white';
                 //   document.getElementsByTagName("header")[0].style.background = "none"
                    //document.getElementsByTagName("header")[0].style.color = (document.body.style.backgroundColor == 'white') ? 'black' : (document.body.style.backgroundColor == 'black') ? 'white': '';

                } 
            });    
        }

        //
        gameFlowObject.setGameRestart();
        
        }
        
    }
    
    function checkForWin(gameBoard,playerMarker){
        /**
         * logic that checks
         * for when the game is over
         * should check for 3-in-a-row and a tie
         * */
        console.log(gameBoard);
        console.log(playerMarker);

        //win
        /**
         * 0 1 2
         * [][][] 
         * 3 4 5
         * [][][]
         * 6 7 8 
         * [][][]
         * 
         * 3 of the same marker
         * on index groups 012, 345, 678 (horizontal)
         * or
         * index groups 036,147,258 (vertical)
         * or
         * index groups 048 and 246 (diagonals)
         */
        //check for X wins
        let horizontalWinBool = Boolean(
            (
                gameBoard[0] == playerMarker &&
                gameBoard[1] == playerMarker &&
                gameBoard[2] == playerMarker
            )||
            (
                gameBoard[3] == playerMarker &&
                gameBoard[4] == playerMarker &&
                gameBoard[5] == playerMarker
            ) ||
            (
                gameBoard[6] == playerMarker &&
                gameBoard[7] == playerMarker &&
                gameBoard[8] == playerMarker
            )
        );
        //console.log(horizontalWinBool,'horizontal win?');

        let verticalWinBool = Boolean(
            (
                gameBoard[0] == playerMarker &&
                gameBoard[3] == playerMarker &&
                gameBoard[6] == playerMarker
            )||
            (
                gameBoard[1] == playerMarker &&
                gameBoard[4] == playerMarker &&
                gameBoard[7] == playerMarker
            ) ||
            (
                gameBoard[2] == playerMarker &&
                gameBoard[5] == playerMarker &&
                gameBoard[8] == playerMarker
            )
        );
        //console.log(verticalWinBool,'vertical win?');

        let diagonalWinBool = Boolean(
            (
                gameBoard[0] == playerMarker &&
                gameBoard[4] == playerMarker &&
                gameBoard[8] == playerMarker
            )||
            (
                gameBoard[2] == playerMarker &&
                gameBoard[4] == playerMarker &&
                gameBoard[6] == playerMarker
            ) 
        );
        //console.log(diagonalWinBool,'vertical win?');
        
        let isWin = Boolean(
            horizontalWinBool ||
            verticalWinBool ||
            diagonalWinBool
        );
        //console.log(isWin,'won?');


        
        
        if(isWin && playerMarker =='X'){
            return 'X wins';
            
        } else if(isWin && playerMarker == 'O'){
            return 'O wins';
        }

    
        //tie
        //check if board is full
        let fullBoard = gameBoard.every(square => {
            return square == 'X' || square == 'O'
        });
        //console.log(fullBoard,'isFull');

        if(isWin == false && fullBoard ){
            return 'Tie';
        }

        //default return?
        return 'continue the game';
    }

    return {
        //declare public variables and/or functions
        //gameboard starts empty
        gameBoard: [
            '','','',
            '','','',
            '','',''
        ],
        setGameBoard,
    }
})();

//factory
function createPlayer(playerName,playerMarker,playerColor){
    let isPlayerTurn;

    return {
        playerName,
        playerMarker,
        playerColor,
        isPlayerTurn,
    };
}

//module
let gameFlowObject = (function() {
    function setGameMode(){
        document.addEventListener("DOMContentLoaded", ()=>{
            /**
             * get the modal modal header and body
             * and dynamical create and fill in the 
             * form for asking the player which game mode
             * the want to play
             * then call the function for playing that game mode
             * 
             * if local vs then call the getPlayersNames function
             * if vs AI the call startGameAgainstAI
             * 
             * 
             */
            let modalElement = document.getElementById("modal");
            console.log(modalElement);

            let overlayElement = document.getElementById("overlay");
            console.log(overlayElement);

            let modalElementHeader = document.getElementsByClassName('modal-title')[0];
            console.log(modalElementHeader);
            modalElementHeader.textContent = 'Select Game Mode';

            let modalElementBody = document.getElementsByClassName('modal-body');

            let vsButtonsGroup = document.createElement('div');
            vsButtonsGroup.classList.add('vsButtonsGroup');

            let vsLocalButton = document.createElement('button');
            vsLocalButton.textContent = 'VS Local';
            vsLocalButton.classList.add('VsButton');

            vsLocalButton.onclick = () => {
                vsButtonsGroup.remove();
                modalElementHeader.textContent = ''
                gameFlowObject.getPlayerInfo('vsLocal');
                
            };

            let vsAiButton =  document.createElement('button');
            vsAiButton.textContent = 'VS AI';
            vsAiButton.classList.add('VsButton');

            vsAiButton.addEventListener('click', () => {
                vsButtonsGroup.remove();
                modalElementHeader.textContent = ''
                gameFlowObject.getPlayerInfo('vsAi');
            });

            vsButtonsGroup.appendChild(vsLocalButton);
            vsButtonsGroup.appendChild(vsAiButton);

            modalElementBody[0].appendChild(vsButtonsGroup);
        });
    }

    function getPlayerInfo(gameMode){
        if(gameMode == 'vsAi'){

            /**
             * adjust vairable names
             * create new classes for new ai question
             * borrow most styles from other form and adject
             * use flex flow / grow to adjust size
             * 
             * update playerData to take in difficulty chosen
             * by player
             * 
             * make sure to call game start with correct
             *  values passed int
             * 
             * then start working on start game
             * use conditinoal to split vsLocal
             * from vsai
             * 
             * move ai comment from the bottom to the ai conditional
             */
            let modalElement = document.getElementById("modal");
            console.log(modalElement);

            let overlayElement = document.getElementById("overlay");
            console.log(overlayElement);

            let modalElementHeader = document.getElementsByClassName('modal-title')[0];
            console.log(modalElementHeader);
            modalElementHeader.textContent = 'Enter info';

            let modalElementBody = document.getElementsByClassName('modal-body');


              //random name... with constraints 
             
              let vowels = 'aeiou'
              let consonants = 'BCDFGHJKLMNPQRSTVWXYZ'
      
              let randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
              //let randomConsonants = consonants[Math.floor(Math.random() * consonants.length)];
              
              //random hex color thing
              let hexChoices = "0123456789ABCDEF";
      

            //build player names form then add to modal body
            let vsAiQuestionForm = document.createElement('form');
            vsAiQuestionForm.classList.add('getPlayerNamesForm');
            vsAiQuestionForm.name.value = "getPlayerNamesForm";

            let vsAiQuestionsFormGroup = document.createElement('div');
            vsAiQuestionsFormGroup.id = 'playerNamesFormGroup'; 

            let vsAiQuestionsGroup = document.createElement('div');
            vsAiQuestionsGroup.classList.add('playerQuestionsGroup');

            //player 1 
            let playerQuestionsPlayerOne = document.createElement('div');
            playerQuestionsPlayerOne.classList.add('playerQuestions');
            playerQuestionsPlayerOne.classList.add('playerOneQuestions')

            let firstQuestionForPlayerOne = document.createElement('div');
            firstQuestionForPlayerOne.classList.add('question');

            let askPlayerOneNameLabel = document.createElement('label');
            askPlayerOneNameLabel.for = "playerOneName";
            askPlayerOneNameLabel.textContent = "Player One's Name";

            let askPlayerOneNameInput = document.createElement('input');
            askPlayerOneNameInput.placeholder = "enter your name";
            askPlayerOneNameInput.name = "playerOneName";
            askPlayerOneNameInput.type = 'text';
            askPlayerOneNameInput.required = 'required';
            askPlayerOneNameInput.value  = `${consonants[Math.floor(Math.random() * consonants.length)]}${randomVowel}${(consonants[Math.floor(Math.random() * consonants.length)]).toLowerCase()}`;

            let secondQuestionForPlayerOne = document.createElement('div');
            secondQuestionForPlayerOne.classList.add('question');

            let askPlayerOneColorLabel = document.createElement('label');
            askPlayerOneColorLabel.for = "playerOneColor";
            askPlayerOneColorLabel.textContent = 'Select your color'

            let askPlayerOneColorInput = document.createElement('input');
            askPlayerOneColorInput.type = 'color';
            askPlayerOneColorInput.value = `#${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}`;
            askPlayerOneColorInput.name = "playerOneColor";
            askPlayerOneColorInput.required = "required";

            //AI
            let vsAiQuestions = document.createElement('div');
            vsAiQuestions.classList.add('playerQuestions');
            vsAiQuestions.classList.add('vsAiQuestions')

         
            //select difficulty
            let difficultyQuestion = document.createElement('div');
            difficultyQuestion.classList.add('question','difficultyQuestion');

            let askDifficultyLabel = document.createElement('label');
            askDifficultyLabel.for = "difficulty";
            askDifficultyLabel.textContent = 'Select difficulty'

            //select
            let askDifficultySelect = document.createElement('select');
            askDifficultySelect.name = 'difficulty';
            askDifficultySelect.required = "required";
            

            //options
            let easyChoice = document.createElement('option')
            easyChoice.value = 'easy';
            easyChoice.textContent = 'easy';

            let mediumChoice = document.createElement('option')
            mediumChoice.value = 'medium';
            mediumChoice.textContent = 'medium';

            let hardChoice = document.createElement('option')
            hardChoice.value = 'hard';
            hardChoice.textContent = 'hard';

            //add options to select
            askDifficultySelect.appendChild(easyChoice);
            askDifficultySelect.appendChild(mediumChoice);
            askDifficultySelect.appendChild(hardChoice);



            let startGameButton = document.createElement('button');
            startGameButton.id = "submit-playerNames";
            startGameButton.classList.add("start-game");
            startGameButton.type = "submit";
            startGameButton.for = "getPlayerNamesForm";
            startGameButton.textContent = 'Start Game';
            

            //assemle
            //p1 name
            firstQuestionForPlayerOne.appendChild(askPlayerOneNameLabel);
            firstQuestionForPlayerOne.appendChild(askPlayerOneNameInput);

            //p1 color
            secondQuestionForPlayerOne.appendChild(askPlayerOneColorLabel);
            secondQuestionForPlayerOne.appendChild(askPlayerOneColorInput);

            //add p1 questions to it's container
            playerQuestionsPlayerOne.appendChild(firstQuestionForPlayerOne);
            playerQuestionsPlayerOne.appendChild(secondQuestionForPlayerOne);
            
            
            //Ai difficulty
            difficultyQuestion.appendChild(askDifficultyLabel);
            difficultyQuestion.appendChild(askDifficultySelect);


            //add ai questions to it's contianer
            vsAiQuestions.appendChild(difficultyQuestion);

            //add p1 and ai question's containers to their containers
            vsAiQuestionsGroup.appendChild(playerQuestionsPlayerOne);
            vsAiQuestionsGroup.appendChild(vsAiQuestions);

            //add start game button to playerQuestions group
            vsAiQuestionsGroup.appendChild(startGameButton);

            //add playerQuestions to its container
            vsAiQuestionsFormGroup.appendChild(vsAiQuestionsGroup);

            //add container with form content to form
            vsAiQuestionForm.appendChild(vsAiQuestionsFormGroup);

            vsAiQuestionForm.addEventListener("submit", (event) => {
                event.preventDefault();
                let submitter = event.submitter;
                let handler = submitter.id; 
                if (handler) {
                    //player one's name
                    let playerOneName = vsAiQuestionForm[0].value;
                    
                    //player one's color
                    let playerOneColor = vsAiQuestionForm[1].value;

                    //difficulty setting
                    let difficulty = vsAiQuestionForm[2].value;

                    //close modal 
                    modalElement.classList.add('inactive');
                    overlayElement.classList.add('inactive');

                    //return array of p1 and p2 player props from 
                    //form data
                    //index 0 has p1's data
                    // index 1 is p2's data
                    let vsAiformData = [
                        [
                            playerOneName,
                            playerOneColor
                        ],
                        [
                            difficulty
                            
                        ]
                    ];

                    gameFlowObject.gameStart(vsAiformData,gameMode);
                    
                                
                } else {
                    showAlertMessage("?");
                }
            });

            //add form and related content to modal-body
            console.log(modalElementBody);
            modalElementBody[0].appendChild(vsAiQuestionForm);
        
        
        /**
         * returns the players names as an array
         */

        }

        if(gameMode == 'vsLocal'){
            let modalElement = document.getElementById("modal");
            console.log(modalElement);

            let overlayElement = document.getElementById("overlay");
            console.log(overlayElement);

            let modalElementHeader = document.getElementsByClassName('modal-title')[0];
            console.log(modalElementHeader);
            modalElementHeader.textContent = 'Enter Player Info';

            let modalElementBody = document.getElementsByClassName('modal-body');


              //random name... with constraints 
             
              let vowels = 'aeiou'
              let consonants = 'BCDFGHJKLMNPQRSTVWXYZ'
      
              let randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
              //let randomConsonants = consonants[Math.floor(Math.random() * consonants.length)];
              
              //random hex color thing
              let hexChoices = "0123456789ABCDEF";
      

            //build player names form then add to modal body
            let getPlayerNamesForm = document.createElement('form');
            getPlayerNamesForm.classList.add('getPlayerNamesForm');
            getPlayerNamesForm.name.value = "getPlayerNamesForm";

            let playerNamesFormGroup = document.createElement('div');
            playerNamesFormGroup.id = 'playerNamesFormGroup'; 

            let playerQuestionsGroup = document.createElement('div');
            playerQuestionsGroup.classList.add('playerQuestionsGroup');

            let playerQuestionsPlayerOne = document.createElement('div');
            playerQuestionsPlayerOne.classList.add('playerQuestions');
            playerQuestionsPlayerOne.classList.add('playerOneQuestions')

            let firstQuestionForPlayerOne = document.createElement('div');
            firstQuestionForPlayerOne.classList.add('question');

            let askPlayerOneNameLabel = document.createElement('label');
            askPlayerOneNameLabel.for = "playerOneName";
            askPlayerOneNameLabel.textContent = "Player One's Name";

            let askPlayerOneNameInput = document.createElement('input');
            askPlayerOneNameInput.placeholder = "enter your name";
            askPlayerOneNameInput.name = "playerOneName";
            askPlayerOneNameInput.type = 'text';
            askPlayerOneNameInput.required = 'required';
            askPlayerOneNameInput.value  = `${consonants[Math.floor(Math.random() * consonants.length)]}${randomVowel}${(consonants[Math.floor(Math.random() * consonants.length)]).toLowerCase()}`;


            let secondQuestionForPlayerOne = document.createElement('div');
            secondQuestionForPlayerOne.classList.add('question');

            let askPlayerOneColorLabel = document.createElement('label');
            askPlayerOneColorLabel.for = "playerOneColor";
            askPlayerOneColorLabel.textContent = 'Select your color'

            let askPlayerOneColorInput = document.createElement('input');
            askPlayerOneColorInput.type = 'color';
            askPlayerOneColorInput.value = `#${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}`;
            askPlayerOneColorInput.name = "playerOneColor";
            askPlayerOneColorInput.required = "required";


            let playerQuestionsPlayerTwo = document.createElement('div');
            playerQuestionsPlayerTwo.classList.add('playerQuestions');
            playerQuestionsPlayerTwo.classList.add('playerTwoQuestions')

            let firstQuestionForPlayerTwo = document.createElement('div');
            firstQuestionForPlayerTwo.classList.add('question');

            let askPlayerTwoNameLabel = document.createElement('label');
            askPlayerTwoNameLabel.for = "playerTwoName";
            askPlayerTwoNameLabel.textContent = "Player Two's Name";

            let askPlayerTwoNameInput = document.createElement('input');
            askPlayerTwoNameInput.placeholder = "enter your name";
            askPlayerTwoNameInput.name = "playerTwoName";
            askPlayerTwoNameInput.type = 'text';
            askPlayerTwoNameInput.required = 'required';
            askPlayerTwoNameInput.value = `${consonants[Math.floor(Math.random() * consonants.length)]}${randomVowel}${(consonants[Math.floor(Math.random() * consonants.length)]).toLowerCase()}`;


            let secondQuestionForPlayerTwo = document.createElement('div');
            secondQuestionForPlayerTwo.classList.add('question');

            let askPlayerTwoColorLabel = document.createElement('label');
            askPlayerTwoColorLabel.for = "playerTwoColor";
            askPlayerTwoColorLabel.textContent = 'Select your color'

            let askPlayerTwoColorInput = document.createElement('input');
            askPlayerTwoColorInput.type = 'color';
            askPlayerTwoColorInput.value = `#${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}${hexChoices[Math.floor(Math.random() * hexChoices.length)]}`;
            askPlayerTwoColorInput.name = "playerTwoColor";
            askPlayerTwoColorInput.required = "required";

            let startGameButton = document.createElement('button');
            startGameButton.id = "submit-playerNames";
            startGameButton.classList.add("start-game");
            startGameButton.type = "submit";
            startGameButton.for = "getPlayerNamesForm";
            startGameButton.textContent = 'Start Game';
            

            //assemble.
            //TODO: fix dynamic form creation
            //p1 name
            firstQuestionForPlayerOne.appendChild(askPlayerOneNameLabel);
            firstQuestionForPlayerOne.appendChild(askPlayerOneNameInput);

            //p1 color
            secondQuestionForPlayerOne.appendChild(askPlayerOneColorLabel);
            secondQuestionForPlayerOne.appendChild(askPlayerOneColorInput);

            //add p1 questions to it's container
            playerQuestionsPlayerOne.appendChild(firstQuestionForPlayerOne);
            playerQuestionsPlayerOne.appendChild(secondQuestionForPlayerOne);
            
            //p2 name
            firstQuestionForPlayerTwo.appendChild(askPlayerTwoNameLabel);
            firstQuestionForPlayerTwo.appendChild(askPlayerTwoNameInput);

            //p2 color
            secondQuestionForPlayerTwo.appendChild(askPlayerTwoColorLabel);
            secondQuestionForPlayerTwo.appendChild(askPlayerTwoColorInput);


            //add p2 questions to it's contianer
            playerQuestionsPlayerTwo.appendChild(firstQuestionForPlayerTwo);
            playerQuestionsPlayerTwo.appendChild(secondQuestionForPlayerTwo);

            //add p1 and p2 question's containers to their containers
            playerQuestionsGroup.appendChild(playerQuestionsPlayerOne);
            playerQuestionsGroup.appendChild(playerQuestionsPlayerTwo);

            //add start game button to playerQuestions group
            playerQuestionsGroup.appendChild(startGameButton);

            //add playerQuestions to its container
            playerNamesFormGroup.appendChild(playerQuestionsGroup);

            //add container with form content to form
            getPlayerNamesForm.appendChild(playerNamesFormGroup);

            getPlayerNamesForm.addEventListener("submit", (event) => {
                event.preventDefault();
                let submitter = event.submitter;
                let handler = submitter.id; 
                if (handler) {
                    //player one's name
                    let playerOneName = getPlayerNamesForm[0].value;
                    
                    //player one's color
                    let playerOneColor = getPlayerNamesForm[1].value;

                    //player two's name
                    let playerTwoName = getPlayerNamesForm[2].value;

                    //player two's color
                    let playerTwoColor = getPlayerNamesForm[3].value;

                    //close modal 
                    modalElement.classList.add('inactive');
                    overlayElement.classList.add('inactive');

                    //return array of p1 and p2 player props from 
                    //form data
                    //index 0 has p1's data
                    // index 1 is p2's data
                    let playerData = [
                        [
                            playerOneName,
                            playerOneColor
                        ],
                        [
                            playerTwoName,
                            playerTwoColor
                            
                        ]
                    ];

                    gameFlowObject.gameStart(playerData,gameMode);
                    
                                
                } else {
                    showAlertMessage("?");
                }
            });

            //add form and related content to modal-body
            console.log(modalElementBody);
            modalElementBody[0].appendChild(getPlayerNamesForm);
        
        
        /**
         * returns the players names as an array
         */
        }
    }

    function gameStart(formData,gameMode){
        if(gameMode == 'vsAi'){
            //create player instances
            const player1 = createPlayer(formData[0][0],'X',formData[0][1]);
            const ai = createPlayer('AI','O','#112358'); //set color for ai to random color //need random color helper function (where would it live?)
            const difficulty = formData[1][0];
            console.log(difficulty);

            //
            console.log("player1 name",`${player1.playerName}`);

            /**
             * for now the game starts
             * with p1 getting the first turn
             * 
             * might add feature later that 
             * randomized which player gets
             * the first turn...
             */

            //set player turns
            player1.isPlayerTurn = true;
            //console.log("is it p1's turn?",player1.isPlayerTurn);
            
            ai.isPlayerTurn = false;
            //console.log("is it p2's turn?", player2.isPlayerTurn);
            
            //
            document.body.style.backgroundColor = player1.playerColor;

            //set up the game board
            //pass in the players
            gameBoardObject.setGameBoard(player1,ai,gameMode,difficulty);

        }

        if(gameMode == 'vsLocal'){
            //create player instances
            const player1 = createPlayer(formData[0][0],'X',formData[0][1]);
            const player2 = createPlayer(formData[1][0],'O',formData[1][1]);
                
            //
            console.log("player1 name",`${player1.playerName}`);

            /**
             * for now the game starts
             * with p1 getting the first turn
             * 
             * might add feature later that 
             * randomized which player gets
             * the first turn...
             */

            //set player turns
            player1.isPlayerTurn = true;
            //console.log("is it p1's turn?",player1.isPlayerTurn);
            
            player2.isPlayerTurn = false;
            //console.log("is it p2's turn?", player2.isPlayerTurn);
            
            //
            document.body.style.backgroundColor = player1.playerColor;

            //set up the game board
            //pass in the players
            gameBoardObject.setGameBoard(player1,player2,gameMode);

        }
            /**
             * could and probably should
             * break down game start into
             * multiple methods calls/functions
             * ...
             */
        }

    function setGameRestart(){
         let restart = document.getElementById("resetGameButton")

         restart.addEventListener('click', () => {
             let icon = document.getElementsByClassName('fa fa-refresh');
             console.log(icon);
             icon[0].classList.toggle('fa-spin');
             //clear form data
             let form = document.querySelector('.getPlayerNamesForm');
             location.reload();
         });

    }

        // declare private variables and/or functions

    return {
        // declare public variables and/or functions
        gameStart,
        getPlayerInfo,
        setGameRestart,
        setGameMode,
    }

})();
console.log(gameBoardObject);
//start game by getting data from players
gameFlowObject.setGameMode();