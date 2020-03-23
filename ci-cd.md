# Continuous Integration and Deployment

⚠ *Work in progress* ⚠

## Workflow Concept

- for PRs, we run tests (duh)
- for pushes to `master` (i.e. merged PRs), or pushes of tags:
  - also run tests
  - build all docker images and push them to the GitHub package registry
- when new Docker images are published, re-deploy
  - we could either poll for them
    ([watchtower](https://github.com/containrrr/watchtower) can do that)
  - or we somehow notify the deployment server that new images are published
    (e.g. making a simple to request to some HTTP API)

## TODO

- build & publish nginx image
- build & publish frontend image
- create a docker-compose config that uses images from GitHub registry
- make sure pulling from GH reg. works (needs auth via token, see below);
  try to automate with a small script

## Notes / Resources

### GitHub Documentation

- [GitHub Actions Documentation](https://help.github.com/en/actions)
- [GitHub Packages Documentation](https://help.github.com/en/packages)

### Pulling Docker Images from GitHub Registry

To be able to pull Docker images from the GitHub registry, you
[need an access token](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-docker-for-use-with-github-packages#authenticating-with-a-personal-access-token).

- [create token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token),
  give it `package:read` permission
- store somewhere (e.g. `~/.wartefrei.token`)
- `cat ~/.wartefrei.token | docker login docker.pkg.github.com -u USERNAME --password-stdin`
- `docker pull docker.pkg.github.com/methodpark/digitaleswarten/wartefrei-backend:latest`
