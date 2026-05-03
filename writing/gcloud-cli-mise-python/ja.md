---
title: miseで入れたPythonを使ってGoogle Cloud CLIをインストールする
publishedAt: "2026-05-04"
---

Google Cloud CLIには[installer](https://cloud.google.com/sdk/docs/install)が用意されています。

Google Cloud CLIはPythonを利用するため、installerの中では、どのPythonを使うかを決める処理が入っています。

HomebrewでPythonを入れている場合はそのPythonが自然に使われますが、miseなどでPythonを管理している場合は、installerからうまく見つからないことがあります。

その場合、installerは「PATH上にPythonを用意するか、`CLOUDSDK_PYTHON`にPython実行ファイルの場所を指定してください」と案内してくれます。

今回はこの案内に従って、`CLOUDSDK_PYTHON`でmiseのPythonを指定し、Google Cloud CLIをインストールしてみます。

### miseでPythonを用意する

Google Cloud CLI v564.0.0のinstallerでは、Python 3.9から3.14までが対象になっていました。

今回はinstallerが優先的に探しているPython 3.13をmiseで入れておきます。

```bash
mise use -g python@3.13
```

すでにプロジェクトやグローバル設定でPython 3.13を使えるようにしている場合は、この手順は不要です。

```bash
python3.13 --version
```

### Google Cloud CLIをダウンロードする

Google Cloud CLIのarchiveをダウンロードして展開します。

```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-564.0.0-darwin-arm.tar.gz
tar -xf google-cloud-cli-564.0.0-darwin-arm.tar.gz
cd google-cloud-sdk
```

Intel Macの場合は、archive名の`darwin-arm`の部分を`darwin-x86_64`に変えてください。

### miseのPythonを指定してinstallerを実行する

installerにPythonの場所を伝えるには、`CLOUDSDK_PYTHON`を使います。

```bash
CLOUDSDK_PYTHON="$(command -v python3.13)" ./install.sh
```

`command -v python3.13`でmiseが管理しているPythonの実行ファイルを取得し、それを`CLOUDSDK_PYTHON`としてinstallerに渡しています。

これでinstallerは自動検出に頼らず、指定したPythonを使ってインストールを進めてくれます。

### installerの中で何が起きているか

手元の`~/google-cloud-sdk/install.sh`を確認すると、`CLOUDSDK_PYTHON`が未指定の場合だけPythonを探すようになっています。

順番としては、まず同梱Pythonが使えるかを確認し、それが使えない場合に`python3.13`、`python3.12`、`python3`、`python3.14`、`python3.11`、`python3.10`、`python`の順に見ていきます。

一方で、先に`CLOUDSDK_PYTHON`を指定しておけば、この自動検出の分岐には入らず、そのPythonが使われます。

### gcloudを初期化する

インストールが終わったら、必要に応じてshellを開き直すか、表示された案内に従ってPATHを反映します。

その後、`gcloud init`を実行します。

```bash
gcloud init
```

### 終わりに

miseでPythonを管理している場合でも、Google Cloud CLIのinstallerには`CLOUDSDK_PYTHON`でPythonの場所を渡せば大丈夫でした。

installerが何を探しているかを見てみると、やっていることはかなり素直です。Pythonをもう一つ別の方法で入れるのではなく、すでに使っているmiseのPythonを明示してあげるだけで済みます。
