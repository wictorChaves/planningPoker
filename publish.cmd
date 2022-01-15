call npm run build-prod
git checkout gh-pages publish.cmd
git checkout gh-pages
del *.txt /Q
del *.ico /Q
del *.html /Q
del *.js /Q
del *.css /Q
rmdir "assets" /S /Q
xcopy /s dist\planningPoker .\
git rm -r --cached .
git add -A
git commit -am "Publish"
git push
git checkout master
pause