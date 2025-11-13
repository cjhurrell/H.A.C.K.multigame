let turn = "X"; // Start with player1

function checkWinner() {
  const cells = document.querySelectorAll(".cell");
  const winningCombinations = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal \
    [2, 4, 6]  // Diagonal / 
  ];

  cells.forEach((cell, index) => {
  if (winningCombinations.some(combination => combination.every(i => cells[i].textContent === cell.textContent && cell.textContent !== ""))) {
      alert(`Player ${cell.textContent} wins!`);
      resetGame();
    };
  });

  if ([...cells].every(cell => cell.textContent !== "")) {
    alert("It's a draw!");
    resetGame();
  };
};

function resetGame() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.textContent = ""; // Clear the cell
  });
}

function computerMove() {
  const cells = document.querySelectorAll(".cell");
  let emptyCells = Array.from(cells).filter(cell => cell.textContent === "");
  
  if (emptyCells.length === 0) return; // No empty cells left

  // Check if computer can win in the next move
  for (let combination of [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal \
    [2, 4, 6]  // Diagonal /
  ]) {
    const cellsContent = combination.map(i => cells[i].textContent);
    if (cellsContent.filter(c => c === "O").length === 2 && cellsContent.includes("")) {
      const emptyIndex = combination[cellsContent.indexOf("")];
      cells[emptyIndex].textContent = "O"; // Computer's symbol
      turn = "X"; // Switch back to player1
      checkWinner();
      return;
    }
  }

  // Check if player can win in the next move and block them
  for (let combination of [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal \
    [2, 4, 6]  // Diagonal /
  ]) {
    const cellsContent = combination.map(i => cells[i].textContent);
    if (cellsContent.filter(c => c === "X").length === 2 && cellsContent.includes("")) {
      const emptyIndex = combination[cellsContent.indexOf("")];
      cells[emptyIndex].textContent = "O"; // Block player's move
      turn = "X"; // Switch back to player1
      checkWinner();
      return;
    }
  }

  if ([4] && cells[4].textContent === "")
  {cells[4].textContent = "O"; // Center is a strategic move
    turn = "X"; // Switch back to player1
    checkWinner();
    return;
  }

  if ([0] && cells[0].textContent === "")
  {cells[0].textContent = "O"; 
    turn = "X"; // Switch back to player1
    checkWinner();
    return;
  }

  if ([2] && cells[2].textContent === "")
  {cells[2].textContent = "O"; 
    turn = "X"; // Switch back to player1
    checkWinner();
    return;
  }

  if ([6] && cells[6].textContent === "")
  {cells[6].textContent = "O"; 
    turn = "X"; // Switch back to player1
    checkWinner();
    return;
  }

  if ([8] && cells[8].textContent === "")
  {cells[8].textContent = "O"; 
    turn = "X"; // Switch back to player1
    checkWinner();
    return;
  }

  // If no immediate win or block, make a random move

  // Randomly select an empty cell
  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = "O"; // Computer's symbol


  turn = "X"; // Switch back to player1
  checkWinner();
}

function select(cell) {
  if (cell.textContent !== "") return;// Cell already taken

  //if (turn === "X")cell.textContent = "X"; // Player 1's symbol
  
  
cell.textContent = turn; // Player 2's symbol


  //cell.textContent = turn; // Set the cell to the current player's symbol
  turn = turn === "X" ? "O" : "X"; // Switch turns

 const gameMode = document.getElementById("Game-mode").value;
if (gameMode === "PVC" && turn === "O") 
  setTimeout(() =>{computerMove();}, 500)
   // Delay for computer's move
  
 



  checkWinner();

}


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".cell").forEach(div => {
        div.addEventListener("click", () => {
            if (div.textContent === "") {
                select(div);
            }
        });
    });
})

