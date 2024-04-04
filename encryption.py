import os
import base64
from cryptography.fernet import Fernet
from dotenv import load_dotenv

load_dotenv()
cipher_key = os.getenv("KEY")
cipher = Fernet(cipher_key)


def encrypt_file(file_path):
    with open(file_path, 'rb') as file:
        plaintext = file.read()

    # Encode the binary data using Base64 encoding
    plaintext_encoded = base64.b64encode(plaintext)

    # Encrypt the encoded data
    encrypted_text = cipher.encrypt(plaintext_encoded)

    # Write the encrypted data back to the file
    with open(file_path, 'wb') as file:
        file.write(encrypted_text)


def decrypt_file(file_path):
    # Read the encrypted data from the file
    with open(file_path, 'rb') as file:
        encrypted_text = file.read()

    # Decrypt the data
    decrypted_text = cipher.decrypt(encrypted_text)

    # Decode the decrypted data using Base64 decoding
    decrypted_text_decoded = base64.b64decode(decrypted_text)

    # Write the decoded data back to the file
    with open(file_path, 'wb') as file:
        file.write(decrypted_text_decoded)
