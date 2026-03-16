from flask import Flask, request, jsonify
from flask_cors import CORS
from database.db import get_db

app = Flask(__name__)
CORS(app)

# REGISTER
@app.route('/register', methods=['POST'])
def register():

    data = request.json
    full_name = data['full_name']
    email = data['email']
    password = data['password']

    conn = get_db()
    cursor = conn.cursor()

    # kiểm tra email đã tồn tại chưa
    cursor.execute("SELECT * FROM users WHERE email=?", (email,))
    user = cursor.fetchone()

    if user:
        conn.close()
        return jsonify({"message":"Email đã tồn tại"})

    cursor.execute(
        "INSERT INTO users (full_name,email,password) VALUES (?,?,?)",
        (full_name,email,password)
    )

    conn.commit()
    conn.close()

    return jsonify({"message":"Đăng ký thành công"})


# LOGIN
@app.route('/login', methods=['POST'])
def login():

    data = request.json
    email = data['email']
    password = data['password']

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (email,password)
    )

    user = cursor.fetchone()

    conn.close()

    if user:
        return jsonify({
            "message": "success",
            "full_name": user[1]
        })
    else:
        return jsonify({
            "message":"Sai email hoặc mật khẩu"
        })


if __name__ == '__main__':
    app.run(debug=True)