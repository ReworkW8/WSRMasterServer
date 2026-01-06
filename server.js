const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS so your Windows 8.1 app can access the API without security blocks
app.use(cors());

/**
 * Route 1: Serve the Main Page data
 * Access via: http://localhost:5000/WSRMasterServer/mainPage.json
 */
app.get('/WSRMasterServer/mainPage.json', (req, res) => {
    const filePath = path.join(__dirname, 'mainPage.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error loading mainPage.json:", err);
            return res.status(404).json({ error: "MainPage not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

/**
 * Route 2: Dynamic App Route
 * This replaces the manual list (angryBirds, etc.) from your second script.
 * Any JSON file placed in the /apps/ folder will be automatically available.
 * Access via: http://localhost:5000/WSRMasterServer/apps/appName.json
 */
app.get('/WSRMasterServer/apps/:appName.json', (req, res) => {
    const appName = req.params.appName;
    const filePath = path.join(__dirname, 'apps', `${appName}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`App file not found: ${appName}.json`);
            return res.status(404).json({ error: "App not found" });
        }
        
        try {
            // Validate if the file is a proper JSON
            const jsonData = JSON.parse(data);
            res.setHeader('Content-Type', 'application/json');
            res.json(jsonData);
        } catch (parseErr) {
            console.error("JSON Parse Error:", parseErr);
            res.status(500).json({ error: "Internal server error: Invalid JSON format" });
        }
    });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`WSR Master Server is running on port ${PORT}`);
    console.log(`Main Directory: http://localhost:${PORT}/WSRMasterServer/mainPage.json`);
    console.log(`App Directory:  http://localhost:${PORT}/WSRMasterServer/apps/[filename].json`);
    console.log(`====================================================`);
});
