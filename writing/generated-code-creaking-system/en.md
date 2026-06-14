---
title: Generated Code, Transforming Systems
publishedAt: "2026-05-29"
---

Sometimes, after I let AI implement something, I look at the passing tests and feel a small unease.

The screen works. lint and test both pass. If I ask, the diff summary comes back neatly written.

Still, I sometimes pause.

How much of this change can I still call my own?

Writing code with AI no longer feels especially unusual. Not long ago, the fact that AI could write code was itself the topic. Now it feels quite natural to ask for design feedback, delegate implementation, have tests fixed, and even ask for review points.

Of course, this is a welcome change.

The distance between an idea and a working shape has become shorter. I spend less time looking up unfamiliar APIs. Small improvements that I used to postpone because they were tedious are easier to start.

But alongside that brightness, there is something that bothers me a little.

Code can now be generated faster than before. But is the system that receives that code being understood, maintained, and reconsidered at the same speed?

I was thinking about this when I watched Adam Bender's "Software engineering at the tipping point," published as a Google I/O 2026 workshop.[^software-engineering-at-the-tipping-point]

https://www.youtube.com/watch?v=2n41YjR5QfU

What stayed with me was that the video does not treat AI making software development faster as merely a productivity story.

The speed of writing code increases. Agents run tests, make fixes, then run tests again. Individuals and teams become able to handle far more changes than before.

That is certainly a great source of hope. At the same time, it does not seem like this change will wait until we are ready for it.

When only the amount of code increases, what happens to review, testing, design understanding, releases, and organizational culture? Can the software ecosystem, made from the entanglement of people and technology, withstand that speed?

The video steps directly into that question.

### Code Is Both Asset and Liability

In software development, it is easy to treat more code as straightforward progress.

More features. New things become possible. Manual work gets automated. In that sense, code is certainly a source of power.

But code does not end when it is written.

It is read. Changed. Tested. Migrated. Someone traces it during an incident late at night. Even after it is no longer actively used, it remains inside dependencies and operational procedures.

In that sense, code is both an asset and a liability.

I think this feeling matters a great deal in the age of AI. If AI makes us write code ten times faster, then, simply put, the liability of code may also become ten times larger.

Of course, this does not mean code is bad because AI wrote it. There is plenty of code written by humans that no one understands. Conversely, there are cases where using AI makes a change more careful, with explanations and tests included.

The problem is not who wrote the code. The problem is how that code is handled inside the system.

Diffs waiting for review, tests whose background no one remembers, decisions that never made it into the README, small branches in operational procedures. These things tend to take effect a little later than the code itself.

Review cannot keep up. Passing tests become the only reason anyone can give for safety. Small useful tools multiply across the organization, and before long, their maintainers and scope become unclear.

When that happens, code is being generated, but the system begins to show different behavior.

### Practices Were Provisional

What I found interesting in the video was the idea that, when we think about development in the age of AI, we have to question our existing practices themselves.

Take code review.

In current development, humans often read a diff, leave comments, approve it, and then merge it. This is a very important practice. At the very least, it has created a tension where someone has to look at a change.

But when AI greatly increases the amount of change, it is not obvious that the same practice can remain intact. The diff may become too large to know where to begin reading. Reviewers may become the bottleneck, and review may gradually become only a formality. Or, because keeping up is impossible, people may give up on humans looking at the change at all.

The same is true of testing.

The idea that software can be released when all tests are green has worked well in many situations. But when agents repeatedly run tests to check their own work, and both the codebase and the test suite grow much larger, it becomes difficult to treat every test with the same weight. When AI fixes a test, we still have to check whether it is protecting the specification, or merely reshaping reassurance around the current implementation.

That does not mean review or testing become unnecessary.

I think it is the opposite.

We need to revisit review and testing not as rituals that must never change, but from the principles they were meant to protect.

I began to see practices as provisional.

By provisional, I do not mean carelessly placed. I mean that they were changeable means chosen at a given time in order to protect certain principles.

To admit this is not to discard the old way. It is to take the practice in hand again and ask what it had been protecting, so that we can keep protecting it in another form.

In my own words, this feels close to "not deciding too early, and not abandoning the decision either."

I do not want to treat today's review process as the eternal answer. But I also do not want to say, because AI wrote it and the tests passed, everything else can be left to chance.

What should we observe? How much should be automated? Which judgments should remain near human hands?

I think we will need to keep updating those provisional arrangements according to the state of the team and the system.

### Not Losing Sight of the System

The video uses the phrase intellectual control.

It is a little formal, but I understood it as not losing sight of the system.

For example, AI fixes a diff, the tests pass, and the PR description sounds plausible. Still, there are moments when I wonder: if this breaks next time, where would I even start looking?

That does not feel like a matter of simply failing to read every detail.

The same concern has been expressed in different ways. For example, Shopify's Head of Engineering calls it comprehension debt in Inside Shopify's AI-first engineering playbook.[^shopify-ai-first-engineering-playbook]

