---
title: miseで入れたPythonを使ってGoogle Cloud CLIをインストールする
publishedAt: "2026-05-04"
---

Google Cloud CLIの[installer](https://cloud.google.com/sdk/docs/install)には、Google Cloud CLIに必要なPythonが実行環境に存在するか確認する処理が入っています。

HomebrewでPythonを入れている場合は、そのPythonが自然に使われます。一方で、miseなどでPythonを管理している場合は、installerからうまく見つからないことがあります。その場合は、installerが参照するPythonのパスを固定する`CLOUDSDK_PYTHON`環境変数を使います。

この記事では、`CLOUDSDK_PYTHON`を使ってmiseで管理しているPythonを指定し、Google Cloud CLIをインストールする流れを紹介します。

### miseでPythonを用意する

手元で確認したinstallerでは、Python 3.9から3.14までが対象になっていました。

今回はinstallerが優先的に探しているPython 3.13をmiseで入れておきます。

```bash
mise use -g python@3.13
```

すでにプロジェクトやグローバル設定でPython 3.13を使えるようにしている場合は、この手順は不要です。

### Google Cloud CLIをダウンロードする

AWS CLIの[インストールガイド](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)のように、Google Cloud CLIの[インストールページ](https://cloud.google.com/sdk/docs/install)で最新のarchive名を確認し、ダウンロードして展開したディレクトリに移動します。

```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-VERSION-darwin-arm.tar.gz
tar -xf google-cloud-cli-VERSION-darwin-arm.tar.gz
cd google-cloud-sdk
```

### miseのPythonを指定してinstallerを実行する

installerにPythonの場所を伝えるには、`CLOUDSDK_PYTHON`を使います。

```bash
CLOUDSDK_PYTHON="$(command -v python3.13)" ./install.sh
```

`command -v python3.13`でmiseが管理しているPythonの実行ファイルを取得し、それを`CLOUDSDK_PYTHON`としてinstallerに渡しています。

これでinstallerは自動検出に頼らず、指定したPythonを使ってインストールを進めてくれます。

### installerの中で何が起きているか

installerの実装を確認すると、`CLOUDSDK_PYTHON`が未指定の場合は、まず利用するPythonを自動検出する処理に入ります。

順番としては、まず同梱Pythonが使えるかを確認し、それが使えない場合に`python3.13`、`python3.12`、`python3`、`python3.14`、`python3.11`、`python3.10`、`python`の順に見ていきます。

それでも決まらなかった場合は、最後にPATH上の`python`があるかだけを確認し、見つからなければ`CLOUDSDK_PYTHON`を指定するよう案内を出します。

一方で、先に`CLOUDSDK_PYTHON`を指定しておけば、この自動検出の分岐には入らず、そのPythonが使われます。

### gcloudを初期化する

インストールが終わったら、必要に応じてshellを開き直すか、表示された案内に従ってPATHを反映します。

その後、`gcloud init`を実行します。

```bash
gcloud init
```

### まとめ

installerの実装を読むと、ドキュメントには出てこないオプションや処理の流れが見えてくることがあります。

Google Cloud CLIも、miseで管理しているPythonのPATHを`CLOUDSDK_PYTHON`で指定できました。
