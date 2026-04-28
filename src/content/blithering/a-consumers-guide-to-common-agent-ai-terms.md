---
title: A consumer's guide to common agentic AI terms
description: An explanation of the terms that matter most in modern agentic systems
created: "2026-04-27T18:35:00.000Z"
pubDate: "2026-04-27T18:35:00.000Z"
author: "Śūnya"
image:
    src: "./headers/crepuscular-path.jpg"
    alt: "A path winding through dense greenery at dusk"
    aspectRatio: "16:9"
    width: 3968
    height: 2240
tags: ["Agent", "AI", "Skills"]
---

Large language models are now used for more than question answering. In many products, they plan, call tools, read files, browse the web, and keep going until a task reaches a stopping condition. A coding agent might inspect a repository, edit three files, run tests, read the failure output, and try again without waiting for a new prompt.

That shift has produced a dense vocabulary. This guide explains the terms that matter most if you want to understand, buy, or build agentic systems, using concrete examples rather than sales language.

## What is an AI agent?

The word *agent* is used loosely, so it helps to be precise. A chatbot answers the next turn. An agent pursues a goal across multiple steps, usually by deciding when to call tools and how to use their results. The difference is easy to see in practice: a normal chat model explains how to file an expense claim; an agent logs in, finds the form, uploads the receipt, and stops when the submission succeeds or requires approval.

In practice, an agent is usually a control loop wrapped around a large language model (LLM). The model proposes an action, the system executes it, the result comes back into context, and the loop continues until the task is complete or a limit is reached. In a codebase, that loop might look like: search for a function, edit it, run the test suite, read the stack trace, and revise the patch.

That distinction matters because an LLM on its own is usually stateless. It takes input and returns output. An agentic system adds some other components.

It also helps to distinguish an *agent* from a *workflow*. A workflow is a predefined sequence of steps, even if one or more steps use a model. Whereas an agent is non-deterministic.; it decides which steps are needed, in what order, and whether to branch, retry, or stop. Many real systems contain both: a workflow provides the rails, and an agent operates inside one part of it.

To move from stateless function to agent, the system has four high-level parts.

### The model

The model is the reasoning engine. It interprets the task, selects tools, and decides what to do next. A stronger model does not always mean a better agent, because the surrounding system often determines whether those decisions can be carried out safely and reliably.

### Memory

Short-term memory is the working context of the current run: the conversation, tool outputs, and any intermediate notes retained in the prompt. Long-term memory stores information outside the immediate context window so it can be retrieved later.

Long-term memory is often implemented with retrieval-augmented generation (RAG), a database, or the file system.

### The toolkit

Tools are the agent's means of acting on the world. A tool might search the web, read a repository, query a customer database, send an email, or execute code in a sandbox.

