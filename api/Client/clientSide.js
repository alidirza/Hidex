const axios = require('axios');

const firstImageUrl = 'https://example.io/1.png';
const secondImageUrl = 'https://example.io/2.png';
const combinedImageUrl = 'https://example.io/result.png';
const encryptionKey = 'secretKey';
const serverAdress = 'http://localhost:3000';

async function encodeImages() {
    try {
        const response = await axios.post(serverAdress+'/encode', {
            firstImageUrl,
            secondImageUrl,
            encryptionKey,
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error encoding images:', error.response ? error.response.data : error.message);
    }
}

async function decodeImage() {
    try {
        const response = await axios.post(serverAdress+'/decode', {
            combinedImageUrl,
            encryptionKey,
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error decoding image:', error.response ? error.response.data : error.message);
    }
}


encodeImages();
decodeImage();
