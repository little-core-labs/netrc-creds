# netrc-creds
Install Credentials to your Github Actions netrc file.  Useful for authenticating access to additional GitHub resources.

<a href="https://github.com/little-core-labs/netrc-creds"><img alt="GitHub Actions status" src="https://github.com/little-core-labs/netrc-creds/workflows/Tests/badge.svg"></a>

## Usage

### Pre-requisites
Create a workflow `.yml` file in your repositories `.github/workflows` directory. An [example workflow](#example-workflow) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).


### Inputs

- `creds`: A JSON array of credential objects (`machine`, `login`, `password`).  Required.  Github actions doesn't support strucutred input.  womp.

### Outputs

None.

### Example workflow

```yaml
name: Example installing netrc creds

on: [push]

env:
  - login: l12s-bot

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
    - uses: actions/checkout@v1
    - name: Apply netrc creds
      uses: little-core-labs/netrc-creds@v1
      with:
        creds: |
          [
            {
              "machine": "github.com",
              "login": "${{env.login}}",
              "password": "${{ secrets.GH_MACHINE_TOKEN }}"
            },
            {
              "machine": "api.github.com",
              "login": "${{env.login}}",
              "password": "${{ secrets.GH_MACHINE_TOKEN }}"
            }
          ]
```

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
