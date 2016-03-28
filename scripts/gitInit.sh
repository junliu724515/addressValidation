#!/bin/bash

if [ ${#@} == 0 ]; then
    echo "Usage: $0 param1"
    echo "* param1: the salesforce project folder to initialize for git"
else
    pushd $1 || exit 1
    if [ ! -d "src" ]; then
      echo "src folder does not exist"
      popd
      exit 1
     else
      # popd
       pushd ~/Downloads || exit 1
       if [ ! -d "repo_stub" ]; then
           curl -o repo_stub.zip -L 'https://www.dropbox.com/s/ickd04uz644w3tf/repo_stub.zip?dl=1'
           unzip repo_stub.zip; rm -rf __MACOSX
       fi
       pushd repo_stub || exit 1
       pwd
       echo $1
       cp -R . $1 || exit 1
      # popd
    fi
    pushd $1 || exit 1
    git init
    cp scripts/pre-push .git/hooks/
fi