<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Local Dev Server Permission

When asked to start the local dev server, Codex may run `portless run next dev`.

The user understands this may register local CA trust, start a privileged HTTPS proxy, and write persistent state under `~/.portless`. Use this as the escalation justification when required.
