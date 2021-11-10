

const firebaseConfig = {
      apiKey: "AIzaSyCn1MWM6qlds2I32m6hSAB9gFF_qgqofig",
      authDomain: "kwitter-24636.firebaseapp.com",
      databaseURL: "https://kwitter-24636-default-rtdb.firebaseio.com",
      projectId: "kwitter-24636",
      storageBucket: "kwitter-24636.appspot.com",
      messagingSenderId: "387573039829",
      appId: "1:387573039829:web:9f31c1de409a998dec585c"
    };
    

   firebase.initializeApp(firebaseConfig);

    user_name= localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML="welcome " + user_name;
    function addRoom()
    {
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose:"addingroomname",

      });

      localStorage.setItem("room_name" , room_name);
      window.location = "kwitter_page.html";
    }
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+"onclick='redirectToRoomName(this.id)' >#"+Room_names + "</div></hr>";
      document.getElementById("output").innerHTML += row;
      });});}
getData();
function redirectToRoomName(name)
{
console.log(name);
localStorage.setItem("room_name", name);
window.location = "kwitter_page.html";
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
