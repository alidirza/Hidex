const axios = require('axios');

const firstImageUrl = 'https://example.com/1.png';
const secondImageUrl = 'https://example.com/2.png';
const combinedImageUrl = 'https://example.com/result.png';
const encryptionKey = 'secretKey';

// Function to encode images
async function encodeImages() {
    try {
        const response = await axios.post('https://buttered-long-gong.glitch.me/encode', {
            firstImageUrl,
            secondImageUrl,
            encryptionKey,
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error encoding images:', error.response ? error.response.data : error.message);
    }
}

// Function to decode image
async function decodeImage() {
    try {
        const response = await axios.post('https://buttered-long-gong.glitch.me/decode', {
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
