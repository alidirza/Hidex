# Hidex
Hidex is a Python program designed for combining data with files, providing functionalities for both encoding and decoding operations. It enables users to seamlessly merge additional data with existing files, allowing for various applications such as data embedding or file fusion. The program offers a simple command-line interface where users can select between encoding and decoding modes, providing flexibility and ease of use.

## Features:

Encoding Operation: Users can combine multiple files into a single file.

Decoding Operation: Users can extract embedded data from combined files generated by the encoding operation.

User-Friendly Interface: The program offers a straightforward command-line interface, making it easy for users to perform encoding and decoding tasks.

Flexibility: Hidex supports various file types for additional data, offering flexibility in data fusion operations.

Efficient Data Handling: The program efficiently handles the merging and extraction of data, ensuring integrity and accuracy in the combined files.

## Quick Start:
###### Note: This Python script can work with most file types please make sure that while encoding the first file's type is the same as the combined file's type, and while decoding make sure that the combined file's type is the same as the decoded file's type. If these are not the same, the program can not function as expected.
###### Note: Using text-based file formats is highly unrecommended. Text-based file formats can show both the key and the file's contents.
###### Disclaimer: Hidex is a data combiner program. Hidex is not encrypting for the security of the file contents. Don't use Hidex for the primary security of the file.
```shell
git clone https://github.com/alidirza/Hidex.git && cd Hidex
python3 hidex.py
```
## Api Usage:
With Hidex API, photos can be merged from any coding environment.
###### Note: Unlike the Python script, API can only be used for merging photos, other file types can have trouble with API.
##### Server-Side Installation:
```shell
git clone https://github.com/alidirza/Hidex.git && cd Hidex && cd api && cd Server
npm install
node server.js
```
##### Client Side Instalation:
```shell
git clone https://github.com/alidirza/Hidex.git && cd Hidex && cd api && cd Client
npm install
node clientSide.js
```
After installing the api, the client side is going to ask for the server address. If you installed the api locally enter the server address that the server-side code gives to you. If you are using a web-based node.js editor(glitch,replit, etc...) enter the URL of the server-side installed project to the client side's server address.

## Use Cases:

Data Embedding: Embedding information within files for various purposes such as watermarking or metadata attachment.

File Fusion: Combining multiple files into a single file for simplified storage or transmission.

Secure Data Transmission: Concealing sensitive data within files for secure transmission over networks.

## How to Use:

Launch the program and select the desired operation (encode or decode).


#### For encoding:

1-Provide the paths to the files to be combined.

2-Select an encryption key for security.

3-Specify the path for the output combined file.


#### For decoding:

1-Provide the path to the combined file generated by the encoding operation.

2-Enter the encryption key for the file.

3-Specify the path for the output decoded file.

## Dependency:

Python 3.x

## Compatibility:

Cross-platform compatibility (Windows, macOS, Linux)

## License:

Hidex is open-source software distributed under the MIT License, allowing for free use and modification.

