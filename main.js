document.addEventListener("DOMContentLoaded", () => {

  const squares = document.querySelectorAll(".grid div");
  const result = document.querySelector("#result");
  const displayCurrentPlayer = document.querySelector("#current-player");
 
  window.onload = function () {

    for (let rivi = 0; rivi < 8; rivi++)
      for (let sarake = 0; sarake < 7; sarake++) {
        var elem = squares[rivi * 7 + sarake];
        elem.style.left = sarake * 60 + 'px';
        elem.style.top = rivi * 60 + 'px';
      }
  };
  let currentPlayer = 1;

  //määritetään kaikki mahdolliset voitot
  const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ];

 var gameOver = false;

  function checkBoard() {
    for (let i = 0; i < winningArrays.length; i++) {
      const square1 = squares[winningArrays[i][0]];
      const square2 = squares[winningArrays[i][1]];
      const square3 = squares[winningArrays[i][2]];
      const square4 = squares[winningArrays[i][3]];

      //tarkistetaan onko  pelaaja yksi saanut neljän suoran
      
      if (square1.classList.contains("player-one") &&
        square2.classList.contains("player-one") &&
        square3.classList.contains("player-one") &&
        square4.classList.contains("player-one")) {
        result.textContent = "Pelaaja 1 voitti!";
        gameOver = true;

      }

      if (square1.classList.contains("player-two") &&
        square2.classList.contains("player-two") &&
        square3.classList.contains("player-two") &&
        square4.classList.contains("player-two")) {
        result.textContent = "Pelaaja 2 voitti!";
        gameOver=true;
      }

    }
  }

  function etsiVapaaRivi(index) {
    const sarake = index % 7;
    var rivi;
    for (rivi = 0; rivi < 6; rivi++) {
      if (squares[rivi * 7 + 7 + sarake].classList.contains("taken") &&
        !squares[rivi * 7 + sarake].classList.contains("taken")) {
        break;
      }
    }

    return rivi;
  }

  for (let i = 0; i < (squares.length - 7); i++) {
    squares[i].onclick = () => {  

      if (gameOver == true) return;

      var vapaaRivi = etsiVapaaRivi(i);
      //tarkistetaan voiko kyseiseen soluun laittaa pelinappulaa
      if (vapaaRivi < 6) {
        var sarake = i % 7;

        var elem = squares[vapaaRivi * 7 + sarake];
        elem.style.position = 'absolute';

        // lasketaan monesko tämä on vasemmalta ja kerrotaan leveydellä
        elem.style.left = (sarake) * 60 + 'px';
        var pos = 0;
        var loppuY = Math.floor((vapaaRivi)) * 60;

        var id = setInterval(frame, 7);
        function frame() {
          console.log(pos + ' ' + loppuY);
          if (pos == loppuY) {
            clearInterval(id);
          } else {
            pos++;
            elem.style.top = pos + 'px';

          }

        }
        
        if (currentPlayer == 1) {
          elem.classList.add("taken");
          elem.classList.add("player-one");
          currentPlayer = 2;
          displayCurrentPlayer.textContent = currentPlayer;
        } else {
          elem.classList.add("taken");
          elem.classList.add("player-two");
          currentPlayer = 1;
          displayCurrentPlayer.textContent = currentPlayer;
        }
      }
      // tarkistetaan onko pelaaja voittanut
      checkBoard();
    }
  }
});