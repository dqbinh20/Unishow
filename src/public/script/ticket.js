const progressBar = document.getElementById("progress-bar");
const progressFirst = document.getElementById("progess-first");
const progressSecond = document.getElementById("progess-second");
const progressThird = document.getElementById("progess-third");
const contentsProgressFirst = document.getElementById(
  "container-progress-first"
);
const contentsProgressSecond = document.getElementById(
  "container-progress-second"
);
const contentsProgressThird = document.getElementById(
  "container-progress-third"
);

const nextProgressBtn_1 = document.getElementById("btn-next-progress-1");
const nextProgressBtn_2 = document.getElementById("btn-next-progress-2");
const postFormTicketBtn = document.getElementById("post-form-ticket-btn");

document.getElementById("backToProgress1").addEventListener("click", () => {
  displayProgress1();
});
document.getElementById("backToProgress2").addEventListener("click", () => {
  displayProgress2();
});

function displayProgress1() {
  // progress-bar
  progressBar.style.width = "0";
  progressFirst.style.backgroundColor = "#dc3545";
  progressSecond.style.backgroundColor = "#6c757d";
  progressThird.style.backgroundColor = "#6c757d";
  // content
  contentsProgressFirst.style.display = "block";
  contentsProgressSecond.style.display = "none";
  contentsProgressThird.style.display = "none";
}
function displayProgress2() {
  //progress-bar
  progressBar.style.width = "50%";
  progressFirst.style.backgroundColor = "#dc3545";
  progressSecond.style.backgroundColor = "#dc3545";
  progressThird.style.backgroundColor = "#6c757d";

  // content
  contentsProgressFirst.style.display = "none";
  contentsProgressSecond.style.display = "block";
  contentsProgressThird.style.display = "none";
}
function displayProgress3() {
  //progress-bar
  progressBar.style.width = "100%";
  progressFirst.style.backgroundColor = "#dc3545";
  progressSecond.style.backgroundColor = "#dc3545";
  progressThird.style.backgroundColor = "#dc3545";
  // content
  contentsProgressSecond.style.display = "none";
  contentsProgressSecond.style.display = "none";
  contentsProgressThird.style.display = "block";
}

displayProgress1();

// const seats = document.querySelectorAll(".seat:not(.booked)");
// const totalMoney = document.getElementById("total-money");

// const seatVipNameTable = document.getElementById("seat-vip-name-table");
// const numberSeatVipTable = document.getElementById("number-seat-vip-table");

// const seatNormalNameTable = document.getElementById("seat-normal-name-table");
// const numberSeatNormalTable = document.getElementById(
//   "number-seat-normal-table"
// );

// var selectedSeatVip = [];
// var selectedSeatNormal = [];

// seats.forEach((seat) => {
//   seat.addEventListener("click", () => {
//     document.getElementById("seatError").style.display = "none";

//     if (seat.classList.contains("selected")) {
//       seat.classList.remove("selected");

//       if (seat.innerText[0] < "F") {
//         //seat vip
//         selectedSeatVip = selectedSeatVip.filter(function (seatRemove) {
//           return seatRemove != seat.innerText;
//         });
//         seatVipNameTable.innerText = selectedSeatVip.toString();
//         numberSeatVipTable.innerText = selectedSeatVip.length;
//       } else {
//         // seat normal
//         selectedSeatNormal = selectedSeatNormal.filter(function (seatRemove) {
//           return seatRemove != seat.innerText;
//         });
//         seatNormalNameTable.innerText = selectedSeatNormal.toString();
//         numberSeatNormalTable.innerText = selectedSeatNormal.length;
//       }
//     } else {
//       seat.classList.add("selected");

//       if (seat.innerText[0] < "F") {
//         // seat vip
//         selectedSeatVip.push(seat.innerText);
//         seatVipNameTable.innerText = selectedSeatVip.toString();
//         numberSeatVipTable.innerText = selectedSeatVip.length;
//       } else {
//         //seat normal
//         selectedSeatNormal.push(seat.innerText);
//         seatNormalNameTable.innerText = selectedSeatNormal.toString();
//         numberSeatNormalTable.innerText = selectedSeatNormal.length;
//       }
//     }
//     totalMoney.innerText =
//       selectedSeatVip.length * 1.2 + selectedSeatNormal.length;
//   });
// });

nextProgressBtn_1.addEventListener("click", () => {
  // if (selectedSeatVip.length == 0 && selectedSeatNormal.length == 0) {
  //   document.getElementById("seatError").style.display = "block";
  // } else {
  //   displayProgress2();
  // }
  displayProgress2();
});

progress2();
function progress2() {
  var fullNameInput = document.getElementById("fullName");
  var fullNameError = document.getElementById("fullNameError");
  var emailInput = document.getElementById("inputEmail");
  var emailError = document.getElementById("emailError");
  var phoneInput = document.getElementById("phoneNumber");
  var phoneNumberError = document.getElementById("phoneNumberError");

  fullNameInput.addEventListener("click", () => {
    fullNameError.style.display = "none";
  });
  emailInput.addEventListener("click", () => {
    emailError.style.display = "none";
  });
  phoneInput.addEventListener("click", () => {
    phoneNumberError.style.display = "none";
  });

  nextProgressBtn_2.addEventListener("click", () => {
    if (validateForm()) {
      displayProgress3();
    }
  });

  function validateForm() {
    // Kiểm tra tính hợp lệ của các trường input
    if (fullNameInput.value === "") {
      fullNameError.style.display = "block";
      return false;
    }

    if (emailInput.validity.typeMismatch || emailInput.value === "") {
      emailError.style.display = "block";
      return false;
    }

    if (phoneInput.validity.patternMismatch || phoneInput.value === "") {
      phoneNumberError.style.display = "block";
      return false;
    }
    return true;
  }
}

// create form and post to server data book ticket
postFormTicketBtn.addEventListener("click", () => {
  var fullNameInput = document.getElementById("fullName").value;
  var emailInput = document.getElementById("inputEmail").value;
  var phoneInput = document.getElementById("phoneNumber").value;
  // var seatNameInput = [];
  // document.querySelectorAll(".selected").forEach((seat) => {
  //   seatNameInput.push(seat.dataset.seat);
  // });

  var form = document.createElement("form");
  form.method = "POST";
  form.action = "/ticket/book";

  var fullNameField = document.createElement("input");
  fullNameField.type = "hidden";
  fullNameField.name = "name";
  fullNameField.value = fullNameInput;
  form.appendChild(fullNameField);

  var emailField = document.createElement("input");
  emailField.type = "hidden";
  emailField.name = "email";
  emailField.value = emailInput;
  form.appendChild(emailField);

  var phoneField = document.createElement("input");
  phoneField.type = "hidden";
  phoneField.name = "phone";
  phoneField.value = phoneInput;
  form.appendChild(phoneField);

  // var seatNameField = document.createElement("input");
  // seatNameField.type = "hidden";
  // seatNameField.name = "seats";
  // seatNameField.value = seatNameInput;
  // form.appendChild(seatNameField);

  document.body.appendChild(form);
  form.submit();
});

// const bookButton = document.getElementById("book-button");
// bookButton.addEventListener("click", function () {
//   var selectedSeat = document.querySelectorAll(".seat.selected");
//   if (selectedSeat.length == 0) {
//     alert("Please choose one");
//   } else {
//     selectedSeat.forEach((seat) => {
//       console.log(seat.dataset);
//     });
//   }
// });
