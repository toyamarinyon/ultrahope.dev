---
title: entireのcheckpoint branchをVercelにdeployしない
publishedAt: "2026-05-31"
---

VercelにGitHub repositoryを連携していると、pushのたびにPreview Deploymentが作られます。

普段は便利なのですが、`entire.io`を使っているprojectでは少しだけ注意が必要でした。

entireはcheckpointを保存するために、`entire/checkpoints/v1`というbranchを自動的にpushします。これはアプリケーションのPreviewを見たいbranchではないのですが、Vercelから見ると普通のGitHub branchへのpushです。

そのままだと、checkpointが更新されるたびにVercelのdeployが走ります。

壊れているわけではありません。ただ、deploy一覧やGitHub checksにアプリとは関係ないPreview Deploymentが増えていくので、少し面倒です。

### vercel.jsonで除外する

Vercelでは、`vercel.json`の`git.deploymentEnabled`でbranchごとの自動deployを無効化できます。

`entire/checkpoints/v1`を除外するなら、次のように書きます。

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": {
      "entire/checkpoints/v1": false
    }
  }
}
```

既存の`vercel.json`がある場合は、既存設定を残したまま`git`を追加します。

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "*/5 * * * *"
    }
  ],
  "git": {
    "deploymentEnabled": {
      "entire/checkpoints/v1": false
    }
  }
}
```

これで、`entire/checkpoints/v1`にpushされてもVercelの自動deployは走らなくなります。他のbranchはこれまで通りdeployされます。

### ignoreCommandではなくbranch設定にする

Vercelには`ignoreCommand`もありますが、今回やりたいことはbuildを途中で止めることではありません。

`entire/checkpoints/v1`は、そもそもdeploy対象ではないbranchです。

なので、`git.deploymentEnabled`で「このbranchはdeployしない」と書いておくほうが、あとから見ても意図がわかりやすいと思います。

小さい設定ですが、entireをVercel deploy対象のprojectで使うなら最初に入れておくと楽です。
