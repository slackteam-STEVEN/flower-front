#!/bin/bash


curl http://127.0.0.1:5000/print_keys
#curl http://127.0.0.1:5000/access
curl http://192.168.0.3:5000/print_keys


curl -X POST -d '{"type":"follower"}' http://localhost:5000/unfollow
curl -X POST -d '{"aaa":"test"}' http://localhost:5000/add_follow

