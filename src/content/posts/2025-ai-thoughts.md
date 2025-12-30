---
title: "End-of-2025 Reflections: Thoughts on Agents"
date: 2025-12-31
abstract: "An end-of-year reflection centered on Agent Learning/Evolving, methodologies for AI products, industry competition and long-term moats, and how people rewire “rewards” amid uncertainty."
tags: ["Agent"]
author: "Jinyu Xiang"
featured: true
---

# Introduction

I’ve been all-in on building a startup for half a year now. While deeply involved in product iteration, I’ve also stayed on the front lines of Research, tracking everyone’s work and leading the team to explore a few directions. Along the way I recorded many scattered thoughts; at year’s end I organized them a bit. They may not all be right, but I’ll write them down first and see.

> **TL;DR**
> - **For Agents, "what to learn" matters more than "how to learn"**: a lot of work is racing on Pipelines, but what matters more is distilling meta-capabilities that generalize across tasks, rather than overfitting to rules.
> - **Humans are not reviewers, but part of the environment**: Learning from Human can be seen as a special case of Learning from a Dynamic Environment; product interaction itself is shaping the world.
> - **"Learning" and "execution" are recursively isomorphic**: the optimizer observes the executor’s trajectories and outputs parameter updates, following the same ReAct paradigm—learning tasks and doing tasks are essentially isomorphic.
> - **Budget is a product variable**: from 1 to 100+ steps/cost/latency determines the Agent’s behavior patterns; the same need should have different solutions under different budgets.
> - **Long-term moats come from meta-capabilities and iteration loops**: as models become public infrastructure, the key competition is in the "capability to manufacture capabilities" (bootstrapping, speed, innovation pipelines).

## I. Thoughts on Agents

### What is AI actually learning?

When we talk about Agent Learning, people often get obsessed with building all kinds of complex Pipelines, designing ingenious feedback mechanisms, trying to squeeze value out of the Agent’s previous trajectories. This is the "How" layer, and also the most intensely competed area in Research right now.

But few people stop and think: **what is the Agent actually learning?**

Is it rote-memorizing rules in a particular environment (Overfitting to rules), or is it truly extracting **meta-capabilities (Meta-Capability)** from these trajectories that can generalize across tasks?

In the past we often discussed **Learning from Env** and **Learning from Human** separately. But this dichotomy may be an artificial split.

When we define the product as infrastructure (Infra), every click, every piece of feedback, every preference signal from users is shaping, in real time, the "world" the Agent lives in. In this sense, **users are essentially part of the environment (Environment)**—they are the most active and most uncertain environmental variables in the system.

Therefore, Learning from Human is actually a special case of Learning from a Dynamic Environment—except that this environmental variable happens to be humans.

An even further question is: **why learn these things?** When we build datasets and design reward functions, we are essentially defining the Agent’s values and the boundary of its capabilities. If the "What" (learning objective) itself is biased, then no matter how perfect the "How" (learning method) is, it can only make the Agent run farther and farther down the wrong road.

### Less is more

In the design of Agents and algorithms, I’ve seen a lot of work piling on complexity—designing intricate Multi-Agent topologies, constructing long Workflows, as if the more complex the structure, the stronger the performance.

But my view has remained the same: **a truly robust complex system often "grows" (Emergence) out of an extremely simple structure, rather than being stacked up through preconceived complexity.**

Of course, this is not an absolute dogma—mature engineering systems like operating systems and databases are often the product of careful design. But for Agents at the current stage, our understanding of the task space and interaction patterns is still far from mature; hard-coding complex structures too early will instead limit the system’s adaptability.

Therefore, we shouldn’t try to dictate all interaction paths from a god’s-eye view at the very beginning. Pre-assumed complex structures often bring fragility, not linear gains in performance. In the exploration stage, letting simple rules evolve into complex behaviors—that is the pragmatic way to design Agent systems.

### Designing an Agent’s Budget

We can understand a Chatbot as a special Agent with a Budget of 1 step: it only has one chance to respond, and its action space is limited to text generation.

A general Agent, however, may have Max Steps (Budget) of 100 steps or even more. Different Budgets directly determine the depth and breadth of task execution (the difference is quality, time, cost).

We put too much emphasis on an Agent "being able to do infinite steps," but we overlook that from a product-design perspective, between 1 and infinity there are so many intermediate Budget states. For the same Query (e.g., "I want a market research report"), the user’s implicit need might be "I’m in a hurry, give me an overview" (Low Budget), or "I’m not in a hurry, I want the deepest digging" (High Budget). Agent products need to understand this implicit resource constraint, and the Agent should be able to produce different behavior patterns under different Budgets.

