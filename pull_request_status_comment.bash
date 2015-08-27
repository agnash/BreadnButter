#!/bin/bash

payload+="{\"body\":\""
payload+=$2
payload+="\"}"

curl -i -k -H "Authorization: token aca0d48b1691b827842da24caf4e9674f9d87f9b" -H "Content-Type: application/json" -d "$payload" https://api.github.com/repos/CS410-510/FTPClient/issues/$1/comments || :
