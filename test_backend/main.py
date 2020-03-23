import json
import os

import tweepy

from flask import Flask, redirect, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


consumer_key = os.environ["TW_CON_KEY"]
consumer_secret = os.environ["TW_CON_SKEY"]
access_token = os.environ["TW_ACC_TOKEN"]
secret_access_taken = os.environ["TW_ACC_STOKEN"]

my_info_keys = [
    "id",
    "name",
    "screen_name",
    "profile_image_url_https",
]


oauth_token_list = []
oauth_verifier_list = []

with open("testdata/following.txt", "r") as f:
    following = json.loads(f.read())

with open("testdata/followers.txt", "r") as f:
    followers = json.loads(f.read())


def get_my_info():
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, secret_access_taken)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    my_info = api.me()._json
    result = {key: my_info[key] for key in my_info_keys}
    return result


@app.route("/print_keys", methods=["GET"])
def print_keys():
    print(oauth_token_list)
    print(oauth_verifier_list)
    return json.dumps({"status_code": 200})


@app.route("/access", methods=["GET"])
def access():
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    login_url = auth.get_authorization_url()
    return redirect(login_url)


@app.route("/register", methods=["GET"])
def register():
    oauth_token = request.args.get("oauth_token", "")
    oauth_verifier = request.args.get("oauth_verifier", "")
    oauth_token_list.append(oauth_token)
    oauth_verifier_list.append(oauth_verifier)
    return redirect("http://localhost:8080/followers")


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
    return json.dumps({"status_code": 200, "me": get_my_info(), "context": following})


@app.route("/get_follower", methods=["GET"])
def get_follower():
    return json.dumps({"status_code": 200, "me": get_my_info(), "context": followers})


if __name__ == "__main__":
    app.run()
