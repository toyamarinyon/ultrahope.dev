---
title: What FrontierCode's Evaluation Design Teaches Us About Entrusting Work to Coding Agents
publishedAt: "2026-06-15"
---

[FrontierCode](https://cognition.ai/blog/frontier-code), published by Cognition, presents a way to evaluate Coding Agent output through the question: "Would a maintainer merge this PR?"

OSS maintainers create tasks from real repositories, and the evaluation looks not only at behavioral correctness, but also at scope, the meaning of the tests, and whether the code follows the existing design. It also checks whether the rubric would let a sloppy solution pass, or unfairly reject a valid alternative.

Previously, I wrote about how, when AI makes code faster to generate, our understanding of systems and our review practices change along with it.[^generated-code-creaking-system] At that time, I was thinking about the system as a whole: the place generated code enters.

Reading FrontierCode made me think about something a little closer to hand.

When an agent gives us a single diff, what grounds do we have for accepting it?

FrontierCode looks promising as a benchmark for Coding Agents. But beyond that, I felt there was quite a lot to take back into the way we entrust implementation work to Coding Agents.

### Beyond Passing Tests

One benchmark often referenced when evaluating Coding Agents is SWE-bench. SWE-bench uses real GitHub issues and codebases to see whether a model can generate a patch that solves the problem.[^swe-bench]

OpenAI's article introducing SWE-bench Verified explains that each SWE-bench sample has `FAIL_TO_PASS` tests, which fail before the fix and pass after it, and `PASS_TO_PASS` tests, which check that existing behavior has not been broken.[^swe-bench-verified]

This is an important evaluation.

Reading a real codebase, understanding an issue, making the necessary change, and passing tests: compared with evaluations that ask a model to write a small function, such as HumanEval, this is much closer to actual software work.

But in real code review, passing tests is not the end.

Is the scope of the change appropriate? Does it follow the existing abstraction? Do the tests actually protect the behavior at issue? Do the names and responsibilities fit the context of this repository? When someone changes this area later, will they be able to follow the assumptions?

These questions cannot be fully captured by green tests.

What I find interesting about FrontierCode is that it tries to evaluate this directly. The article says the question is no longer only whether models can write correct code, but whether they can write good code. The question about mergeability from the beginning sits around here.

### Thinking About the Conditions for Good Code

In FrontierCode, more than 20 OSS maintainers create tasks from 36 major OSS repositories. Each task takes more than 40 hours to create, and maintainers translate their own standards for a mergeable change in that repository into evaluation criteria.

The axes include behavioral correctness, regression safety, mechanical cleanliness, test correctness, scope, and code quality. Is the behavior correct? Does it avoid breaking existing behavior? Do the added tests mean something? Does the change stay within the necessary area? Does the code fit the existing design and conventions?

When I saw this list, it felt like benchmark design, but also very much like the criteria of code review.

Sometimes, when I look at a diff from an agent, my hand stops before I can write a review comment. It works. The tests pass. The explanation makes sense. But still, I pause at something like: should this helper really be added here, or should this responsibility really live in this layer?

That unease can be a little too large to dismiss as mere preference.

FrontierCode separates criteria into blockers and non-blockers. A blocker is something a maintainer would treat as a hard stop in code review: for example, failing to satisfy the specification, breaking an important performance requirement, or changing too much. Non-blockers affect the quality score, but do not necessarily prevent a merge on their own, such as style, type safety, or readability.

This distinction seems useful when working with agents, too.

When humans leave review comments, every comment can easily end up sounding like it has the same weight. "This must be fixed" and "this is mostly a preference, but I would like it cleaned up" may appear in the same tone. That is already a little hard between humans. With agents, it matters even more.

Which points are success conditions?
Which points are quality preferences?
Which points should not be touched this time?

Simply separating those can change the way the work proceeds.

Another part that felt close to my own experience was the scope evaluation.

Agents are sometimes kind.

Along with the fix I handed over, they may clean up nearby names, introduce a slightly broader abstraction, or touch files that seem related. Sometimes that is genuinely helpful.

But when I intended a small bug fix and the diff grows, it becomes harder to accept. The change needed for the task and the extra cleanup start to mix together. Even if the tests pass, the diff becomes difficult to review.

FrontierCode's scope criterion looks at things like file boundary, diff size, and semantic locality to see whether the change stays within the necessary area. This carries over almost directly to working with agents.

Do not change the public API. Do not mix in formatting-only diffs. If the scope needs to expand, talk about it first.

These constraints are not only there to restrict the agent. They are scaffolding for making a change easier to review, easier to accept, and easier to remember later.

The same is true for tests when we think about the conditions for good code.

The part of the FrontierCode article that especially stayed with me was the reverse-classical evaluation.

This runs tests added by the agent against the broken codebase before the fix, and checks whether they actually fail. If a test also passes before the fix, it may not be catching the problem at hand.

Once stated, this sounds obvious.

But when I work with an agent, I sometimes feel reassured by the report that "tests were added." The diff includes a new test file. CI passes. The explanation sounds reasonable. That alone can make me feel somewhat protected.

But whether that test truly fixes the broken behavior in place is a different question.

I can bring this back into my own work.

If I ask an agent to fix a bug, I can say from the beginning: please confirm that this test fails before the fix and passes after it. Or, when reviewing, I can check together what the added test actually catches.

There is distance between writing a test and being able to feel reassured.

I think it matters not to leave that distance entirely to the agent.

### Continuing to Cultivate Judgment Outside the Agent's Loop

The FrontierCode article gives an example involving a `LOG_WARNING()` helper for warning logs.

One model's solution looks behaviorally correct. Multi-line warnings still go to standard error. However, only the first line uses `LOG_WARNING()`, while the following lines use `std::cerr` directly. It works for now, because both go to the same stream. But if the helper changes in the future, a fragile assumption remains at the call site.

This is a change that passes tests, but would bother a maintainer.

If you create an abstraction, I want you to use that abstraction fully. I want the code to leave behind not only something that happens to work today, but also the assumptions that the next person can read from.

This feeling is also necessary when working with Coding Agents.

If I simply hand an agent the instruction "build this," I am close to being a user of the output. But if I accept the diff and will keep maintaining that code in the future, I become a small maintainer.

Even if I am not the maintainer of a large OSS project, my own repository has its own context.

What belongs in this change? Which abstraction should be used? Which test should protect it? Which discomfort should be fixed now, and which should become a separate issue?

Agents cannot fully take over these judgments. If anything, the more agents can implement, the more visible the remaining human judgment becomes.

At this point, simply saying "write better instructions" feels insufficient.

It is important to write the purpose, success conditions, and allowed scope. Harness Engineering and similar discussions often talk about this. If the information we give the agent is vague, the diff that comes back will also be vague.

But what I found interesting in FrontierCode was not only what is written before the task. It was that, after creating an evaluation, the authors question it again.

Task authors do not stop after writing the rubric. They intentionally create sloppy or hacky solutions and check whether the rubric would let them pass. They also check whether valid alternative solutions would be rejected unfairly. The article describes this as creating a hack report.

Recent Coding Agents have mechanisms such as `/loop` and `/goal` so that execution does not end after a single pass. Plan, implement, verify, and return when something fails. Designing that kind of loop is increasingly part of using agents.

But outside that loop, there is another loop.

When I see the diff an agent produced, I ask myself why I want to accept it, or why I do not. I put that discomfort into words and return it to the next set of conditions or review criteria.

The tests pass, but the code does not sit on the abstraction I expected. The change is small, but it increases the number of places that will need to change later. The specification is satisfied, but the result is hard to explain in review. When I see a diff like that, I do not want to stop at "the prompt was bad."

What exactly made me unwilling to accept this diff? Was it clear enough to write down at the beginning? Or did I only see my own judgment after looking at the diff?

I want to send that back into the next loop.

To become a small maintainer on the side that entrusts work to an agent is not to write perfect conditions from the beginning.

It is to keep cultivating the sense of judgment outside the agent's loop.

I want to keep this feeling close for a while. As I hand more work to agents, I still want to keep, on my side, the question of what I want to merge and what kind of change I can keep nurturing.

Being able to make something quickly and being able to make it in a form I can accept are slightly different things.

FrontierCode's evaluation design felt like a very good clue for not forgetting that difference.

[^swe-bench]: SWE-bench, "[SWE-bench](https://www.swebench.com/SWE-bench/)."
[^swe-bench-verified]: OpenAI, "[Introducing SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/)," 2024.
[^generated-code-creaking-system]: "[Generated Code, Transforming Systems](/writing/generated-code-creaking-system)."
