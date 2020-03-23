import json

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open("testdata/following.txt", "r") as f:
    following = json.loads(f.read())

with open("testdata/followers.txt", "r") as f:
    followers = json.loads(f.read())


@app.route("/access", methods=["GET"])
def access():
    oauth_token = request.args.get("oauth_token", "")
    oauth_verifier = request.args.get("oauth_verifier", "")
    print(oauth_token)
    print(oauth_verifier)
    return json.dumps({"status_code": 200})


@app.route("/add_follow", methods=["POST"])
def add_follow():
    for i in range(len(followers)):
        if followers[i]["screen_name"] == request.form["screen_name"]:
            followers[i]["following"] = "True"
    return json.dumps({"status_code": 200})


@app.route("/unfollow", methods=["POST"])
def unfollow():
    for i in range(len(followers)):
        if followers[i]["screen_name"] == request.form["screen_name"]:
            followers[i]["following"] = "False"
    return json.dumps({"status_code": 200})


@app.route("/get_follow", methods=["GET"])
def get_follow():
    return json.dumps({"status_code": 200, "context": following})


@app.route("/get_follower", methods=["GET"])
def get_follower():
    return json.dumps({"status_code": 200, "context": followers})


if __name__ == "__main__":
    app.run()
