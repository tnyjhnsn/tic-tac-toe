$(document).ready(function() {
	TicTacToe();
});

function TicTacToe() {

    var board;

    var Player = function() {
        this.symbol = "";
    }

    var compPlayer = new Player();
    var humanPlayer = new Player();

    var Board = function() {
        this.cells = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        this.status = "playing";
    }

    $("#play-x").on("click", function() {
        clearBoard();
        humanPlayer.symbol = "X";
        compPlayer.symbol = "O";
        playGame();
    })

    $("#play-o").on("click", function() {
        clearBoard();
        humanPlayer.symbol = "O";
        compPlayer.symbol = "X";
        var random = Math.floor(Math.random() * 9);
        board.cells[random] = compPlayer;
        $("div[ttt-index='" + random + "']").find(".play").text(compPlayer.symbol);
        playGame();
    })

    function clearBoard() {
        board = new Board();
        $("#ttt-board").find(".play").text("");
    }

     function playGame() {
        $("#ttt-end-game").html("&nbsp;");
        $(".intro").hide("slow");
        $(".ttt-cell").on("click", function() {
            var moveTo = $(this).attr("ttt-index");
            if (board.cells[moveTo] !== 0) {
                return;
            }
            $(this).find(".play").text(humanPlayer.symbol);
            board.cells[moveTo] = humanPlayer;
            moveTo = nextMove();
            if (board.cells[moveTo] == 0) {
                board.cells[moveTo] = compPlayer;
                $("div[ttt-index='" + moveTo + "']").find(".play").text(compPlayer.symbol);     
            }
            if (isWin(board.cells, compPlayer)) {
                board.status = "Hooray! I win";
            } else if (isWin(board.cells, humanPlayer)) {
                board.status = "How did that happen!?";
            } else if (isDraw(board.cells)) {
                board.status = "It's a draw";
            }
            if (board.status !== "playing") {
                endGame();
            }
        })
    }

    function nextMove() {
        var moveVal = -100;
        var moveTo = 0;
        for (var i = 0; i < board.cells.length; i++) {
            var newCells = getNewCells(i, board.cells, compPlayer);
            if (newCells) {
                var minimax = getMiniMax(newCells, humanPlayer);
                if (minimax > moveVal) {
                    moveVal = minimax;
                    moveTo = i;
                }
            }
        }
       return moveTo;
    };

    function getNewCells(index, cells, player) {
        var newCells = cells.slice(0);
        if (newCells[index] == 0) {
            newCells[index] = player;
            return newCells;
        } else {
            return null;
        }
    };

    function getMiniMax(cells, player) {
        if (isWin(cells, compPlayer)) {
            return 1;
        } else if (isWin(cells, humanPlayer)) {
            return -1;
        } else if (isDraw(cells)) {
            return 0;
        } else {
            var moveVal;
            var newCells;
            if (player === humanPlayer) {
                moveVal = 100;
                for (var i = 0; i < cells.length; i++) {
                    newCells = getNewCells(i, cells, humanPlayer);
                    if (newCells) {
                        var minimax = getMiniMax(newCells, compPlayer);
                        if (minimax < moveVal) {
                            moveVal = minimax;
                        }
                    }
                }
            }
            if (player === compPlayer) {
               moveVal = -100;
               for (var i = 0; i < cells.length; i++) {
                    newCells = getNewCells(i, cells, compPlayer);
                    if (newCells) {
                        var minimax = getMiniMax(newCells, humanPlayer);
                        if (minimax > moveVal) {
                            moveVal = minimax;
                        }
                    }
                }
            }
            return moveVal;
        }
    };

    function isWin(cells, player) {
        if (
            (cells[0] == player && cells[1] == player && cells[2] == player) ||
            (cells[3] == player && cells[4] == player && cells[5] == player) ||
            (cells[6] == player && cells[7] == player && cells[8] == player) ||
            (cells[0] == player && cells[3] == player && cells[6] == player) ||
            (cells[1] == player && cells[4] == player && cells[7] == player) ||
            (cells[2] == player && cells[5] == player && cells[8] == player) ||
            (cells[0] == player && cells[4] == player && cells[8] == player) ||
            (cells[2] == player && cells[4] == player && cells[6] == player)
            ) {
            return true;
        } else {
            return false;
        }
    };
	
    function isDraw(cells) {
        return !cells.includes(0);
    };

    function endGame() {
        $("#ttt-end-game").text(board.status);
        $(".ttt-cell").off("click");
        $(".intro").show("slow");
    }

}

