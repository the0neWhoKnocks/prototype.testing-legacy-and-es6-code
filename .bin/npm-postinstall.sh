#!/bin/zsh

# adds vendor assets from installed modules
echo "[ COPYING ] vendor resources"

cp "./node_modules/jquery/dist/jquery.min.js" "./public/js/vendor/"
cp "./node_modules/handlebars/dist/handlebars.min.js" "./public/js/vendor/"

echo "[ COPY ] complete"
