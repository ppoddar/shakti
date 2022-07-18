#/bin/sh
# -------------------------------------------
# rsyncs all web assets to aws EC2 machine
# -------------------------------------------
# set up the remote configuration
source configure.sh
# A  trailing slash on the source changes this behavior to avoid creating
# an additional directory level at the destination
SOURCE=./
# Note also that host and module  references  don't  require  a  trailing
# slash to copy the contents of the default directory.
REMOTE_DEST=/var/www/html/shakti

rsync -apRrvz --omit-dir-times -e "ssh -i $PEM_FILE" \
    --files-from=rsync.list \
     $SOURCE $REMOTE_USER@$REMOTE_HOST:$REMOTE_DEST \

