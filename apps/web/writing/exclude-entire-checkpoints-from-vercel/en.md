---
title: Do not deploy entire checkpoint branches to Vercel
publishedAt: "2026-05-31"
---

When a GitHub repository is connected to Vercel, every push can become a Preview Deployment.

That is usually convenient, but there is one small thing to watch for when using `entire.io`.

entire automatically pushes a branch named `entire/checkpoints/v1` to store checkpoints. That branch is useful for entire, but it is not an application branch that I want Vercel to deploy.

Without extra configuration, Vercel still sees it as a normal GitHub branch push.

So each checkpoint update can create another Preview Deployment. Nothing is broken, but the deployment list and GitHub checks get noisier.

### Exclude it in vercel.json

Vercel supports branch-level deployment control through `git.deploymentEnabled` in `vercel.json`.

For `entire/checkpoints/v1`, write:

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

If the project already has a `vercel.json`, keep the existing settings and add the `git` block.

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

After this, pushes to `entire/checkpoints/v1` no longer trigger Vercel deployments. Other branches continue to deploy as usual.

### Prefer branch config here

Vercel also has `ignoreCommand`, but this case is simpler than that.

The checkpoint branch is not a branch that should be deployed in the first place. Describing that in `git.deploymentEnabled` makes the intent clearer than stopping the build later.

It is a small setting, but if you use entire in a Vercel-deployed project, it is worth adding early.
