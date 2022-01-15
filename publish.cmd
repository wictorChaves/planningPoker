call npm run build-prod
copy publish-continue.cmd dist\publish-continue.cmd
cd dist
start "" publish-continue.cmd