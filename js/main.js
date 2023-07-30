var userArray = [];
var userData = {};
var user = {};
if (localStorage.getItem("USERS") != null) {
  userArray = JSON.parse(localStorage.getItem("USERS"));
  var singIn = document.getElementById("sing-up-page");
}
var path = window.location.pathname;
var page = path.split("/").pop();
if (page == "singup.html") {
  sinUp();
} else if (page == "index.html") {
  login();
} else if (page == "home.html") {
  home();
}
// Path: js\home.js
function home() {
  var userinfo = document.getElementById("content-user");
  var logout = document.getElementById("logOut");
  userinfo.innerHTML = "Welcome " + localStorage.getItem("userName");
  logout.addEventListener("click", function () {
    window.location.href = "index.html";
  });
}
// Path: js\singUp.js
function sinUp() {
  var nameInput = document.getElementById("user-name");
  var emailInput = document.getElementById("user-email");
  var passInput = document.getElementById("user-pass");
  var singUpBtn = document.getElementById("sign-btn");
  var warningM = document.getElementById("warning-message");
  singUpBtn.addEventListener("click", addUser);
  function addUser() {
    userData = {
      name: nameInput.value,
      email: emailInput.value,
      pass: passInput.value,
    };
    if (validData() == true) {
      userArray.push(userData);
      localStorage.setItem("USERS", JSON.stringify(userArray));
      warningM.classList.replace("d-none", "d-block");
      warningM.style.color = "pink";
      warningM.innerHTML = "success";
      clearInput();
    } else {
      warningM.classList.replace("d-none", "d-block");
      warningM.innerHTML = validData();
    }
  }
  function searchUser(user) {
    for (var i = 0; i < userArray.length; i++) {
      if (user == userArray[i].email) {
        return true;
      }
    }
  }
  function validData() {
    if (userData.name == "" || userData.email == "" || userData.pass == "") {
      return "All inputs is required";
    }
    if (searchUser(userData.name)) {
      return "email already exists";
    }
    return true;
  }

  function clearInput() {
    nameInput.value = "";
    emailInput.value = "";
    passInput.value = "";
  }
}
// Path: js\login.js
function login() {
  var nameInputLogin = document.getElementById("user-name-login");
  var passInputLogin = document.getElementById("user-pass-login");
  var loginBtn = document.getElementById("login-btn");
  var warningM = document.getElementById("warning-message");
  var flag = false;
  loginBtn.addEventListener("click", getUser);
  function getUser() {
    user = {
      name: nameInputLogin.value,
      pass: passInputLogin.value,
    };
    for (var i = 0; i < userArray.length; i++) {
      if (user.name == userArray[i].email && user.pass == userArray[i].pass) {
        localStorage.setItem("userName", user.name);
        window.location.href = "home.html";
        flag = true;
      }
    }
    if (!flag) {
      warningM.innerHTML = "incorrect name or password";
      warningM.classList.replace("d-none", "d-block");
    }
  }
}
