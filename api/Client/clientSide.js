const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let serverAdress;

async function encodeImages() {
    rl.question('Enter first image URL: ', async (firstImageUrl) => {
        rl.question('Enter second image URL: ', async (secondImageUrl) => {
            rl.question('Enter encryption key: ', async (encryptionKey) => {
                try {
                    const response = await axios.post(serverAdress+'/encode', {
                        firstImageUrl,
                        secondImageUrl,
                        encryptionKey,
                    });
                    console.log(response.data);
                } catch (error) {
                    console.error('Error encoding images:', error.response ? error.response.data : error.message);
                } finally {
                    rl.close();
                }
            });
        });
    });
}

async function decodeImage() {
    rl.question('Enter combined image URL: ', async (combinedImageUrl) => {
        rl.question('Enter encryption key: ', async (encryptionKey) => {
            try {
                const response = await axios.post(serverAdress+'/decode', {
                    combinedImageUrl,
                    encryptionKey,
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error decoding image:', error.response ? error.response.data : error.message);
            } finally {
                rl.close();
            }
        });
    });
}

rl.question('Enter server address: ', (address) => {
    serverAdress = address;
    rl.question('Do you want to encode or decode? (encode/decode): ', (operation) => {
        if(operation === 'encode') {
            encodeImages();
        } else if(operation === 'decode') {
            decodeImage();
        } else {
            console.error('Invalid operation selected');
            rl.close();
        }
    });
});
