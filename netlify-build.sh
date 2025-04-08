#!/bin/bash

# Build only the frontend part for Netlify deployment
npx vite build

# Move the built files to the expected location
mkdir -p dist/client
cp -r dist/* dist/client/

echo "Frontend build completed for Netlify deployment"