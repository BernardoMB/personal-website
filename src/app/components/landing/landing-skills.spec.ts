import { SKILL_GROUP_DEFINITIONS, buildSkillGroups, labelForCompletion } from './landing.component';

const ENGLISH_LABELS = ['Experienced', 'Intermediate', 'Beginner'];
const SPANISH_LABELS = ['Experimentado', 'Intermedio', 'Pricipiante'];

// es2015 build target has no Array.prototype.flatMap; flatten manually.
function allSkillNames(groups: { skills: { name: string }[] }[]): string[] {
  return groups.reduce<string[]>((names, group) => names.concat(group.skills.map((skill) => skill.name)), []);
}

// Frozen by the spec's "UX Rules → Card grouping and content" section.
// Reproduced here, in authoring (not display) order, to assert set equality
// against SKILL_GROUP_DEFINITIONS without depending on sort order.
const EXPECTED_GROUPS: { titleKey: string; names: string[] }[] = [
  {
    titleKey: 'LANDING.SKILLS_GROUP_AI',
    names: [
      'Python',
      'TensorFlow / PyTorch',
      'LangChain / LangGraph',
      'AutoGen / CrewAI',
      'RAG',
      'Agentic Development',
      'OpenAI API / Anthropic Claude API',
      'OpenAI Function Calling / MCP',
      'Diffusion models / Generative Agents',
      'Unreal Engine for AI',
    ],
  },
  {
    titleKey: 'LANDING.SKILLS_GROUP_INFRA',
    names: [
      'Vertex AI / Azure ML / AWS SageMaker',
      'Kubernetes (K8s)',
      'Docker',
      'CI/CD pipelines',
      'Terraform / Pulumi',
      'Prometheus / Grafana',
      'vLLM / Triton',
      'CUDA / NVIDIA Triton Inference Server',
      'Distributed training frameworks',
      'Kafka / Pub/Sub / RabbitMQ',
    ],
  },
  {
    titleKey: 'LANDING.SKILLS_GROUP_FULLSTACK',
    names: [
      'Next.js / React',
      'FastAPI / Flask',
      'GraphQL',
      'SQL + NoSQL + Redis',
      'Data pipelines',
      'ETL tools',
      'Snowflake / BigQuery',
      'Playwright / Cypress',
      'Unit + Integration Testing',
      'OAuth2 / JWT',
    ],
  },
];

describe('SKILL_GROUP_DEFINITIONS', () => {
  it('has exactly three groups', () => {
    expect(SKILL_GROUP_DEFINITIONS.length).toBe(3);
  });

  it('has exactly ten entries per group', () => {
    SKILL_GROUP_DEFINITIONS.forEach((group) => {
      expect(group.skills.length).toBe(10);
    });
  });

  it('has thirty unique technology names across all groups', () => {
    const allNames = allSkillNames(SKILL_GROUP_DEFINITIONS);
    expect(allNames.length).toBe(30);
    expect(new Set(allNames).size).toBe(30);
  });

  it('matches the frozen spec grouping exactly (set equality per card)', () => {
    EXPECTED_GROUPS.forEach((expectedGroup) => {
      const actualGroup = SKILL_GROUP_DEFINITIONS.find((group) => group.titleKey === expectedGroup.titleKey);
      expect(actualGroup).toBeDefined();
      const actualNames = new Set((actualGroup as { skills: { name: string }[] }).skills.map((skill) => skill.name));
      const expectedNames = new Set(expectedGroup.names);
      expect(actualNames).toEqual(expectedNames);
    });
  });

  it('has no technology appearing in more than one card', () => {
    const allNames = allSkillNames(SKILL_GROUP_DEFINITIONS);
    const seen = new Set<string>();
    allNames.forEach((name) => {
      expect(seen.has(name)).toBe(false);
      seen.add(name);
    });
  });

  it('has no standalone Redis entry — Redis appears only inside "SQL + NoSQL + Redis"', () => {
    const allNames = allSkillNames(SKILL_GROUP_DEFINITIONS);
    expect(allNames).toContain('SQL + NoSQL + Redis');
    expect(allNames).not.toContain('Redis');
  });

  it('has every completion value as a whole number between 40 and 95 inclusive', () => {
    SKILL_GROUP_DEFINITIONS.forEach((group) => {
      group.skills.forEach((skill) => {
        expect(Number.isInteger(skill.completion)).toBe(true);
        expect(skill.completion).toBeGreaterThanOrEqual(40);
        expect(skill.completion).toBeLessThanOrEqual(95);
      });
    });
  });
});

