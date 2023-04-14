import APIKey from "/key.js";

const firebaseConfig = {
  apiKey: APIKey,
  authDomain: "test-45ee2.firebaseapp.com",
  databaseURL: "https://test-45ee2-default-rtdb.firebaseio.com",
  projectId: "test-45ee2",
  storageBucket: "test-45ee2.appspot.com",
  messagingSenderId: "928316874575",
  appId: "1:928316874575:web:9509dba75f2b079aa2ef3a",
  measurementId: "G-EHR211SSHP"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = firebase.database();


var btn = document.getElementById('btn');
var count_text = document.getElementById('cnt_txt');

var dict = {};
let place = {};
var loc = "";
var check = false;

var count = localStorage.getItem('count') || 0;
count_text.textContent = count;
$.ajaxSetup({async:false});
let table = document.getElementById("tbl");


const ref = db.ref('/'); // get a reference to the root of the database

      ref.once('value')
        .then((snapshot) => {
          const data = snapshot.val();
          dict = (data);
          var keys = Object.keys(dict);
          place = dict[keys[0]];
          console.log(Object.keys(place).length);
          for (var i = 0; i < Object.keys(place).length; i++) {
            var row = table.insertRow(i+1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = Object.keys(place)[i];
            cell2.innerHTML = Object.values(place)[i];
          }
          
          // console.log(typeof(data));
        })
        .catch((error) => {
          console.error(error);
        });




btn.addEventListener('click', function() {
    count++;
    check = true;
    localStorage.setItem('count', count);
    count_text.textContent = count;

if (check == true) {
  $.get("https://ipinfo.io", function(response) {
      loc = response.city + ", " + response.country;

      const ref = db.ref('/'); // get a reference to the root of the database

      ref.once('value')
        .then((snapshot) => {
          const data = snapshot.val();
          dict = (data);
          var keys = Object.keys(dict);
          place = dict[keys[0]];
        
        place[loc] = (place[loc] || 0) + 1;

        db.ref('location').update(place);
        $("#tbl td").remove();

        for (var i = 0; i < Object.keys(place).length; i++) {
          var row = table.insertRow(i+1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          cell1.innerHTML = Object.keys(place)[i];
          cell2.innerHTML = Object.values(place)[i];
        }
          // console.log(typeof(data));
        })
        .catch((error) => {
          console.error(error);
        });

  }, "jsonp");
}


});


