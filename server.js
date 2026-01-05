// Load the express framework and Node.js built-in file system (fs) helper
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an instance of express
const app = express();
const PORT = 5000;

// Define the path to your JSON data file
const mainPage = path.join(__dirname, 'mainPage.json');
//games
const angryBirdsSpace = path.join(__dirname, 'apps/angryBirdsSpace.json');
const cutTheRope = path.join(__dirname, 'apps/cutTheRope.json');
const angryBirdsStarWars = path.join(__dirname, 'apps/angryBirdsStarWars.json');
const fruiteNinja = path.join(__dirname, 'apps/fruiteNinja.json');
const templeRunOz = path.join(__dirname, 'apps/templeRunOz.json');

let pathes = [
  mainPage
  angryBirdsSpace,
  cutTheRope,
  angryBirdsStarWars,
  fruiteNinja,
  templeRunOz
]

for(let i = 0; i<pathes.lenght; i++){
    // Define a route to serve the JSON data
    app.get('/api/'+pathes[i], (req, res) => {
      fs.readFile(pathes[i], 'utf8', (err, data) => {
        if (err) {console.error(err); return res.status(500).send('Error reading data file');}
        // Send the parsed JSON data as a response
        res.json(JSON.parse(data).users);
      });
    });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/users`);
});
