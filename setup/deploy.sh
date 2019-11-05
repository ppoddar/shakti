#!/bin/sh
REMOTE_HOST=ec2-13-58-67-125.us-east-2.compute.amazonaws.com
REMOTE_USER=ec2-user
REMOTE_DIR=$REMOTE_HOST:/home/$REMOTE_USER/shaki
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR=$SCRIPT_DIR/..
PEM=$SCRIPT_DIR/pikuda.pem
rsync -r               \
   -e "ssh -i setup/pikuda.pem"      \
   $PROJECT_DIR \
   $REMOTE_USER@$REMOTE_HOST:/home/$REMOTE_USER/shakti

