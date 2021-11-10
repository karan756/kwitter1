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
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-danger' id=" + firebase_message_id + "value=" + like + "onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like= " + like + "</span></button><hr>";

                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML = row;
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      console.log("cliked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });

      function send() {
            msg = document.getElementById("msg").value;
            firebase.database().ref(room_name).push({
                  name: user_name,
                  message: msg,
                  like: 0
            });
            document.getElementById("msg").value = "";
      }

      function logout()
       {
            localStorage.removeItem("user_name");
            localStorage.removeItem("room_name");
            window.location.replace("index.html");
      }
}