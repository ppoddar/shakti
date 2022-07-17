#!/bin/sh
# --------------------------------------
# 1. unpacks a zip file
# 2. starts a webserver 
# 
# assumption a zip file exists in the same
# directory of this script
# --------------------------------------
PORT=${1:-8000}
ZIP_FILE=shakti.zip
if test -f $ZIP_FILE; then
  echo $ZIP_FILE exists. unzipping...
  unzip -o -q  -d shakti/ $ZIP_FILE
else 
  echo $ZIP_FILE does not exist
fi

pid=`sudo lsof -i -P -n | grep LISTEN | grep $PORT |  awk '{print $2}'`
if test -z $pid ; then
  echo port $PORT is not busy. Starting Python webserver
  nohup python -m SimpleHTTPServer $PORT &
else 
  echo port $PORT is already busy by process $pid. ignoring...
fi
exit

