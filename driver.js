
var btn = document.getElementById('btn');
var count_text = document.getElementById('cnt_txt');

var dict = {};
let place = {};
var checl = {};
var loc = "";
var check = false;

var count = localStorage.getItem('count') || 0;
count_text.textContent = count;
$.ajaxSetup({async:false});
let table = document.getElementById("tbl");

fetch('https://servercounter.jayraval20.repl.co/api/data')
  .then(response => response.json())
  .then(data => {
    place = (data);

          for (var i = 0; i < Object.keys(place).length; i++) {
            var row = table.insertRow(i+1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = Object.keys(place)[i];
            cell2.innerHTML = Object.values(place)[i];
          }
    console.log(data);
    checl = place;
  })
  .catch(error => {
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
      console.log(loc)

      fetch('https://servercounter.jayraval20.repl.co/api/data')
        .then(response => response.json())
        .then(data => {
          place = (data);
            place[loc] = (place[loc] || 0) + 1;

          fetch('https://servercounter.jayraval20.repl.co/api/manipulated_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(place)
        })
          .then(response => response.json())
          .then(data => {
            // handle response from server
            
            console.log(data)

            $("#tbl td").remove();

            for (var i = 0; i < Object.keys(place).length; i++) {
              var row = table.insertRow(i+1);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              cell1.innerHTML = Object.keys(place)[i];
              cell2.innerHTML = Object.values(place)[i];
            }
            
          })
          .catch(error => {
            console.error(error);
          });

         
        })
        .catch(error => {
          console.error(error);
        });

  }, "jsonp");
}


});


