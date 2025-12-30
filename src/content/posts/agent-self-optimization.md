---
title: "Agent 自我优化：从 AFLOW 到 SPO 的探索"
date: 2025-12-30
abstract: "本文回顾了我在 Agent 自我优化领域的研究历程，从 AFLOW 的工作流优化到 SPO 的提示词自监督学习，探讨如何让 AI Agent 通过自我反馈实现持续进化。"
tags: ["Agent", "Self-Evolution", "AFLOW", "Prompt Optimization"]
author: "Jinyu Xiang"
featured: true
---

## 引言

在过去的一年中，我一直在思考一个问题：**如何让 AI Agent 像人类一样，通过经验不断优化自己的行为策略？** 这个看似简单的问题，实际上涉及到工作流设计、提示词工程、反馈机制等多个层面。

## AFLOW：将工作流优化视为搜索问题

在 AFLOW 项目中，我们提出了一个核心思想：**将 Agentic Workflow 的优化过程转化为一个代码空间的搜索问题**。

### 核心机制

传统的 Agent 工作流往往是静态的，但我们认为工作流本身应该是可以被优化的。我们使用蒙特卡洛树搜索（MCTS）在代码表示的工作流空间中探索：

$$
\text{Workflow}^* = \arg\max_{w \in \mathcal{W}} \mathbb{E}[\text{Performance}(w)]
$$

其中 $\mathcal{W}$ 是所有可能的工作流配置空间。

### 实验结果

| 数据集 | Baseline | AFLOW | 提升 |
| :--- | :--- | :--- | :--- |
| HotpotQA | 67.3% | 82.1% | +14.8% |
| GSM8K | 71.2% | 89.4% | +18.2% |
| MATH | 42.8% | 58.9% | +16.1% |

## SPO：提示词的自监督优化

AFLOW 解决了工作流层面的优化，但我们发现**提示词本身也是一个关键的优化对象**。于是有了 SPO（Self-Supervised Prompt Optimization）。

### 自我反馈循环

SPO 的核心思想是让 LLM 通过自我评估和迭代改进提示词：

```python
def spo_optimize(prompt, dataset, max_iterations=5):
    """自监督提示词优化"""
    for iteration in range(max_iterations):
        # 1. 用当前提示词生成结果
        results = generate_with_prompt(prompt, dataset)
        
        # 2. 自我评估
        feedback = self_evaluate(results, prompt)
        
        # 3. 基于反馈优化提示词
        prompt = refine_prompt(prompt, feedback)
        
    return prompt
```

### 关键洞察

我们发现，LLM 具备"元认知"能力——它能够理解什么样的提示词对自己更有效。这种能力使得自监督优化成为可能。

## OpenManus：三小时的极速实践

在 OpenManus 项目中，我们将上述理念浓缩为一个最小化的 Agent 框架。核心代码不到 200 行，却能实现复杂的任务执行。

这个项目证明了：**好的抽象远比复杂的实现更重要**。

## 未来方向

接下来我想探索的问题包括：

1. **多 Agent 协同的自我优化** - 如何让多个 Agent 通过交互共同进化？
2. **长期记忆与经验积累** - Agent 如何从历史任务中提取可复用的知识？
3. **安全约束下的优化** - 如何确保优化过程不违反安全边界？

## 结语

Agent 的自我优化不是一个单一的技术问题，而是涉及搜索、学习、推理的综合挑战。我相信，真正的 General Agent 必然具备自我进化的能力。

---

**References:**

1. Zhang, J., Xiang, J., et al. (2025). "AFLOW: Automating Agentic Workflow Generation." *ICLR 2025*.
2. Xiang, J., Zhang, J., et al. (2025). "Self-Supervised Prompt Optimization." *EMNLP 2025*.

