const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/WSRMasterServer/mainPage.json', (req, res) => {
    const filePath = path.join(__dirname, 'mainPage.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: "MainPage not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.get('/WSRMasterServer/apps/:appName.json', (req, res) => {
    const appName = req.params.appName;
    const filePath = path.join(__dirname, 'apps', `${appName}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: "App not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
