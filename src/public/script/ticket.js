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

// next to process
const nextProgressBtn_1 = document.getElementById("btn-next-progress-1");
const nextProgressBtn_2 = document.getElementById("btn-next-progress-2");
const postFormTicketBtn = document.getElementById("post-form-ticket-btn");

// back to process
document.getElementById("backToProgress1").addEventListener("click", () => {
  displayProgress1();
});
document.getElementById("backToProgress2").addEventListener("click", () => {
  displayProgress2();
});

// function display process
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
  contentsProgressFirst.style.display = "none";
  contentsProgressSecond.style.display = "none";
  contentsProgressThird.style.display = "block";

  let seatSpecial = document.querySelectorAll(".selected.special");
  let seatVip = document.querySelectorAll(".selected.vip");
  let seatNormal = document.querySelectorAll(".selected.normal");
  let specialLenght = seatSpecial.length;
  let vipLength = seatVip.length;
  let normalLength = seatNormal.length;

  if (specialLenght > 0) {
    let tdName = document.getElementById("special-name-table");
    tdName.innerHTML = "";
    seatSpecial.forEach((seat) => {
      tdName.innerHTML += seat.dataset.seat + " ";
    });
    let tdLength = document.getElementById("special-length-table");
    tdLength.innerText = specialLenght;
    document.getElementById("special-row-table").style.display = "table-row";
  } else {
    document.getElementById("special-row-table").style.display = "none";
  }

  if (vipLength > 0) {
    let tdName = document.getElementById("vip-name-table");
    tdName.innerHTML = "";
    seatVip.forEach((seat) => {
      tdName.innerHTML += seat.dataset.seat + " ";
    });
    let tdLength = document.getElementById("vip-length-table");
    tdLength.innerText = vipLength;
    document.getElementById("vip-row-table").style.display = "table-row";
  } else {
    document.getElementById("vip-row-table").style.display = "none";
  }

  if (normalLength > 0) {
    let tdName = document.getElementById("normal-name-table");
    tdName.innerHTML = "";
    seatNormal.forEach((seat) => {
      tdName.innerHTML += seat.dataset.seat + " ";
    });
    let tdLength = document.getElementById("normal-length-table");
    tdLength.innerText = normalLength;
    document.getElementById("normal-row-table").style.display = "table-row";
  } else {
    document.getElementById("normal-row-table").style.display = "none";
  }

  var totalPrice =
    1000 * (specialLenght * 159 + vipLength * 119 + normalLength * 59);
  var formattedTotalPrice = totalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const totalPriceTable = document.getElementById("total-price-table");
  totalPriceTable.innerText = formattedTotalPrice;
}

const seats = document.querySelectorAll(".seat:not(.booked)");

seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    document.getElementById("seatError").style.display = "none";

    if (seat.classList.contains("selected")) {
      seat.classList.remove("selected");
    } else {
      seat.classList.add("selected");
    }
  });
});

nextProgressBtn_1.addEventListener("click", () => {
  if (document.querySelectorAll(".seat.selected").length === 0) {
    document.getElementById("seatError").style.display = "block";
  } else {
    displayProgress2();
  }
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
  var donateInput = document.getElementById("donate-input").value;
  var seatNameInput = [];
  document.querySelectorAll(".selected").forEach((seat) => {
    seatNameInput.push(seat.dataset.seat);
  });

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

  var donateField = document.createElement("input");
  donateField.type = "hidden";
  donateField.name = "donate";
  donateField.value = donateInput;
  form.appendChild(donateField);

  var seatNameField = document.createElement("input");
  seatNameField.type = "hidden";
  seatNameField.name = "seats";
  seatNameField.value = seatNameInput;
  form.appendChild(seatNameField);

  document.body.appendChild(form);
  form.submit();
});
