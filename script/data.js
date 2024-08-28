const fs = require('fs').promises;
const path = require('path');

async function fetchData() {
    try {
        const jsonFilePath = path.join(__dirname, '../json/groups.json');
        const data = await fs.readFile(jsonFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error("Error in data.js: " + error.message);
    }
}

module.exports = { fetchData };