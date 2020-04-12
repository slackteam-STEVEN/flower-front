#!/bin/bash


curl http://127.0.0.1:5000/print_keys
#curl http://127.0.0.1:5000/access
curl http://192.168.0.3:5000/print_keys


curl -X POST -d '{"type":"follower"}' http://localhost:5000/unfollow
curl -X POST -d '{"aaa":"test"}' http://localhost:5000/add_follow



curl -X GET http://localhost:5000/access?screen_name=shkashkashkas
curl -X GET http://localhost:5000/access?screen_name=hoge



curl http://192.168.0.3:8080/print_keys


curl -X GET http://192.168.0.3:5000/register?random_str=shikaaran\&oauth_token=hoge\&oauth_verifier=fuga



curl -X GET http://192.168.0.3:8080/get_tw_oauth?&oauth_token=hoge\&oauth_verifier=fuga


