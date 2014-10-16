#!/bin/bash
set -uex

git remote update
if [ `git branch --list gh-pages `]
then
    git branch -D gh-pages
fi
git checkout gh-pages
git merge origin/master
gulp examples
mv examples-compiled examples-published
git add examples-published
git commit -m "Updating examples."
echo "Done. Run 'git push origin gh-pages'."
