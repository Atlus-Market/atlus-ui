#!/bin/bash

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Please provide both the tag name and the repository name as parameters."
  exit 1
fi

version="$1"
repository="$2"

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

# Determine the local machine's IP address
LOCAL_IP=$(ifconfig | grep 'inet ' | awk '{print $2}' | grep -E '^192\.168\.')

# Build Docker image and pass the local IP as a build argument
docker buildx build --platform linux/arm64 --build-arg LOCAL_IP=${LOCAL_IP} --progress=plain -t "$repo_prefix:$version" .

# Push Docker image
docker push "$repo_prefix:$version"
