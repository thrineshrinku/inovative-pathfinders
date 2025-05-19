const firebaseConfig = {
  apiKey: "AIzaSyBVlNOEu4F71DzUxHQHmLWaQbbFJZjMIMo",
  authDomain: "innovative-pathfinder-8ed2a.firebaseapp.com",
  projectId: "innovative-pathfinder-8ed2a",
  storageBucket: "innovative-pathfinder-8ed2a.appspot.com",
  messagingSenderId: "321890778159",
  appId: "1:321890778159:web:c5c6f0d4eb813a298c1ada",
};
firebase.initializeApp(firebaseConfig);

// firebase conceptualist login
function c_login() {
  const conc_email = document.getElementById("conc-login-email").value;
  const conc_pass = document.getElementById("conc-login-pass").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(conc_email, conc_pass)
    .then((userCredential) => {
      // Signed in
      window.location.href = "conceptualist.html";
    })
    .catch((error) => {
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

// firebase investor login

function i_login() {
  const i_email = document.getElementById("inv-login-email").value;
  const i_pass = document.getElementById("inv-login-pass").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(i_email, i_pass)
    .then(() => {
      // Signed in
      window.location.href = "investor.html";
    })
    .catch((error) => {
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

// firebase investor signup

function inv_signup() {
  var cmp_name = document.getElementById("cmp-name").value;
  var i_email = document.getElementById("inv-email-sp").value;
  var i_pass = document.getElementById("inv-pass-sp").value;
  var i_cnfpass = document.getElementById("inv-cnfpass-sp").value;

  if (cmp_name.trim() == null || cmp_name.trim() == "") {
    alert("Please enter company name!!");
  } else if (i_pass != i_cnfpass) {
    alert("Password and Confirm passsword doesn't match");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(i_email, i_cnfpass)
      .then(function (userCredential) {
        // Signed in
        var user_id = userCredential.user.uid;
        saveInv(cmp_name, i_email, user_id);
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }
}

function con_signup() {
  var first_name = document.getElementById("con-sp-fname").value;
  var last_name = document.getElementById("con-sp-lname").value;
  var con_email = document.getElementById("con-sp-email").value;
  var con_phn = document.getElementById("con-sp-ph").value;
  var con_pass = document.getElementById("con-sp-pass").value;
  var con_cnfpass = document.getElementById("con-sp-cnfpass").value;
  var form = document.getElementById("con_form");

  if (first_name.trim() == null || first_name.trim() == "") {
    alert("Please enter First name!!");
  } else if (last_name.trim() == null || last_name.trim() == "") {
    alert("Please enter last name!!");
  } else if (con_phn.trim() == null || con_phn.trim() == "") {
    alert("Please enter valid phone number!");
  } else if (isNaN(con_phn)) {
    alert("Please enter valid phone number!");
  } else if (con_pass.trim() != con_cnfpass.trim()) {
    alert("Password and Confirm passsword doesn't match");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(con_email, con_cnfpass)
      .then(function (userCredential) {
        // Signed in
        var user_id = userCredential.user.uid;
        saveCon(first_name, last_name, con_email, con_phn, user_id);
        // first_name = "";
        // last_name = "";
        // con_email = "";
        // con_phn = "";
        // con_pass = "";
        // con_cnfpass = "";
        form.reset();
        // console.log("Registered Successfully  ");
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
      alert("Logged out successfully");
    })
    .catch((error) => {
      // An error happened.
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

function saveCon(first_name, last_name, con_email, con_phn, user_id) {
  const db = firebase.firestore();
  db.collection("users")
    .doc(user_id)
    .set({
      fName: first_name,
      lName: last_name,
      conEmail: con_email,
      conPhn: con_phn,
    })
    .then(() => {
      alert("Document successfully written!");
    })
    .catch((error) => {
      alert("Error writing document: ", error.message);
    });
}
function saveInv(cmp_name, i_email, user_id) {
  alert(cmp_name + i_email + user_id);
  const db = firebase.firestore();
  db.collection("users")
    .doc(user_id)
    .set({
      userID: user_id,
      cName: cmp_name,
      iEmail: i_email,
    })
    .then(() => {
      alert("Document successfully written!");
    })
    .catch((error) => {
      alert("Error writing document: ", error.message);
    });
}
