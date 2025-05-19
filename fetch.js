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
        console.log(doc.id, " => ", doc.data().title);
        var title = doc.data().title;
        var desc = doc.data().idea;
        addItems(title, desc);
      });
    });
};

var idea_id = 0;
function addItems(ideaTitle, ideaDesc) {
  var main_body = document.getElementById("main");
  var con = document.getElementById("container");
  var div = document.getElementById("card");
  var card_body = document.getElementById("card_body");

  // var new_div = document.createElement("div");
  var id_num = document.createElement("h5");
  var idea_title = document.createElement("h4");
  var idea_desc = document.createElement("p");

  id_num.innerHTML = "Idea " + ++idea_id;
  idea_title.innerHTML = ideaTitle;
  idea_desc.innerHTML = ideaDesc;

  id_num.setAttribute("class", "card-header text-center");
  idea_title.setAttribute("class", "card-title pt-5");
  idea_desc.setAttribute("class", "card-text");
  // new_div.setAttribute("class", "container");

  card_body.appendChild(id_num);
  card_body.appendChild(idea_title);
  card_body.appendChild(idea_desc);
  div.appendChild(card_body);
  con.appendChild(div);
  main_body.appendChild(con);
}