Tool design matters a lot, and it worth spending time [refining](https://agentskills.io/skill-creation/optimizing-descriptions) and [testing them](https://agentskills.io/skill-creation/evaluating-skills). Clear names, narrow scopes, strong schemas, and predictable failures make agents more reliable.

### The harness

The harness is the runtime that ties model, memory, and tools together. It manages permissions, state, retries, logs, and execution boundaries.

A good harness does four jobs. It executes actions in a controlled environment, persists state across long tasks, records what happened, and enforces security boundaries. The same model can feel very different in two harnesses because the harness determines what the model can see, do, and recover from.

Agentic work is often long-running, so the harness needs checkpoints, resumability, and a clear record of where the run currently stands. Frameworks such as LangGraph and Microsoft Agent Framework make this explicit with graph-based workflows and durable state. If step seven of a twelve-step process fails, you want to resume from step seven, not repeat the first six calls.

Equally the harness handles governance, execution control, security and observability. A serious harness logs tool calls, captures traces, scopes credentials, and enforces which files, networks, or APIs an agent may touch. If a model hallucinates a shell command, you want that mistake to die in a sandbox, not in your production filesystem as well as being able to trace back to the problem.

### General vs specialised agents

General agents are flexible, but are often expensive and hard to control and audit. A common alternative is to build specialised agents with narrower prompts, smaller toolsets, and clearer success criteria. For example, a security-review agent might need static analysis tools and dependency data; an accessibility agent might need browser automation and screenshot comparison, but nothing that can deploy code. In practice this often means a small agent file or system prompt focused on one goal, which, especially combined with Inference Time Scaling (ITS), helps the model spend its context on the task at hand rather than on generic behaviour.

This is often a better engineering trade. Specialised agents are easier to test, cheaper to run, and simpler to secure.

### Agent "swarms"

Agent swarm is an informal term, not a precise standard. In technical docs you will more often see multi-agent system, orchestrator-workers, group chat, or workflow agents.

The usual pattern is an orchestrator that decomposes the job, delegates work to workers, and then merges the results. In software work, that might mean one agent exploring the repository, another drafting a patch, and a third checking tests or reviewing the diff.

This can improve speed and separation of concerns when work decomposes cleanly into parallel or specialist tasks, but it also adds failure modes. Context has to be routed correctly, duplicated work has to be controlled, and the system needs a clear way to resolve conflicts between agents. Consequently swarms are usually worse than a single agent for well-bounded jobs.

Some platforms expose swarm orchestration explicitly. Others present the result as native multi-agent behaviour. It is still worth foregrounding what is visible: the execution graph, tool boundaries, state-sharing rules, and failure handling.

### Local, cloud, and contained harnesses

Local harnesses can be very simple, or extremely complex; safe, or  free running. They run close to the user, often on a laptop or workstation. They can be fast, private, and consummately flexible, but they inherit the security posture of the machine they run on. The range of local harnesses and types bespeaks this flexibility.  Pi, for example, is a flexible harness, designed for configurability; LangGraph or AutoGen provide powerful, enterprise grade core functionality; VS Code, Codex or Claude Code are examples of focussed local harnesses, and on the other end of the spectrum, OpenClaw is ultra open and complex, with an open architecture. Clearly, some are easier to make safe than others (see below).

Cloud harnesses such as Microsoft Foundry Agent Service or Amazon Bedrock Agents trade direct control for managed hosting, identity, tracing, and built-in tools. They are often the fastest route to enterprise deployment. They are easier to scale, easier to centralise, and often easier to observe across teams. They also raise sharper questions about credentials, data residency, network reach, and vendor lock-in.

Contained, or isolated harnesses are not a third location so much as a discipline. Whether local or cloud, mature systems isolate risky actions inside [sandboxes](https://read.engineerscodex.com/p/every-dev-should-know-about-ai-sandboxes). In practice that usually means a restricted process, container, virtual machine, or remote worker with narrow permissions.

## Configuring the Agent

Agents are not configured only by prompts. In most serious systems, behaviour emerges from several layers of configuration that differ in scope and lifetime. When people say "the prompt did it," they are often collapsing system instructions, tools, hooks, memory policy, and runtime rules into a single blurry cause. These terms are not universal. Different platforms slice the configuration stack differently. In tools such as GitHub Copilot and Claude Code, however, the distinction below is common and useful.

### Instructions

Instructions are the always-on rules of behaviour that apply across tasks and sessions. They often live in a system prompt or in repository-level files such as `AGENTS.md`. Some harnesses also support a more local override such as `.github/copilot-instructions.md`, letting a subproject or working directory carry its own rules. They usually capture stable constraints: coding standards, tone, review posture, security rules, and forbidden actions.

Because instructions stay in scope for long periods, they should be brief and specific. If they become long, repetitive, or contradictory, they waste context and weaken the policy they are meant to enforce.

### Skills

Skills are on-demand bundles of guidance, resources, and even scripts for a specific job. A good skill teaches a workflow, not just a preference. A skill might describe how to run a release, investigate a bug, or review accessibility. Unlike permanent instructions, a skill is loaded only when relevant, which keeps the default context lean while still letting the agent pick up specialised procedures when the task demands them.

That distinction matters economically as well as cognitively. Always-on instructions consume context every turn. A skill keeps specialised knowledge out of the context window until the task actually needs it.

In many systems, a skill is just a well named folder within a `.AGENTS/skills` folder with a `SKILL.md` file and any accompanying information or executable scripts it might need. Good skills are narrow, concrete, and procedural: state when to use them, what inputs they need, what tools they may call, and what a successful result looks like.

When installing third party skills, or "skill extensions", be conscious of the fact that they can execute scripts and instruct your agent. Care should be exercised, but they benefit from being very readable, so are easy to verify.

### Prompt files

Prompt files are reusable templates for recurring asks. They are less about policy and more about packaging a well-tested request so you do not rewrite it each time.

Their value is consistency and effort. A saved prompt reduces variance between runs and makes the task easier to evaluate. It is easier to compare results over time when the framing stays mostly stable.

### Hooks and human-in-the-loop (HITL)

Hooks are deterministic actions attached to events in the agent or harness lifecycle. A hook might run a formatter after an edit, block a dangerous Git command before it executes, or collect logs after a failure. The important distinction is that the hook is procedural and deterministic. If the trigger fires, the hook runs. Different harnesses expose different hooks, often things like pre-tool, post-tool, pre-commit, or approval events, and they are usually configured in the harness rather than in the prompt.

Human-in-the-loop (HITL) sits beside hooks; it is where the system pauses approval, review, or clarification steps before sensitive actions such as deployment, payment, or data deletion.

Good HITL design does not ask for approval on everything.

### Model Context Protocol (MCP)

Model Context Protocol (MCP) is an open protocol for connecting artificial intelligence applications to external systems. In practice, it standardises how an agent discovers tools, calls them, and accesses data or workflows without bespoke integrations for every client.

MCP is powerful because it turns many one-off connectors into a shared ecosystem. It also expands the attack surface, so the harness still needs authentication, scoping, and auditing.

## Model Selection and Economics

Choosing a model for agentic work is not just a question of raw benchmark scores. The operational questions are usually more important: how well the model follows tool schemas, how much context it can handle, how often it needs to retry, how quickly it responds, and what all of that costs in aggregate. A model that is brilliant but regularly emits malformed tool calls can be worse than one that is merely solid and predictable.

Inference-time compute (ITC) is part of this picture. Many providers now offer modes that spend more tokens or more latency on deliberation before acting. That can greatly improve results on hard tasks, but it also makes the loop slower and more expensive.

The right choice therefore depends on the workflow. If the task is open-ended, ambiguous, and expensive to get wrong, paying for a stronger planning layer can make sense. If the task is narrow and repeatable, a smaller model with better guardrails is often the wiser choice.

Therefore, [Orchestrator-worker designs](#agent-swarms) are common because they allocate cost and capability more carefully. A stronger model, with a high ITC can plan or review, while cheaper workers handle narrow subtasks. Frontier commercial models from Anthropic, OpenAI, and Google are common orchestrator choices. Open-weight families such as DeepSeek and Llama remain important when governance, locality, or cost make self-hosting more attractive than an external API.

Model choice notwithstanding, context strategy and deployment constraints matter as much as model choice, of which prompt caching is a concrete example. If an agent repeatedly sends the same large prefix, caching can materially reduce both latency and cost. Anthropic's documentation is particularly clear on how cache prefixes, invalidation, and time-to-live affect iterative loops. This matters when a coding agent keeps resending a long repository summary or tool schema on every turn.

The practical question is therefore: which model, in which harness, with which toolset, is good enough for this task at an acceptable cost and risk level? As a good starting point, the orchestrator-worker pattern is very powerful, but actually, you can learn a lot quickly just by trying one strong model, one cheaper model on one small, well-defined task before designing anything more elaborate.

## Further reading

- [Building effective agents (Anthropic)](https://www.anthropic.com/engineering/building-effective-agents)
- [What is the Model Context Protocol?](https://modelcontextprotocol.io/introduction)
- [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview)
- [Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/)
- [Microsoft Agent Framework workflows](https://learn.microsoft.com/en-us/agent-framework/workflows/)
- [Prompt caching (Anthropic docs)](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
- [OpenClaw gateway architecture](https://docs.openclaw.ai/concepts/architecture)
- [Pi Monorepo](https://github.com/badlogic/pi-mono)
- [Incremental AI customisation for a project](https://code.visualstudio.com/docs/copilot/guides/customize-copilot-guide)
- [Agent skills](https://agentskills.io/home)
- [Every dev should know about AI sandboxes](https://read.engineerscodex.com/p/every-dev-should-know-about-ai-sandboxes)
