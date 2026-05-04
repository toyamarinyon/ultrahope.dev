---
title: Install the Google Cloud CLI with Python managed by mise
publishedAt: "2026-05-04"
---

The Google Cloud CLI [installer](https://cloud.google.com/sdk/docs/install) checks whether the runtime environment has a Python interpreter that the CLI can use.

If you install Python with Homebrew, the installer usually finds it automatically. If you manage Python with mise or a similar tool, the installer may not find it. In that case, set the `CLOUDSDK_PYTHON` environment variable to the Python executable that the installer should use.

This article explains how to install the Google Cloud CLI by passing a Python managed by mise to the installer.

### Prepare Python with mise

The installer that I checked supports Python 3.9 through 3.14.

In this example, install Python 3.13 with mise because the installer looks for `python3.13` first.

```bash
mise use -g python@3.13
```

Skip this step if Python 3.13 is already available in your project or global mise configuration.

### Download the Google Cloud CLI

Following the style of the AWS CLI [installation guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), first check the Google Cloud CLI [installation page](https://cloud.google.com/sdk/docs/install) for the latest archive name. Then download the archive, extract it, and move into the extracted directory.

```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-VERSION-darwin-arm.tar.gz
tar -xf google-cloud-cli-VERSION-darwin-arm.tar.gz
cd google-cloud-sdk
```

### Run the installer with mise's Python

Use `CLOUDSDK_PYTHON` to tell the installer which Python executable to use.

```bash
CLOUDSDK_PYTHON="$(command -v python3.13)" ./install.sh
```

`command -v python3.13` returns the path to the Python executable managed by mise. The installer then uses that path instead of relying on automatic detection.

### What the installer does

The installer starts automatic Python detection only when `CLOUDSDK_PYTHON` is not set.

First, it checks whether the bundled Python can run. If not, it checks these commands in order: `python3.13`, `python3.12`, `python3`, `python3.14`, `python3.11`, `python3.10`, and `python`.

If none of those commands selects a Python interpreter, the installer finally checks whether `python` exists on `PATH`. If it does not, the installer asks you to set `CLOUDSDK_PYTHON` to the location of your Python executable.

When you set `CLOUDSDK_PYTHON` before running `install.sh`, the installer skips this automatic detection path and uses the Python executable you provided.

### Initialize gcloud

After installation, reopen your shell or follow the installer's instructions to update `PATH`.

Then run `gcloud init`.

```bash
gcloud init
```

### Conclusion

Reading the installer implementation can reveal options and control flow that are easy to miss in the documentation.

For the Google Cloud CLI, setting `CLOUDSDK_PYTHON` is enough to use the Python installation that mise already manages.