### The finiteness and discreteness of Agents

From a physics perspective, current Agents face two fundamental constraints: **finite space (Context)** and **discrete time (Discrete Steps)**.

1.  **The finiteness of memory (Space Limit)**: no matter how the Context Window expands, the Agent still lacks a true long-term memory mechanism. This makes it currently mainly suitable for one-off, stateless tasks. When facing scenarios that require long-term context accumulation or complex state maintenance, even the most advanced models can seem powerless.
2.  **The discreteness of perception (Time Discreteness)**: the Agent’s perception is not a continuous stream, but a set of discrete Tokens or Screenshot. This becomes especially obvious in GUI operations or real-time interactions. If the speed at which a page updates dynamically exceeds the Agent’s "frame rate" (time step length), it will lose key information and may even hallucinate.

### Agents that traverse space and time

When designing Agent products, there are two important points worth paying attention to:

1.  **Traverse space**: let the Agent flow freely across different domains, different databases, and different software ecosystems, breaking down information silos. This is where most Agent products are focusing today (Tool Use & Integration).
2.  **Traverse time**: give the Agent long-horizon causal reasoning capabilities. For example, what result will a decision the Agent makes today produce one month later? Can the Agent use this delayed feedback (Delayed Feedback) to revise its strategy from a month ago?

Most Agents today focus only on the "traversing space" part, busy integrating various APIs. But an Agent that "traverses time" can track causality over long spans and optimize over long cycles.

### Theoretical model: the recursive isomorphism of Agent Learning

We can try to formalize the learning process of an Agent as a **recursive isomorphism (Recursive Isomorphism)** structure. That is: **"learning" itself is also a process in which an Agent solves problems**.

Under this framework, the optimizer (Optimizer) and the executor (Executor) follow exactly the same operating pattern: the **Observation $\to$ Action** loop. The only difference is the "data types" they process.

We can define a generic Agent policy function $\pi$, at level $k$:

$$
A_k = \pi_k(O_k; \theta_k)
$$

This structure can unfold infinitely like Russian nesting dolls:

1.  **Level 0 (Execution Layer)**：
    -   **Goal**：solve specific tasks (e.g., writing code, booking tickets).
    -   **Observation ($O_0$)**：the concrete task environment, user instructions, API returns.
    -   **Action ($A_0$)**：generate text, call tools.
    -   **Parameters ($\theta_0$)**：Prompt, Context, Tools.

2.  **Level 1 (Optimization Layer)**：
    -   **Goal**：optimize the performance of the Level 0 Agent.
    -   **Observation ($O_1$)**：the Level 0 Agent’s **test-run results** (Trajectories), error logs, evaluation scores.
    -   **Action ($A_1$)**：**modify $\theta_0$** (optimize Prompt, adjust toolsets, inject new cases) and **launch new experiments**.
    -   **Parameters ($\theta_1$)**：optimization strategy (Meta-Prompt), reflection logic.

3.  **Level N (Meta-Optimization Layer)**：
    -   **Goal**：optimize the learning efficiency of the Level $N-1$ Agent.
    -   **Observation ($O_N$)**：the optimization history and improvement curve of Level $N-1$.
    -   **Action ($A_N$)**：**modify $\theta_{N-1}$** (e.g., adjusting the strategy of "how to modify Prompt").

We can express this recursive relationship in a pseudo-formal way (note: this is more of a conceptual analogy than a strict mathematical definition):

