const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');


/* removed for security reasons */
const file = "secret";
const site = "secret";



const app = express();
const port = 8080;
app.use(cors());

var serviceAccount = require(file);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: site
});

const db = admin.database();

app.use(bodyParser.json());

let place = {};


app.get('/api/data', async (req, res) => {
  try {
    // Retrieve data from Firebase
    const snapshot = await db.ref('/').once('value');
    const data = snapshot.val();
    const place = data['location'];
    
    // Send data to client
    res.send(place);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/manipulated_data', async(req, res) => {
  try {
    // const data = req.body.loc;
    // console.log(data);
    
    const loc = req.body;
    // place[loc] = (place[loc] || 0) + 1;
    // console.log(loc);
    db.ref('location').update(loc);
    const snapshot = await db.ref('/').once('value');
    const data = snapshot.val();
    res.send(data['location'])
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


