---
title: "Small software for a gap"
publishedAt: "2026-06-09"
---

I made [enka](https://enka.ultrahope.dev/), a small utility that lets left and right Command key single-taps switch macOS input between Eisu and Kana.

There is already a de facto tool in this area: [Karabiner-Elements](https://karabiner-elements.pqrs.org/). There are also other apps that can provide similar input switching behavior. I used Karabiner-Elements for a long time, too.

But the part I needed was only one small piece of what those apps can do: mapping left and right Command single-taps to Eisu and Kana. I have not needed other key remaps, profile management, or complex conditions for almost ten years. If most of the features would remain unused, I wondered whether this one use case could be a small app of its own.

The first thing I checked was whether recent macOS versions could do this natively. It seems they cannot. macOS has keyboard shortcut settings for switching input sources, and it can use the fn/Globe key to switch input sources. It also has modifier key settings, but those settings replace one modifier role with another, such as Caps Lock, Control, Option, Command, or Globe. There is no built-in setting that treats a left Command single-tap as Eisu and a right Command single-tap as Kana while preserving Command as a normal held modifier.

### Living With macOS Permissions

If the native settings cannot express it, some app has to observe keyboard events. To observe keyboard events, macOS has to grant the app Accessibility permission.

This can be done manually: open System Settings, go to Privacy & Security, then Accessibility, press the plus button, and choose the app. But that is friction. If I was going to make the app myself, I wanted the setup experience to be a little better.

So enka ships not only a CLI, but also `Enka.app`. The app bundle identity becomes the Accessibility target. During installation, macOS can show its own Accessibility permission dialog, open the Accessibility pane in System Settings, and let the user finish setup by turning on the toggle.

### One-Line Install And Uninstall

I also wanted future me to be able to set up a new Mac without remembering a long list of steps, so installation is one line:

```bash
curl -fsSL https://enka.ultrahope.dev/install | sh
```

The installer downloads the release archive and checksum, installs `bin/enka` and `Enka.app` under `~/Applications/enka` by default, writes the LaunchAgent, opens `Enka.app` for Accessibility permission, and starts the agent after permission is granted.

Status, restart, and uninstall are also available from the CLI:

```bash
enka status
enka restart
enka uninstall
```

Uninstall removes only the artifacts owned by enka: the LaunchAgent, installed files, and state/log directory. Accessibility permission is managed by macOS, so if the user wants to remove that approval, they do it from System Settings.

This was one of the things I cared about while making it. A background utility reveals its character not only when it is installed, but when you check its state and remove it. I wanted install to be short, but I also wanted it to stay clear what was placed, how it starts, and how it can be removed.

### Making Software For A Gap, At A Size I Can Understand

There is value in starting with "I do not understand all the details, but this is useful, and many people use it, so I will try it too." We do not need to understand everything from the beginning. If it reduces a small friction in our hands, that alone can be enough reason to use something.

Coding agents have made another choice feel closer: building a small piece of software that fits my own use case. Not as a rejection of large general-purpose tools, but as a way to take only the part I actually use and shape it a little closer to my own hands.

What matters then is keeping the generated code within the range I can understand. enka's daemon is 172 lines. I have barely written Swift, but I can still follow what it observes, where it decides, and which key events it sends. For a background app, it is small enough to read. That felt like enough, and that is what made this worth making.
