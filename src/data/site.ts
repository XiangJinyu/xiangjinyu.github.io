// Single source of truth for identity/profile data.
// homepage.yaml holds timeline content; this holds who-you-are.
export const site = {
  name: 'Jinyu Xiang',
  title: 'Algorithm Researcher · Xiaomi Mimo-Core',
  roles: ['Algorithm Researcher at Xiaomi Mimo-Core', 'AI Agent Researcher', 'Musician'],
  focus: 'Research on LLM-based Agents — particularly Agent Self-Evolution and Foundation Agents.',
  url: 'https://xiangjinyu.github.io',
  email: 'xiangjy2001@gmail.com',
  links: {
    github: 'https://github.com/XiangJinyu',
    twitter: 'https://twitter.com/CosmoJinyu',
    scholar: 'https://scholar.google.com/citations?user=NJv62qoAAAAJ',
  },
} as const;
