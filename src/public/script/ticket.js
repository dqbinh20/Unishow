const seats = document.querySelectorAll(".seat:not(.booked)");
seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    seat.classList.toggle("selected");
  });
});

const bookButton = document.getElementById("book-button");
bookButton.addEventListener("click", function () {
  var selectedSeat = document.querySelectorAll(".seat.selected");
  if (selectedSeat.length == 0) {
    alert("Please choose one");
  } else {
    selectedSeat.forEach((seat) => {
      console.log(seat.dataset);
    });
  }
});

const progressBar = document.getElementById("progress-bar");
const progressFirst = document.getElementById("progess-first");
const progressSecond = document.getElementById("progess-second");
const progressThird = document.getElementById("progess-third");

btnNext.addEventListener("click", () => {
  // if (currentProgress == 1)
});
