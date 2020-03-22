import json

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open("testdata/following.txt", "r") as f:
    following = json.loads(f.read())

with open("testdata/followers.txt", "r") as f:
    followers = json.loads(f.read())


@app.route("/add_follow", methods=["POST"])
def add_follow():
    return "add_follow\n"


@app.route("/unfollow", methods=["POST"])
def unfollow():

    print(request.form["screen_name"])
    for i in range(len(followers)):
        print(followers[i]["screen_name"])
        if followers[i]["screen_name"] == request.form["screen_name"]:
            followers[i]["following"] = False
            print("success!")

    return f"unfollow\n"


@app.route("/get_follow", methods=["GET"])
def get_follow():
    return json.dumps({"status_code": 200, "context": following})


@app.route("/get_follower", methods=["GET"])
def get_follower():
    return json.dumps({"status_code": 200, "context": followers})


if __name__ == "__main__":
    app.run()
