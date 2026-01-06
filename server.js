
const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = 5000;


const mainPage = path.join(__dirname, 'mainPage.json');

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

        res.json(JSON.parse(data).users);
      });
    });
}


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:https://reworkw8.github.io/WSRMasterServer/${PORT}`);
  console.log(`API endpoint: https://reworkw8.github.io/WSRMasterServer/:${PORT}/api/users`);
});
