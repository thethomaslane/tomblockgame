#!/bin/bash -e
USER="$(whoami)"
[ -e "/srv/apps/$USER/$USER.sock" ] && rm "/srv/apps/$USER/$USER.sock"
umask 0

. ~/.nvm/nvm.sh
NODE_ENV=production PORT="/srv/apps/$USER/$USER.sock" \
    exec ~/myapp/src/server.js