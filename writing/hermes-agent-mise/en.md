---
title: Getting Started with Hermes Agent Using mise
publishedAt: "2026-05-02"
---

Hermes Agent provides an [installer](https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh), but it does quite a lot. I felt a little hesitant about handing all of that over to an installer.

There is also [another documented approach](https://hermes-agent.nousresearch.com/docs/developer-guide/contributing#clone-and-install): clone the repository, install the dependencies, and create a symbolic link to the executable somewhere in your `PATH`. This time, I tried that route using Python managed by mise.

### Clone the Repository

```bash
git clone --recurse-submodules https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
```

### Prepare uv with mise

When using `uv` with `mise`, setting `python.uv_venv_auto` in `mise.toml` is convenient because you no longer need to run `source .venv/bin/activate` manually.

```bash
touch mise.toml
```

```toml
[settings]
python.uv_venv_auto = "create|source"
```

For more details about `python.uv_venv_auto`, see the [mise documentation](https://mise.jdx.dev/mise-cookbook/python.html#mise-uv).

### Create a venv with uv and install the dependencies

If Python 3.11 and `uv` are not installed yet, install them here.

```bash
mise use python@3.11
mise use uv
uv venv venv --python 3.11
uv pip install -e ".[all,dev]"
uv pip install -e "./tinker-atropos"
```

### Create Hermes Agent directories and a symbolic link

```bash
mkdir -p ~/.hermes/{cron,sessions,logs,memories,skills}
cp cli-config.yaml.example ~/.hermes/config.yaml
mkdir -p ~/.local/bin
ln -sf "$(pwd)/venv/bin/hermes" ~/.local/bin/hermes
```

### Run the doctor command

Running `hermes doctor` will show the remaining tasks needed to run Hermes, such as setting API keys. Check the output and handle anything it reports.

```bash
hermes doctor
```

### Run Hermes

```bash
hermes
```

If you see a screen like this, everything is working.

![welcome screen of hermes](/writing/hermes-agent-mise/hermes-agent-screen.jpeg)

### Closing thoughts

I set up Hermes Agent in my local mise/uv environment without using the installer.

What we are doing is fairly simple: prepare a Python environment, install the dependencies, and make the executable available from `PATH`. Once the steps are separated out, it feels more straightforward to manage than I expected.

If you already use mise, this approach may be a comfortable way to try Hermes Agent.
