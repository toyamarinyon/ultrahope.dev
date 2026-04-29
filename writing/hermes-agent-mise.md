---
title: miseで始めるHermes Agent
description: miseで管理しているPythonを使ってHermes Agentをinstallし利用できるようにします。
publishedAt: "2026-04-28"
---

Hermes Agent には [installer](https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh) が用意されているのですが、installerが必要なほどにはやることが多く、それをインストーラーに任せるのはちょっと抵抗がありました。

[別の方法](https://hermes-agent.nousresearch.com/docs/developer-guide/contributing#clone-and-install)としてレポジトリをCloneして依存関係を解決して実行ファイルのシンボリックリンクをpathの通ったディレクトリに作る方法も用意されており、今回はこれをmiseで管理しているPythonでやってみました。
 

### RepositoryをClone

```bash
git clone --recurse-submodules https://github.com/NousResearch/hermes-agent.git
cd hermes-agent
```

### miseでuvの準備

`mise`で`uv`を使用する場合は、`mise.toml`ファイルで`python.uv_venv_auto`を設定すると`source .venv/bin/activate`する必要がなくなるので便利です。

```bash
touch mise.toml
```

```toml
[settings]
python.uv_venv_auto = "create|source"
```

`python.uv_venv_auto`について詳しい説明は[miseのドキュメント](https://mise.jdx.dev/mise-cookbook/python.html#mise-uv)を確認してください。

### uvでvenvを作成してpip install

Python 3.11とuvが入っていない場合はここで入れておきましょう。

```bash
mise use python@3.11
mise use uv
uv venv venv --python 3.11
uv pip install -e ".[all,dev]"
uv pip install -e "./tinker-atropos"
```

### Hermes Agentが利用するファイル置き場と実行用のシンボリックリンクを作成する

```bash
mkdir -p ~/.hermes/{cron,sessions,logs,memories,skills}
cp cli-config.yaml.example ~/.hermes/config.yaml
mkdir -p ~/.local/bin
ln -sf "$(pwd)/venv/bin/hermes" ~/.local/bin/hermes
```

### doctorコマンドを実行

`hermes doctor`を実行するとAPI KEYの設定など、hermesを実行するための残タスクが表示されるので確認して対応します。

```bash
hermes doctor
```

### hermesを実行

```bash
hermes
```

以下のように表示されれば成功です。

![welcome screen of hermes](/writing/hermes-agent-mise/hermes-agent-screen.jpeg)

### 終わりに

installerを使わずに手元のmise/uv環境でHermes Agentをセットアップしてみました。

やっていること自体は、Python環境を用意して依存関係を入れ、実行ファイルへpathを通すだけです。手順を分けて見ていくと、思ったより素直に管理できる印象でした。

すでにmiseを使っている方は、この方法で試してみると扱いやすいかもしれません。
