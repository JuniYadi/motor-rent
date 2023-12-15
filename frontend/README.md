# Frontend

## Requirement

- NodeJs 16

## Development 

### Install

```
npm install
```

### Running

```
npm run dev
```

## Production

### Build

```
npm run build
```

### Deploy to S3

```
aws s3 sync dist s3://notepad-tugas-dev --acl public-read --delete
aws cloudfront create-invalidation --distribution-id E1NE0FLW5P6Q4P --paths "/index.html"
```