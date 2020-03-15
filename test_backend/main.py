import json

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open("testdata/following.txt", "r") as f:
    following = json.loads(f.read())

with open("testdata/followers.txt", "r") as f:
    followers = json.loads(f.read())


@app.route("/add_follow", methods=["POST"])
def add_follow():
    return "add_follow"


@app.route("/unfollow", methods=["POST"])
def unfollow():
    return "unfollow"


@app.route("/get_follow", methods=["GET"])
def get_follow():
    return json.dumps({"code": 200, "contents": following})


@app.route("/get_follower", methods=["GET"])
def get_follower():
    return json.dumps({"code": 200, "contents": followers})


if __name__ == "__main__":
    app.run()
