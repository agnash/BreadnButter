#!/bin/bash

payload+="{\"body\":\""
payload+=$2
payload+="\"}"

curl -i -k -H "Authorization: token <redacted>" -H "Content-Type: application/json" -d "$payload" https://api.github.com/repos/CS410-510/FTPClient/issues/$1/comments || :
