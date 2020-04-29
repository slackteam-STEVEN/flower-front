import json

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/ms_test", methods=["GET"])
def ms_test():
    article_id = request.args.get("article_id")
    return json.dumps({"status_code": 200, "context": article_id})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)