AI makes development faster. But if, within that speed, we also hand over thinking and learning, the understanding we need to maintain the system, fix it when it breaks, and move it into its next shape slowly becomes thinner. The Shopify article makes the point that we can abdicate toil to AI, but we should not abdicate the thinking.

This does not mean humans must write all the code by hand. It does not mean memorizing every function.

It means keeping the system we are building in a state where humans can still reason about it.

Where might this change propagate? When an incident happens, where should we begin looking? What does this test protect, and what does it fail to protect? If everyone on the team drew the architecture, would the drawings be completely different?

It is about keeping that kind of visibility, even if only barely, near our hands.

Not only looking at individual pieces of code as trees, but trying, however imperfectly, to see the forest that includes dependencies, operations, team agreements, and user impact.

This may be the most fragile part of the AI era.

AI can write code when we ask. It can add tests. It can fix errors. That flow is useful, comfortable, and sometimes deeply reassuring.

But moving quickly and moving without losing sight are not the same thing.

If I cannot explain why I accepted a change, cannot remember what premise I gave to AI, and do not know where touching the system next might break it, then something has been lost.

When these small moments of losing sight accumulate, the system becomes less and less something we can call ours.

What matters here, I think, is not keeping AI away.

Rather, we should be able to use AI so that we do not lose sight of the system.

I also ask the same AI to explain the growing diff. I trace impact areas with it. I use it to visualize dependencies, to ask why this design exists, to think through what would become constrained if user traffic grew sharply, and to put into words what is still unknown instead of only looking at passing tests.

This also includes concrete costs such as compute and tokens. More tests do not simply mean more safety. We also have to think about the scope and cost at which that reassurance is obtained.

AI can increase the amount of code and change the relationship between review, testing, and design understanding.

At the same time, it can also become a tool for observing that change.

Which future we get depends less on AI itself than on what we are trying to see.

### AI Amplifies the Foundations

Another idea that stayed with me from the video is that AI amplifies an organization's foundations.

AI does not magically turn a weak engineering culture into a good one.

Ambiguity becomes faster while remaining ambiguous.

In a team where decision-making is unclear, artifacts may multiply while still carrying that lack of clarity. In an organization where responsibility is poorly placed, tools that no one knows how to maintain may increase. In a place with weak sensitivity to security or operations, that weakness may be amplified along with generation speed.

This is a little frightening.

But it is not only pessimistic.

If there is a culture of observation, AI can help with observation. If there is a habit of revisiting provisional arrangements, AI can make that revision faster. If a team can bring uncertainty into words instead of leaving it unknown or dropping it at someone else's feet, AI can become part of that conversation.

If there is a foundation I want to protect, it is probably there. Not leaving uncertainty lying at someone else's feet. Giving what cannot yet be decided a place to be seen again later.

In the end, what AI amplifies depends on the foundation that is already there.

That is why thinking about software development in the age of AI cannot be only a matter of tool choice.

Software development is not made only from code and tools. The way people ask each other questions, what they value in review, what they leave behind after an incident: these social structures also shape the system.

What kind of review culture do we have? What do we protect with tests, and what do we observe elsewhere? Which changes do we welcome, and which kinds of uncertainty make us pause? Who decides, when do we revisit, and where do we record it?

The faster code generation becomes, the more these quiet questions move to the foreground.

### Observing Change

AI will probably keep making code faster to generate.

I do not want to stop that flow.

If anything, I think there is still unseen possibility in shortening the distance to what we want to make. Small teams and individuals may reach places that were previously out of reach. Inconveniences that had been left alone because they were tedious may gradually be fixed. I do not want to treat such a future as only something to fear.

But this is less like a gentle tailwind than a wave already arriving at our feet.

That is why I do not want to miss where the system is beginning to change beside it.

The next time I receive a diff from AI, what should I check?

Is review becoming only a formality? Am I only looking at green tests? After accepting the change, can we still maintain it? I want to keep these questions as small habits for observing how the system is changing, not as tedious extra checks.

Practices will change. I think it is fine that they change.

But what do I consider a good system? Why do I want to protect that quality? When someone is in trouble, where can we begin thinking together?

I do not want to let those principles and responsibilities be carried away by the speed of generation.

Code is generated.

At the same time, the system also changes.

I want to hold that change as a clue for the next provisional arrangement, without fearing it too much and without pretending not to see it.

For now, that is probably the attitude I want to keep close in software development in the age of AI.

[^software-engineering-at-the-tipping-point]: Google I/O 2026, "[Software engineering at the tipping point](https://io.google/2026/explore/workshop-2)." Transcript available on [YouTube](https://www.youtube.com/watch?v=2n41YjR5QfU).
[^shopify-ai-first-engineering-playbook]: Bessemer Venture Partners, "[Inside Shopify's AI-first engineering playbook](https://www.bvp.com/atlas/inside-shopifys-ai-first-engineering-playbook)," 2026.
