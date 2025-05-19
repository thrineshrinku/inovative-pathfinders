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
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let user_uid = user.uid;
      db.collection("users")
        .doc(user_uid)
        .collection("slots")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data().email);
            var c_email = doc.data().client_email;
            var c_title = doc.data().client_title;
            var c_desc = doc.data().client_desc;
            addItems(c_email, c_title, c_desc);
            // console.log(c_email, c_title, c_desc);
          });
        });
    }
  });
};

var idea_id = 0;
function addItems(email, title, desc) {
  var con = document.getElementById("container");
  var div = document.getElementById("card");
  var card_body = document.getElementById("card_body");
  var id_num = document.createElement("h6");
  var c_email = document.createElement("a");
  var c_title = document.createElement("h3");
  var c_desc = document.createElement("p");

  id_num.setAttribute("class", "card-header text-center");
  c_title.setAttribute("class", "card-title pt-5");
  c_desc.setAttribute("class", "card-text");

  id_num.innerHTML = "Idea " + ++idea_id;
  c_email.innerHTML = "<strong>Email: </strong>" + email + "<br/>";
  c_title.innerHTML = "<strong>Idea Title: </strong> <span>" + title + "</span>";
  c_desc.innerHTML = "<strong>Description:</strong> <br/>" + desc;

  c_email.href = "mailto:" + email;
  c_desc.style.marginBlockEnd = "50px";

  card_body.appendChild(id_num);
  card_body.appendChild(c_title);
  card_body.appendChild(c_email);
  card_body.appendChild(c_desc);
  div.appendChild(card_body);
  con.appendChild(div);
  // main_body.appendChild(con);
}
