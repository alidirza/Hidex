def read_file(file_path):
    with open(file_path, 'rb') as file:
        data = file.read()
        return data

def save_data_to_file(data, file_path):
    with open(file_path, 'wb') as file:
        file.write(data)

def encode_operation():
    png_file_path = input("Enter the path to the first file: ")
    second_file_path = input("Enter the path to the second file: ")
    encryption_key = input("Enter the encryption key: ").encode('utf-8')

    png_data = read_file(png_file_path)
    second_data = read_file(second_file_path)

    combined_data = png_data + encryption_key + second_data

    combined_file_path = input("Enter the path to save the combined file: ")
    save_data_to_file(combined_data, combined_file_path)
    print(f"Combined data has been saved to '{combined_file_path}'.")

def decode_operation():
    combined_file_path = input("Enter the path to the combined file: ")
    encryption_key = input("Enter the encryption key: ").encode('utf-8')

    combined_data = read_file(combined_file_path)

    separator_index = combined_data.find(encryption_key)

    if separator_index != -1:
        decoded_data = combined_data[separator_index + len(encryption_key):]
        decoded_file_path = input("Enter the path to save the decoded file: ")
        save_data_to_file(decoded_data, decoded_file_path)
        print(f"Decoded data has been saved to '{decoded_file_path}'.")
    else:
        print("This encryption key is not found in this file.")

def info_operation():
    print("Hidex is a Python program designed for combining data with files, providing functionalities for both encoding and decoding operations. It enables users to seamlessly merge additional data with existing files, allowing for various applications such as data embedding or file fusion. The program offers a simple command-line interface where users can select between encoding and decoding modes, providing flexibility and ease of use.")
    print("github/alidirza")

def main():
    print("Welcome to the hidex")
    operation = input("Enter 'encode' for the encoding operation or 'decode' for the decoding operation, for more info enter 'info': ").lower()
    
    if operation == 'encode':
        encode_operation()
    elif operation == 'decode':
        decode_operation()
    elif operation == 'info':
        info_operation()
    else:
        print("Invalid operation. Please enter 'encode', 'decode', or 'info'.")

if __name__ == "__main__":
    main()
