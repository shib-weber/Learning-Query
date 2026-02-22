from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="SHIB2561rc@M",
    database="testdb"
)
cursor = db.cursor()

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "<h1> Hello welcome to Server </h1> "

@app.route("/users", methods=["GET"])
def get_users():
    cursor.execute("SELECT * FROM users")
    rows = cursor.fetchall()

    users = []

    for row in rows:
        users.append({
            "id": row[0],
            "name": row[1],
            "unique_id": row[2],
            "comment": row[3]
        })
    
    print(users)

    return jsonify(users)

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()

    name = data.get("name")
    unique_id = data.get("uniqueId")
    comment = data.get("comment")

    print("Received:", name, unique_id, comment)

    cursor.execute(
    "INSERT INTO users (name, unique_id, comment) VALUES (%s, %s, %s)",
    (name, unique_id, comment)
    )
    db.commit()

    return jsonify({"message": "Data received successfully!"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)