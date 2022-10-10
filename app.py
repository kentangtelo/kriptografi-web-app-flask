from flask import Flask, render_template, request, jsonify
from algo_crypto_package import CaesarCipher, RailFence, VigenereCipher


app = Flask(__name__, template_folder='templates')


@app.route("/")
def Caesar():
    return render_template("caesar.html")


@app.route("/rail/")
def Rail():
    return render_template("rail.html")


@app.route("/vigenere/")
def Vigenere():
    return render_template("vigenere.html")


@app.route("/super/")
def Super():
    return render_template("super.html")


@app.route("/api/cipher/", methods=["POST"])
def caesar_cipher_back():
    data = request.get_json(force=True)
    operation = data["type"]
    text = data["text"]
    key = int(data["key"])
    if operation == "encrypt":
        cipherText = CaesarCipher.encrypt(key, text)
        return jsonify({"output": cipherText})
    else:
        decryptedText = CaesarCipher.decrypt(key, text)
        return jsonify({"output": decryptedText})


@app.route("/api/rail/", methods=["POST"])
def rail_cipher_back():
    data = request.get_json(force=True)
    operation = data["type"]
    text = data["text"]
    key = int(data["key"])
    if operation == "encrypt":
        cipherText = RailFence.encrypt(text, key)
        return jsonify({"output": cipherText})
    else:
        decryptedText = RailFence.decrypt(text, key)
        return jsonify({"output": decryptedText})


@app.route("/api/vigenere/", methods=["POST"])
def vigenere_cipher_back():
    data = request.get_json(force=True)
    operation = data["type"]
    text = data["text"]
    key = data["key"]
    if operation == "encrypt":
        cipherText = VigenereCipher.encrypt(key, text)
        return jsonify({"output": cipherText})
    else:
        decryptedText = VigenereCipher.decrypt(key, text)
        return jsonify({"output": decryptedText})


@app.route("/api/super/", methods=["POST"])
def super_cipher_back():
    data = request.get_json(force=True)
    operation = data["type"]
    text = data["text"]
    key1 = int(data["key1"])
    key2 = int(data["key2"])
    key3 = data["key3"]
    if operation == "encrypt":
        cipherText = CaesarCipher.encrypt(key1, text)
        cipherText = RailFence.encrypt(cipherText, key2)
        cipherText = VigenereCipher.encrypt(key3, cipherText)
        return jsonify({"output": cipherText})
    else:
        decryptedText = VigenereCipher.decrypt(key3, text)
        decryptedText = RailFence.decrypt(decryptedText, key2)
        decryptedText = CaesarCipher.decrypt(key1, decryptedText)
        return jsonify({"output": decryptedText})


if __name__ == "__main__":
    app.run(debug=True)
