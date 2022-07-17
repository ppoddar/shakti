#!/bin/sh
# copy the relevant files to AWS S3
for d in content css font images scripts; do
    aws s3 sync $d/ s3://shakti.poem/$d --acl public-read
done

aws s3 cp index2.html s3://shakti.poem/index.html --acl public-read

# for f in index notes biography ; do
#    aws s3 cp $f.html s3://shakti.poem/ --acl public-read
# done

# open http://shakti.poem.s3-website-us-west-1.amazonaws.com/




