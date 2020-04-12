import json
import os

import tweepy

from flask import Flask, redirect, request, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


consumer_key = os.environ["TW_CON_KEY"]
consumer_secret = os.environ["TW_CON_SKEY"]
# access_token = os.environ["TW_ACC_TOKEN"]
# secret_access_taken = os.environ["TW_ACC_STOKEN"]

my_info_keys = [
    "id",
    "name",
    "screen_name",
    "profile_image_url_https",
    "friends_count",
    "followers_count",
]

login_info = {}


with open("testdata/myinfo.txt", "r") as f:
    myinfo = json.loads(f.read())

with open("testdata/following.txt", "r") as f:
    following = json.loads(f.read())

with open("testdata/followers.txt", "r") as f:
    followers = json.loads(f.read())


@app.route("/print_keys", methods=["GET"])
def print_keys():
    return json.dumps({"status_code": 200})


@app.route("/access", methods=["GET"])
def access():

    # すでにlogin_infoに同じipがある場合、topにリダイレクト
    # if request.environ["REMOTE_ADDR"] in list(login_info.keys()):
    #    return redirect("http://192.168.0.3:8080/following")

    # auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    # login_url = auth.get_authorization_url()
    # return redirect(login_url)

    screen_name = request.args.get("screen_name")

    if screen_name == "shkashkashkas":
        result = {
            "status_code": 200,
            "random_str": "shikarand",
        }

    else:
        # idがDBにない(twitterAPI認証できない)場合の処理
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        redirect_url = auth.get_authorization_url()
        result = {
            "status_code": 200,
            "redirect_url": redirect_url,
            "random_str": "qawsedrftgyhujikolp",
        }

    return json.dumps(result)


@app.route("/register", methods=["GET"])
def register():

    # oauth_token取得
    # oauth_token = request.args.get("oauth_token", "")
    # oauth_verifier = request.args.get("oauth_verifier", "")

    # ログイン情報を登録(ipをキーとする)
    # login_info[request.environ["REMOTE_ADDR"]] = {
    #    "oauth_token": oauth_token,
    #    "oauth_verifier": oauth_verifier,
    # }
    # print(login_info)
    oauth_token = request.args.get("oauth_token")
    oauth_verifier = request.args.get("oauth_verifier")
    random_str = request.args.get("random_str")

    result = {
        "status_code": 200,
        "oauth_token": oauth_token,
        "oauth_verifier": oauth_verifier,
        "random_str": random_str,
    }
    print(result)
    # return json.dumps(result)
    return redirect("http://192.168.0.3:8080/following")


@app.route("/get_myinfo", methods=["GET"])
def get_myinfo():
    # auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    # auth.set_access_token(access_token, secret_access_taken)
    # api = tweepy.API(auth, wait_on_rate_limit=True)
    # my_info = api.me()._json
    # result = {key: my_info[key] for key in my_info_keys}
    # return json.dumps({"status_code": 200, "context": result})
    return json.dumps({"status_code": 200, "context": myinfo})


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
    app.run(host="0.0.0.0", port=5000, threaded=True)
