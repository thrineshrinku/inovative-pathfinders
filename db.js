const firebaseConfig = {
  apiKey: "AIzaSyBVlNOEu4F71DzUxHQHmLWaQbbFJZjMIMo",
  authDomain: "innovative-pathfinder-8ed2a.firebaseapp.com",
  projectId: "innovative-pathfinder-8ed2a",
  storageBucket: "innovative-pathfinder-8ed2a.appspot.com",
  messagingSenderId: "321890778159",
  appId: "1:321890778159:web:c5c6f0d4eb813a298c1ada",
};
firebase.initializeApp(firebaseConfig);

// upload data to firestore database

function insert_data() {
  var user_name = document.getElementById("uname").value;
  var idea_title = document.getElementById("title").value;
  var user_idea = document.getElementById("myIdea").value;
  var userEmail = firebase.auth().currentUser.email;
  const db = firebase.firestore();

  if (user_name.trim() == "" || user_name.trim() == null) {
    alert("Username cannot be null");
  } else if (idea_title.trim() == "" || idea_title.trim() == null) {
    alert("Idea title cannot be empty");
  } else if (countWord(user_idea) < 20) {
    alert("Ideas should have minimum 20 words");
  } else {
    db.collection("ideas/")
      .doc()
      .set({
        name: user_name,
        title: idea_title,
        email: userEmail,
        idea: user_idea,
      })
      .then(() => {
        user_name = "";
        idea_title = "";
        user_idea = "";
        alert("Document successfully written!");
      })
      .catch((error) => {
        alert("Error writing document:", error);
      });
  }
}

function countWord(str) {
  return str.trim().split(/\s+/).length;
}
