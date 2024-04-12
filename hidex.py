import os

def read_file(file_path):
    with open(file_path, 'rb') as file:
        data = file.read()
        return data

def save_data_to_file(data, file_path):
    with open(file_path, 'wb') as file:
        file.write(data)

def encode_operation():
    while True:
        png_file_path = input("Enter the path to the first file: ")
        if os.path.exists(png_file_path):
            png_data = read_file(png_file_path)
            break
        else:
            print("File doesn't exits")
    while True:
        second_file_path = input("Enter the path to the second file: ")
        if os.path.exists(second_file_path):
            second_data = read_file(second_file_path)
            break
        else:
            print("File doesn't exits")
    encryption_key = input("Enter the encryption key: ").encode('utf-8')

    combined_data = png_data + encryption_key + second_data

    combined_file_path = input("Enter the path to save the combined file: ")
    save_data_to_file(combined_data, combined_file_path)
    print(f"Combined data has been saved to '{combined_file_path}'.")
    main()

def decode_operation():
    while True:
        combined_file_path = input("Enter the path to the combined file: ")
        if os.path.exists(combined_file_path):
            combined_data = read_file(combined_file_path)
            break
        else:
            print("File doesn't exits")
    while True:
        encryption_key = input("Enter the encryption key: ").encode('utf-8')

        separator_index = combined_data.find(encryption_key)

        if separator_index != -1:
            decoded_data = combined_data[separator_index + len(encryption_key):]
            decoded_file_path = input("Enter the path to save the decoded file: ")
            save_data_to_file(decoded_data, decoded_file_path)
            print(f"Decoded data has been saved to '{decoded_file_path}'.")
            break
        else:
            print("This encryption key is not found in this file.")
    main()

def info_operation():
    print("\n Hidex is a Python program designed for combining data with files, providing functionalities for both encoding and decoding operations. It enables users to seamlessly merge additional data with existing files, allowing for various applications such as data embedding or file fusion. The program offers a simple command-line interface where users can select between encoding and decoding modes, providing flexibility and ease of use.")
    print("\n github/alidirza \n")
    main()

def main():
    operation = input("\n Operation Select: ").lower()
    
    match operation:
        case 'help':
            print("\n Enter 'Encode' for the encoding operation \n Enter 'Decode' for the decoding operation \n Enter 'Info' for the basic information about program \n Enter 'Exit' for the exiting program")
            main()
        case 'info':
            info_operation()
        case 'encode':
            encode_operation()
        case 'decode':
            decode_operation()
        case 'exit':
            print("\n Bye \n")
            exit()
        case _:
            print("\n Invalid operation. Please enter 'Help' for more information.")
            main()

if __name__ == "__main__":
    print("\n Welcome to the Hidex. For more info enter 'Help'")
    main()
