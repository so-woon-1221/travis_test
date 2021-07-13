docker login -u janus1221 -p wlgns7124!

docker build -t janus1221/next-test-3 .

docker tag janus1221/next-test-3 janus1221/next-test-3:latest

docker push janus1221/next-test-3
docker push janus1221/next-test-3:latest