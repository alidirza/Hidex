const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const fs = require('fs');
const uuid = require('uuid');

const app = express();
port = 3000;

app.use(bodyParser.json());

const imageLinks = {};

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let server;
console.log(`Port is ${port}`);
console.log(`Please enter "start", "change port", or "stop".`);
rl.setPrompt('Command > ');
rl.prompt();

rl.on('line', (input) => {
    const command = input.trim().toLowerCase();

    switch (command) {
        case 'start':
            startServer();
            break;
        case 'change port':
            changePort();
            break;
        case 'stop':
            stopServer();
            break;
        default:
            console.log('Invalid command. Please enter "start", "change port", or "stop".');
    }

    rl.prompt();
});

function startServer() {
    if (server) {
        console.log('Server is already running.');
        return;
    }

    server = app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}

function changePort() {
    rl.question('Enter new port number: ', (newPort) => {
        if (server) {
            server.close(() => {
                port = parseInt(newPort);
                server = app.listen(port, () => {
                    console.log(`Server now listening at http://localhost:${port}`);
                    rl.prompt();
                });
            });
        } else {
            port = parseInt(newPort);
            console.log(`Port changed to ${port}`);
            rl.prompt();
        }
    });
}

function stopServer() {
    if (server) {
        server.close(() => {
            console.log('Server stopped.');
            server = undefined;
            rl.prompt();
        });
    } else {
        console.log('Server is not running.');
    }
}


app.post('/encode', async (req, res) => {
    const { firstImageUrl, secondImageUrl, encryptionKey } = req.body;

    try {
        const pngData1 = await fetchDataFromUrl(firstImageUrl);
        const pngData2 = await fetchDataFromUrl(secondImageUrl);

        const combinedData = Buffer.concat([pngData1, Buffer.from(encryptionKey, 'utf-8'), pngData2]);

        const imageId = uuid.v4();
        imageLinks[imageId] = combinedData;

        const imageUrl = `${req.protocol}://${req.get('host')}/images/${imageId}`;
        writeImageLinkToFile(imageId, imageUrl);
        console.log(`Encoding: ${firstImageUrl} and ${secondImageUrl} with key: ${encryptionKey}`);
        console.log(`Result: ${imageUrl} with key: ${encryptionKey}`);

        res.json({ imageUrl });
    } catch (err) {
        console.error("Error encoding images:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/decode', async (req, res) => {
    const { combinedImageUrl, encryptionKey } = req.body;

    try {
        const imageId = combinedImageUrl.split('/').pop();
        const combinedData = imageLinks[imageId];

        if (!combinedData) {
            return res.status(404).send("Image not found");
        }

        const separatorIndex = combinedData.indexOf(Buffer.from(encryptionKey, 'utf-8'));

        if (separatorIndex !== -1) {
            const decodedData = combinedData.slice(separatorIndex + encryptionKey.length);

            const imageId = uuid.v4();
            imageLinks[imageId] = decodedData;

            const imageUrl = `${req.protocol}://${req.get('host')}/images/${imageId}`;
            writeImageLinkToFile(imageId, imageUrl);
            console.log(`Decoding: ${combinedImageUrl} with key: ${encryptionKey}`);
            console.log(`Result: ${imageUrl}`);

            res.json({ imageUrl });
        } else {
            res.status(400).send("Encryption key not found in combined image.");
            console.log(`Encryption key not found in combined image.`);
        }
    } catch (err) {
        console.error("Error decoding image:", err);
        res.status(500).send("Internal Server Error");
    }
});

function fetchDataFromUrl(url) {
    const protocol = url.startsWith('https') ? https : http;
    return new Promise((resolve, reject) => {
        protocol.get(url, (res) => {
            let data = Buffer.alloc(0);
            res.on('data', (chunk) => {
                data = Buffer.concat([data, chunk]);
            });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            console.error("Error fetching data from URL:", err);
            reject(err);
        });
    });
}

function writeImageLinkToFile(imageId, imageUrl) {
    fs.appendFile('image_links.txt', `${imageId}: ${imageUrl}\n`, (err) => {
        if (err) {
            console.error("Error writing image link to file:", err);
        }
    });
}

app.get('/images/:imageId', (req, res) => {
    const imageId = req.params.imageId;
    const imageData = imageLinks[imageId];

    if (!imageData) {
        return res.status(404).send("Image not found");
    }

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline'
    });
    res.end(imageData);
});
