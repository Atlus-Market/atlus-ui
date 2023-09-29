#!/bin/bash

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ]; then
  echo "Please provide the tag name, repository name, and public API endpoint as parameters."
  exit 1
fi

version="$1"
repository="$2"
public_api_endpoint="$3"
logrocket_token="$4"

# Set the repository prefix based on the chosen repository
if [ "$repository" == "docker" ]; then
  repo_prefix="ofinno/atlus-ui"
elif [ "$repository" == "google" ]; then
  repo_prefix="gcr.io/atlus-390517/atlus-ui"
elif [ "$repository" == "digitalocean" ]; then
  repo_prefix="registry.digitalocean.com/atlus-containers/atlus-ui"
else
  echo "Invalid repository name. Please choose from docker, google, or digitalocean."
  exit 1
fi

# Build Docker image and pass the local IP as a build argument
docker buildx build --no-cache --platform linux/arm64 \
  --build-arg NEXT_PUBLIC_LOG_ROCKET_TOKEN="$logrocket_token" \
  --build-arg NEXT_PUBLIC_API_ENDPOINT="$public_api_endpoint" --progress=plain -t "$repo_prefix:$version" .

# Push Docker image
docker push "$repo_prefix:$version"
