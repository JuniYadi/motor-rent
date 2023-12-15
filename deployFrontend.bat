@echo off

echo "Deploy Frontend to Production"

cd frontend
call npm run build
aws s3 sync dist s3://motorent-tugas-dev --acl public-read --delete
aws cloudfront create-invalidation --distribution-id E2JOTYJGGE7PBJ --paths "/index.html"