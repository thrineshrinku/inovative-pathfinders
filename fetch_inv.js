const firebaseConfig = {
  apiKey: "AIzaSyBVlNOEu4F71DzUxHQHmLWaQbbFJZjMIMo",
  authDomain: "innovative-pathfinder-8ed2a.firebaseapp.com",
  projectId: "innovative-pathfinder-8ed2a",
  storageBucket: "innovative-pathfinder-8ed2a.appspot.com",
  messagingSenderId: "321890778159",
  appId: "1:321890778159:web:c5c6f0d4eb813a298c1ada",
};
firebase.initializeApp(firebaseConfig);

// fetch data from firestore database
const db = firebase.firestore();

window.onload = function () {
  db.collection("ideas")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().title);
        var email = doc.data().email;
        var title = doc.data().title;
        var desc = doc.data().idea;
        addItems(email, title, desc);
      });
    });
};

var idea_id = 0;
var dataArray = [];
function addItems(email, ideaTitle, ideaDesc) {
  var con = document.getElementById("container");
  var div = document.getElementById("card");
  var card_body = document.getElementById("card_body");

  var id_num = document.createElement("h5");
  var idea_title = document.createElement("h4");
  var idea_desc = document.createElement("p");

  dataArray.push([email, ideaTitle, ideaDesc]);

  id_num.innerHTML = "Idea " + ++idea_id;
  idea_title.innerHTML = "<strong>Title: </strong>" + ideaTitle;
  idea_desc.innerHTML = "<strong>Description: </strong>" + ideaDesc;

  id_num.setAttribute("class", "card-header text-center");
  idea_title.setAttribute("class", "card-title pt-5");
  idea_desc.setAttribute("class", "card-text");
  var book_btn = document.createElement("div");
  book_btn.innerHTML =
    '<button type="button" class="btn btn-primary" onclick="saveData(' +
    idea_id +
    ')">Book Btn</button>';
  book_btn.style.marginBlockEnd = "50px";

  card_body.appendChild(id_num);
  card_body.appendChild(idea_title);
  card_body.appendChild(idea_desc);
  card_body.appendChild(book_btn);
  div.appendChild(card_body);
  con.appendChild(div);
}

function loadPage(page) {
  let xhttp;
  var div = document.getElementById("container");

  if (page) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          div.innerHTML = this.responseText;
        }
      }
    };
    xhttp.open("GET", page, true);
    xhttp.send();
    return;
  }
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.href = "login.html";
      alert("Logged out successfully");
    })
    .catch((error) => {
      // An error happened.
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

function saveData(id) {
  --id;

  let a_email = dataArray[id][0];
  let a_title = dataArray[id][1];
  let a_desc = dataArray[id][2];

  // array to string
  var email = a_email.toString();
  var title = a_title.toString();
  var desc = a_desc.toString();

  // Add a new document in collection "users"
  let user_uid = firebase.auth().currentUser.uid;
  db.collection("users")
    .doc(user_uid)
    .collection("slots")
    .doc()
    .set({
      client_email: email,
      client_title: title,
      client_desc: desc,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error.message);
    });
}