$$
\begin{cases}
O_{k+1} \leftarrow \text{History}(\pi_k) & \text{// the higher-level observation is the lower-level history} \\
A_{k+1} \to \text{Update}(\theta_k) & \text{// the higher-level action is updating the lower-level parameters}
\end{cases}
$$

Here $\text{History}(\cdot)$ denotes some aggregation or summary of the lower-level Agent’s execution trajectories, and $\text{Update}(\cdot)$ denotes the operation of modifying lower-level parameters. The value of this perspective is that it unifies the paradigms of **"doing tasks"** and **"learning tasks"**. Although under current compute constraints, higher-order terms ($k \geq 2$) of optimization are extremely expensive and have diminishing returns.

### Abstract view: the essence of an Agent is a universal translator

The essence of an Agent can be abstracted as a **general-purpose translator** across different modalities.

Although AI technology looks dazzling, the entities we deal with are actually limited: **Text (words), Audio (audio), Image (images), Code (code), Video (video), File (files)** ...

Many AI products that impress us are just recombinations of conversions among these entities:
- **ChatGPT**：Text → Text
- **Cursor**：Text → Code
- **Nano-Banana**：Text → Image
- **Veo3**：Text → Video
- **DeepWiki**：Code → Text
- **Manus**: Text → File

Process-wise, the vast majority of Agent products follow a shared paradigm: **Language → Action (Code)**. Language (the user’s intent) is translated into code, and the code—once executed—produces real interactions with the physical/digital world.

**By combining these conversions of “language” with each other, under some subtle conditions, entirely new product forms may be born.**

### A cluster view: recursion, activation, and the coordination tax of Multi-Agent

Although the initial architecture should remain concise, Multi-Agent System (MAS) still has value. The key is understanding **how it works and when it works**, and its core lies in **recursion (Recursion)** and **activation (Activation)**.

1.  **Recursion (Recursion)**: this is the extreme extension of "Budget". If a Main Agent’s capability ceiling is 30 steps (Step), then by calling a Sub-Agent (also with 30-step capability), we can theoretically expand the task-execution depth to $30 \times 30 = 900$ steps. A three-layer structure can even continue to recurse into $30 \times 30 \times 30$. The reason deeper recursion has not been applied at scale is not that it is theoretically impossible, but that it is constrained by multiple realities: the model’s Context and stability are insufficient to support such long-range causal chains; a large number of external data sources and tool ecosystems have not been effectively connected; the latency and cost brought by long-chain execution are hard to accept commercially; and the difficulty of debugging and interpretability makes production deployment too risky.
2.  **Activation (Activation)**: this enhances “professionalism”. By injecting specific System Prompt, Context, and Action Space (toolset) into a Sub-Agent, or loading different fine-tuned weights, we are effectively “activating” a domain expert.

However, MAS also introduces a non-negligible **coordination tax (Coordination Tax)**.

The coordination tax refers to the cost (tokens, time, precision) consumed when Agents pass information, align intent, and wait for responses.

- **Hierarchical structure (Hierarchical)**: if we adopt a tree structure of superiors and subordinates, each Agent communicates only with its direct superior/subordinate. The number of communications per task is related to the depth of the tree, and overall complexity is controllable.
- **Mesh / all-to-all structure (Mesh/All-to-All)**: if $n$ Agents are allowed to freely talk pairwise, the number of potential communication channels grows to $O(n^2)$, and coordination costs rise sharply.

Excessive coordination tax often throws the system into chaos and inefficiency. Therefore, **balancing "recursion gains" and "coordination tax" in architecture design is the key to designing an efficient MAS.**

## II. Thoughts on Products

### Full-stack sensitivity

Designing an excellent AI product requires having two kinds of sensitivities at the same time:
- **Sensitive to humans**: design good interactions, understand human weaknesses and needs.
- **Sensitive to machines**: design good AI, understand the boundaries of models and the essence of capabilities.

Only by being sensitive to both can you find the perfect balance between technology and human nature.

### Product definition is user-segment selection

In the AI era, the role of product definition is amplified: **it is essentially doing “pre-screening” of user groups**.

If you define a Coding Agent, your users are likely to have some understanding of AI and not be complete beginners in code logic. The data these users bring is structured, and the feedback is precise. But if you define a general-purpose product like a General Agent, you will face user profiles of all kinds and uneven levels of knowledge.

**What you define your product as determines what kind of users you get, and then what kind of data and feedback you get.** The initial direction of this data flywheel is often already decided at the moment the product is defined. For teams that hope to iterate models through user data, this is crucial.

### Agent products and open-world game design

If someone asks me how Agent products should be designed, I would recommend they study **Red Dead Redemption 2** and **Outer Wilds**.

These two games perfectly show how **open worlds (Agentic Exploration)** and **story-driven content (Workflow/SOP)** can be organically combined.
- In Red Dead Redemption 2, the main storyline provides strong guidance (Workflow), but players have extremely high freedom outside missions: they can interact with the environment and trigger random events (Agentic).
- Outer Wilds goes a step further: knowledge itself is the guidance, and information gained through exploration naturally drives the planning of the next actions.

Building Agent products is astonishingly similar to building open-world games. The term "open world" is a double entendre here: for the Agent, it needs sufficient freedom of exploration within the given Action Space, rather than being constrained by rigid SOPs; for the user, the experience of using the product itself should also resemble an open-world game—there is a main quest guiding direction, and there is also room for free exploration. Workflows guarantee the lower bound, the Agent’s adaptability creates surprises, and the user’s autonomy determines the upper bound of the experience.

### From MVC to Agent-Centric architecture

Traditional MVC architecture is being reconstructed.

- **Controller -> Agent Core**: the previously passive, hard-coded controller is being replaced by an intelligent “brain” that can plan autonomously and call tools.
- **Model -> Capabilities**: the model layer is no longer just data storage; it evolves into a toolset (Tools) that provides capabilities and data.
- **View -> Generative Interface**: the view layer is undergoing the most radical change. It is no longer static UI rendering, but evolves into a **Generative Interface (generative interaction interface)**, where the interface is fluid and dynamically generated based on the Agent’s intent and the user’s immediate needs, and different teams are trying different approaches to such interactions.

### A game between two kinds of “product managers”

In the AI field, I have observed an interesting dual product-design perspective:
- **Product managers** design products for **users** (UI/UX, features, scenarios).
- **Algorithm/Researchers** design products for **models**.

These two “products” actually constrain and align with each other. Great product experience needs model capabilities to support it, while the release of model capabilities is constrained by the form of product interaction.

If product managers don’t understand model boundaries, the features they design become castles in the air; if algorithms don’t understand user scenarios, the models/agents they optimize become ivory-tower work.

### Judging whether a task is suitable for AI

1.  **Hard for Humans (a burden for humans)**: the "hard" here refers not only to intellectual difficulty, but also **tediousness, repetition, and time consumption**. Many successful AI applications (such as email classification, speech-to-text, batch image processing) do exactly what "humans find easy but don’t want to do"—easy but high-volume, repetitive, and boring. Such tasks are also high-value territory for AI, because they free up human time and attention.
2.  **Digital (high degree of digitization)**: the inputs and outputs of the task must be digital, or easily digitized. This is the physical prerequisite for AI to intervene.
3.  **Data Easy to Get or Create (data is easy to obtain or create)**: this is the nourishment for AI learning. Without data, even the strongest model has nothing to cook with.

When evaluating a new AI idea, I repeatedly use this ruler: are we building a product where "humans neither find it hard nor find it annoying," or one that "heavily depends on the physical world," or one with "extreme data scarcity"? If so, it is probably a dead end.

### The behavior design formula for AI products: B = MAP

Borrowing BJ Fogg’s behavior model (Fogg Behavior Model), I believe AI product design also follows the formula $B = MAP$:
**Behavior (behavior) = Motivation (motivation) × Ability (ability) × Prompt (prompt)**

1.  **Motivation (user motivation)**: why does the user want to use your AI at this moment? Is it to fix an urgent Bug (high motivation), or just to kill time and chat a bit (low motivation)? AI products often fall into the trap of “showing off,” while ignoring the user’s most basic motivations—saving effort, saving time, or getting emotional comfort.
2.  **Ability (user ability)**: this corresponds to **simplicity (Simplicity)**. Many AI products currently demand too much from users (e.g., requiring complex Prompts). A great product should **grant users ability**, not **consume users’ ability**. If using your product requires users to first study a “prompt engineering guide,” then Ability is too low. Ideally, lower the operational threshold to near zero, so users feel they have become stronger.
3.  **Prompt (product prompt)**: the guidance, buttons, or notifications the product provides at the right moment (Context), reminding users “you can use AI to solve this problem now.”

The task of an AI product manager is: when Motivation (M) is sufficient, maximize users’ Ability (A), and provide precise Prompts (P) to trigger the behavior.

## III. Thoughts on the Industry

### The real moat: meta-capabilities

In this era, AI products heavily depend on foundation models. And foundation models are becoming a kind of public infrastructure (Utility)—like electricity and the internet: everyone can access them, everyone can use them.

When all teams can call into the same level of underlying intelligence, a lead in a single feature may only take a few weeks to be caught up. **The moat is no longer a product’s current feature, but the "meta-capability of manufacturing that capability."**

Here, "meta-capability" refers to whether the Agent a team builds can in turn be used for the team’s internal iteration process—for example, using their own Agent to speed up their product development, analyze competitors and papers. When an Agent becomes a tool that assists the evolution of one’s own product, it forms a self-reinforcing positive feedback loop—using AI to build AI. This also, of course, refers to the team members’ own speed of communication and iteration.

For early-stage AI startups, **speed is the moat**. In the window before giants react, whoever can more quickly turn Insight into Product Features, and more quickly complete the data loop through user feedback, can seize mindshare and build a data moat first, surviving in the cracks.

### Iterating a civilization, not an individual

When we evaluate an LLM, we often focus on individual performance: was this answer accurate? Was that Case solved next time? This view treats AI as “a person.”

But if we zoom out, a successful AI product has massive users, and tens of thousands of Agent instances interact with users, learn, and trial-and-error in parallel timelines. At that point, what we face is no longer a single agent, but an evolving **digital civilization**.

**To iterate an AI system, focus on the evolutionary trend of the whole population.** 

Individuals often pursue extreme performance on specific tasks (Overfitting), while the key to population evolution is **generalization (Generalization)** and **transfer (Transfer)**. What we need to think about is:
- How can the experience an Agent learns in task A be abstracted and transferred to a completely different task B?
- How can knowledge in the system be accumulated and shared like civilizational inheritance, rather than dissipating when a session ends?
- How can we design mechanisms so that this “civilization” automatically emerges higher intelligence from massive interactions, instead of relying on engineers to manually patch every Bug?

### Startup survival in the cracks: finding a new balance of compute

AI startups are in an awkward “in-between”:
- **Move toward the model layer (Model Layer)**: the deeper you go, the more you face a head-on fight with tech giants (Google, OpenAI, Meta) in compute, data, and talent. This is a capital-intensive game.
- **Move toward the workflow layer (Workflow Layer)**: the higher you go, the more you resemble a traditional SaaS. While avoiding the giants’ direct firepower, you fall into incumbent competition with mature software vendors, and AI’s added value is easily diluted.

To survive in the cracks, it’s not only necessary to find a unique niche; more importantly, it’s necessary to find a new balance between **Offline (offline) and Online (online) compute**.

We are used to equating Offline Compute with Training, and Online Compute with Inference. But for Agent products, this division is too narrow.

**Shift the online compute pressure to offline**, using large amounts of offline compute to buy an ultimate online experience. This “time arbitrage of compute” may be a shortcut for startups to build differentiated experiences.

## IV. Thoughts on People

### Fact vs. Truth: the dilemma of preferences

Jensen Huang asked Sam Altman a profound question mid-year: **"Fact is what is. Truth is what it means."**

AI can easily learn and memorize massive Facts, but Truth (truth/meaning) is often subjective; it depends on perspective, culture, values, and background.

Most open-ended questions have no absolute Reward. Instagram users’ preferences and X (Twitter) users’ preferences are completely different; even for the same user, preferences may drift from last month to next month.

This means **building a truly universal Reward Model is almost impossible**. Aligning specific values is essentially capturing and adapting to the preferences of the target user group.

### The gradient of reward and the religion within

What people pursue is often not the absolute value of Reward (e.g., 100 yuan), but the **gradient of Reward** (the sense of growth from having no money to having money). It is exactly this sense of hope (Hope) that “things are getting better,” i.e., **the n-th derivative of the Reward Function being positive**, that drives humans forward.

We can use an **intuitive analogy** (rather than a strict mathematical model) to describe this "sense of hope":

$$
\text{Hope}(t) \sim w_1 \frac{dR}{dt} + w_2 \frac{d^2R}{dt^2} + \cdots
$$

Here $R(t)$ is the current Reward state, and $w_n$ are decreasing weight coefficients (ensuring the influence of higher-order terms gradually decays). This expression is meant to illustrate: what we are truly obsessed with is often not $R(t)$ itself, but its trend of change—the superposition of positive signals such as the first derivative (growth rate), the second derivative (acceleration), and so on.

However, growth in the physical world always has limits. When growth slows down or even stagnates (the gradient returns to zero), people feel pain and confusion.

At that time, humans often save themselves in two ways:
1.  **Rewiring the Reward Function (Rewiring Reward Function)**: proactively revise the objective variable (Objective Variable) being optimized. Rather than simply pursuing indicators in the external physical world with diminishing marginal returns (such as money), shift the value anchor to spiritual or moral dimensions. For example, Stoicism (Stoicism) re-encodes uncontrollable negative feedback (pain) from the outside world into a positive value signal (tempering) through cognitive reframing (Cognitive Reframing), thereby achieving the self-consistency and robustness of the Reward mechanism.
2.  **Exploring inward (Latent Space Exploration)**: no longer rely on sparse feedback from the physical world, but turn inward to find satisfaction in the Latent Space of the spiritual world. By roaming and recombining within some high-dimensional feature space, construct an endless stream of intrinsic rewards (Intrinsic Reward).

From a computational perspective, this may explain the inevitability of the evolution of religion and philosophy: **they construct an optimization objective with an Infinite Horizon, and build a feedback mechanism in Latent Space that can continuously generate Dense Intrinsic Reward (dense intrinsic reward).**

# Conclusion

In the first half of 2025, whether it was LLM progress in the RL direction or the concentrated explosion of Agent products, industry sentiment was pushed to a high. In the second half, there were not many fresh product definitions, and Research was more about extending and engineering the first-half directions. What will 2026 be like? I’m looking forward to it, and I’m worried.

