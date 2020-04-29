#!/bin/bash


curl http://127.0.0.1:5000/print_keys
#curl http://127.0.0.1:5000/access
curl http://192.168.0.3:5000/print_keys


curl -X POST -d '{"type":"follower"}' http://localhost:5000/unfollow
curl -X POST -d '{"aaa":"test"}' http://localhost:5000/add_follow
curl -X POST -H  '{"header":"qvHKVRCETnEtixoUhQOh80SglT3fFBQ56Oic9jRf"}' https://g8niw11qta.execute-api.ap-northeast-1.amazonaws.com/dev/article


curl -X POST -H 'x-api-key,qvHKVRCETnEtixoUhQOh80SglT3fFBQ56Oic9jRf' https://g8niw11qta.execute-api.ap-northeast-1.amazonaws.com/dev/article


curl -X GET http://localhost:5000/access?screen_name=shkashkashkas
curl -X GET http://localhost:5000/access?screen_name=hoge

curl -X POST -d '{“test”:1}' https://g8niw11qta.execute-api.ap-northeast-1.amazonaws.com/dev/article


curl http://192.168.0.3:8080/print_keys


curl -X GET http://192.168.0.3:5000/register?random_str=shikaaran\&oauth_token=hoge\&oauth_verifier=fuga

curl -d '{"test":1}' -H 'x-api-key:qvHKVRCETnEtixoUhQOh80SglT3fFBQ56Oic9jRf' -X POST https://g8niw11qta.execute-api.ap-northeast-1.amazonaws.com/dev/article 

curl -X GET http://192.168.0.3:8080/get_tw_oauth?&oauth_token=hoge\&oauth_verifier=fuga

curl -d '{"article_id":"01E68NVRCNN3KBXZF6AE8VTDPT"}' -H 'x-api-key:qvHKVRCETnEtixoUhQOh80SglT3fFBQ56Oic9jRf' -X GET https://g8niw11qta.execute-api.ap-northeast-1.amazonaws.com/dev/article
