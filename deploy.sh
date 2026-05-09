#!/bin/bash
set -e

echo "🏗️  Building..."
npm run build

echo "🚀 Deploying to /srv/websites/italy.jpop.cloud..."
rsync -av --delete dist/public/ /srv/websites/italy.jpop.cloud/

echo "✅ Done!"
