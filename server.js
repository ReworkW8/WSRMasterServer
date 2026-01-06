const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan'); 

const app = express();
const PORT = process.env.PORT || 5000; 


app.use(morgan('dev'));
app.use(express.json());


const APP_REPOSITORY = {
    "main": "mainPage.json",
    "angry-birds-space": "apps/angryBirdsSpace.json",
    "cut-the-rope": "apps/cutTheRope.json",
    "angry-birds-star-wars": "apps/angryBirdsStarWars.json",
    "fruit-ninja": "apps/fruiteNinja.json",
    "temple-run-oz": "apps/templeRunOz.json"
};

/**
 

 */
app.get('/api/v1/:appId', (req, res) => {
    const appId = req.params.appId;
    const fileName = APP_REPOSITORY[appId];

    if (!fileName) {
        return res.status(404).json({
            status: "error",
            message: `Resource '${appId}' not found on Master Server`
        });
    }

    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`[SERVER ERROR] Reading ${filePath}:`, err);
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }

        try {
            const jsonData = JSON.parse(data);

            res.json({
                status: "success",
                timestamp: new Date().toISOString(),
                data: jsonData.users || jsonData
            });
        } catch (parseErr) {
            res.status(500).json({ status: "error", message: "Corrupted JSON file" });
        }
    });
});


app.get('/status', (req, res) => {
    res.json({ status: "online", uptime: process.uptime() });
});


app.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(`Rework MasterServer ${PORT}`);
    console.log(`Endpoint: https://reworkw8.github.io/WSRMasterServer/${PORT}/api/v1/`);
    console.log(`Loaded Apps: ${Object.keys(APP_REPOSITORY).join(', ')}`);
    console.log(`==========================================`);
});