describe('labelForCompletion', () => {
  it('returns the top-tier label at and above 70', () => {
    expect(labelForCompletion(70, ENGLISH_LABELS)).toBe('Experienced');
    expect(labelForCompletion(95, ENGLISH_LABELS)).toBe('Experienced');
  });

  it('returns the middle-tier label from 55 to 69', () => {
    expect(labelForCompletion(69, ENGLISH_LABELS)).toBe('Intermediate');
    expect(labelForCompletion(55, ENGLISH_LABELS)).toBe('Intermediate');
  });

  it('returns the entry-tier label below 55', () => {
    expect(labelForCompletion(54, ENGLISH_LABELS)).toBe('Beginner');
    expect(labelForCompletion(40, ENGLISH_LABELS)).toBe('Beginner');
  });

  it('works with the Spanish label array', () => {
    expect(labelForCompletion(70, SPANISH_LABELS)).toBe('Experimentado');
    expect(labelForCompletion(69, SPANISH_LABELS)).toBe('Intermedio');
    expect(labelForCompletion(54, SPANISH_LABELS)).toBe('Pricipiante');
  });
});

describe('buildSkillGroups', () => {
  it('returns three groups of ten entries each', () => {
    const groups = buildSkillGroups(ENGLISH_LABELS);
    expect(groups.length).toBe(3);
    groups.forEach((group) => {
      expect(group.skills.length).toBe(10);
    });
  });

  it('sorts every group by descending completion (never increasing top to bottom)', () => {
    const groups = buildSkillGroups(ENGLISH_LABELS);
    groups.forEach((group) => {
      for (let i = 1; i < group.skills.length; i++) {
        expect(group.skills[i].completion).toBeLessThanOrEqual(group.skills[i - 1].completion);
      }
    });
  });

  it('assigns a label to every entry that agrees with its completion band', () => {
    const groups = buildSkillGroups(ENGLISH_LABELS);
    groups.forEach((group) => {
      group.skills.forEach((skill) => {
        expect(skill.label).toBe(labelForCompletion(skill.completion, ENGLISH_LABELS));
      });
    });
  });

  it('changes only labels when built with a different language, leaving names and completions identical', () => {
    const englishGroups = buildSkillGroups(ENGLISH_LABELS);
    const spanishGroups = buildSkillGroups(SPANISH_LABELS);

    expect(spanishGroups.length).toBe(englishGroups.length);
    spanishGroups.forEach((spanishGroup, groupIndex) => {
      const englishGroup = englishGroups[groupIndex];
      expect(spanishGroup.titleKey).toBe(englishGroup.titleKey);
      expect(spanishGroup.skills.length).toBe(englishGroup.skills.length);
      spanishGroup.skills.forEach((spanishSkill, skillIndex) => {
        const englishSkill = englishGroup.skills[skillIndex];
        expect(spanishSkill.name).toBe(englishSkill.name);
        expect(spanishSkill.completion).toBe(englishSkill.completion);
        expect(spanishSkill.label).not.toBe(englishSkill.label);
      });
    });
  });

  it('produces an identical shape (order and values) across repeated calls for the same language (idempotent)', () => {
    const first = buildSkillGroups(ENGLISH_LABELS);
    const second = buildSkillGroups(ENGLISH_LABELS);
    expect(second).toEqual(first);
  });
});
