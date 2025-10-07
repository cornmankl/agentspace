import { TaskPriority } from '@agentspace/types';

export interface PromptTemplate {
  id: string;
  category: string;
  icon: string;
  title: string;
  description: string;
  taskName: string;
  taskDescription: string;
  priority: TaskPriority;
  capabilities: string[];
  input: Record<string, any>;
}

export const promptCategories = {
  analysis: {
    name: 'Data Analysis',
    icon: '📊',
    color: '#3b82f6'
  },
  development: {
    name: 'Development',
    icon: '💻',
    color: '#8b5cf6'
  },
  content: {
    name: 'Content Creation',
    icon: '✍️',
    color: '#ec4899'
  },
  automation: {
    name: 'Automation',
    icon: '⚡',
    color: '#f59e0b'
  },
  quality: {
    name: 'Quality Assurance',
    icon: '✅',
    color: '#10b981'
  }
};

export const promptTemplates: PromptTemplate[] = [
  // Data Analysis
  {
    id: 'analyze-sales',
    category: 'analysis',
    icon: '📈',
    title: 'Analyze Sales Data',
    description: 'Comprehensive sales data analysis with insights',
    taskName: 'Analyze Sales Performance',
    taskDescription: 'Perform detailed analysis of sales data, identify trends, patterns, and generate actionable insights',
    priority: TaskPriority.HIGH,
    capabilities: ['data-analysis', 'reporting', 'statistics'],
    input: {
      dataType: 'sales',
      analysisType: 'comprehensive',
      outputFormat: 'report'
    }
  },
  {
    id: 'generate-report',
    category: 'analysis',
    icon: '📋',
    title: 'Generate Performance Report',
    description: 'Create detailed performance metrics report',
    taskName: 'Generate Performance Report',
    taskDescription: 'Compile and analyze performance metrics, create comprehensive report with visualizations',
    priority: TaskPriority.MEDIUM,
    capabilities: ['reporting', 'data-analysis', 'visualization'],
    input: {
      reportType: 'performance',
      period: 'monthly',
      includeCharts: true
    }
  },
  {
    id: 'customer-insights',
    category: 'analysis',
    icon: '👥',
    title: 'Customer Behavior Analysis',
    description: 'Analyze customer behavior patterns and trends',
    taskName: 'Analyze Customer Behavior',
    taskDescription: 'Study customer behavior patterns, identify trends, segment customers, and provide recommendations',
    priority: TaskPriority.HIGH,
    capabilities: ['data-analysis', 'customer-insights', 'segmentation'],
    input: {
      analysisType: 'behavior',
      includeSegmentation: true
    }
  },

  // Development
  {
    id: 'build-api',
    category: 'development',
    icon: '🔌',
    title: 'Build REST API',
    description: 'Create RESTful API with authentication',
    taskName: 'Build REST API Endpoint',
    taskDescription: 'Design and implement RESTful API with proper authentication, validation, and error handling',
    priority: TaskPriority.CRITICAL,
    capabilities: ['coding', 'api-development', 'backend'],
    input: {
      framework: 'Express',
      authentication: 'JWT',
      database: 'PostgreSQL'
    }
  },
  {
    id: 'debug-issue',
    category: 'development',
    icon: '🐛',
    title: 'Debug & Fix Issue',
    description: 'Identify and resolve code issues',
    taskName: 'Debug Application Issue',
    taskDescription: 'Investigate bug reports, identify root cause, implement fix, and test thoroughly',
    priority: TaskPriority.CRITICAL,
    capabilities: ['debugging', 'testing', 'problem-solving'],
    input: {
      issueType: 'bug',
      severity: 'high',
      affectedArea: 'production'
    }
  },
  {
    id: 'optimize-performance',
    category: 'development',
    icon: '⚡',
    title: 'Optimize Performance',
    description: 'Improve application speed and efficiency',
    taskName: 'Optimize Application Performance',
    taskDescription: 'Profile application, identify bottlenecks, implement optimizations, and measure improvements',
    priority: TaskPriority.HIGH,
    capabilities: ['optimization', 'performance-tuning', 'profiling'],
    input: {
      targetArea: 'backend',
      metrics: ['response-time', 'memory', 'cpu']
    }
  },
  {
    id: 'write-tests',
    category: 'development',
    icon: '🧪',
    title: 'Write Unit Tests',
    description: 'Create comprehensive test coverage',
    taskName: 'Write Unit Tests',
    taskDescription: 'Develop comprehensive unit tests with good coverage, edge cases, and documentation',
    priority: TaskPriority.MEDIUM,
    capabilities: ['testing', 'quality-assurance', 'coding'],
    input: {
      testFramework: 'Jest',
      targetCoverage: '80%',
      includeEdgeCases: true
    }
  },

  // Content Creation
  {
    id: 'write-blog',
    category: 'content',
    icon: '📝',
    title: 'Write Blog Post',
    description: 'Create engaging blog content',
    taskName: 'Write Blog Post',
    taskDescription: 'Research topic, write engaging blog post with SEO optimization, proper formatting, and images',
    priority: TaskPriority.MEDIUM,
    capabilities: ['writing', 'content-creation', 'seo'],
    input: {
      wordCount: 1500,
      tone: 'professional',
      includeSEO: true
    }
  },
  {
    id: 'create-documentation',
    category: 'content',
    icon: '📚',
    title: 'Create Documentation',
    description: 'Write technical documentation',
    taskName: 'Create Technical Documentation',
    taskDescription: 'Write clear, comprehensive technical documentation with examples, diagrams, and best practices',
    priority: TaskPriority.HIGH,
    capabilities: ['documentation', 'technical-writing', 'editing'],
    input: {
      docType: 'technical',
      includeExamples: true,
      format: 'markdown'
    }
  },
  {
    id: 'social-content',
    category: 'content',
    icon: '📱',
    title: 'Create Social Media Content',
    description: 'Generate engaging social media posts',
    taskName: 'Create Social Media Content',
    taskDescription: 'Create engaging social media posts for multiple platforms with hashtags and scheduling',
    priority: TaskPriority.LOW,
    capabilities: ['content-creation', 'social-media', 'copywriting'],
    input: {
      platforms: ['Twitter', 'LinkedIn', 'Instagram'],
      postCount: 5
    }
  },

  // Automation
  {
    id: 'automate-workflow',
    category: 'automation',
    icon: '🔄',
    title: 'Automate Workflow',
    description: 'Create automation for repetitive tasks',
    taskName: 'Automate Workflow Process',
    taskDescription: 'Design and implement automation for repetitive workflow, including error handling and monitoring',
    priority: TaskPriority.HIGH,
    capabilities: ['automation', 'scripting', 'workflow-design'],
    input: {
      workflowType: 'data-processing',
      tools: ['Python', 'cron'],
      monitoring: true
    }
  },
  {
    id: 'data-pipeline',
    category: 'automation',
    icon: '🔗',
    title: 'Build Data Pipeline',
    description: 'Create automated data processing pipeline',
    taskName: 'Build Data Processing Pipeline',
    taskDescription: 'Design and implement automated data pipeline with ETL processes, validation, and monitoring',
    priority: TaskPriority.CRITICAL,
    capabilities: ['data-engineering', 'automation', 'etl'],
    input: {
      source: 'database',
      destination: 'warehouse',
      schedule: 'daily'
    }
  },

  // Quality Assurance
  {
    id: 'qa-testing',
    category: 'quality',
    icon: '🔍',
    title: 'QA Testing',
    description: 'Comprehensive quality assurance testing',
    taskName: 'Perform QA Testing',
    taskDescription: 'Execute comprehensive QA testing including functional, regression, and user acceptance testing',
    priority: TaskPriority.HIGH,
    capabilities: ['quality-assurance', 'testing', 'validation'],
    input: {
      testTypes: ['functional', 'regression', 'uat'],
      environment: 'staging'
    }
  },
  {
    id: 'security-audit',
    category: 'quality',
    icon: '🔒',
    title: 'Security Audit',
    description: 'Perform security vulnerability assessment',
    taskName: 'Conduct Security Audit',
    taskDescription: 'Perform comprehensive security audit, identify vulnerabilities, and provide remediation recommendations',
    priority: TaskPriority.CRITICAL,
    capabilities: ['security', 'auditing', 'vulnerability-assessment'],
    input: {
      auditType: 'comprehensive',
      includeRemediation: true
    }
  },
  {
    id: 'code-review',
    category: 'quality',
    icon: '👀',
    title: 'Code Review',
    description: 'Review code for quality and best practices',
    taskName: 'Perform Code Review',
    taskDescription: 'Review code changes for quality, security, performance, and adherence to best practices',
    priority: TaskPriority.MEDIUM,
    capabilities: ['code-review', 'quality-assurance', 'best-practices'],
    input: {
      reviewType: 'pull-request',
      checkList: ['security', 'performance', 'style']
    }
  }
];

export function getTemplatesByCategory(category: string): PromptTemplate[] {
  return promptTemplates.filter(t => t.category === category);
}

export function getTemplateById(id: string): PromptTemplate | undefined {
  return promptTemplates.find(t => t.id === id);
}

export function searchTemplates(query: string): PromptTemplate[] {
  const lowerQuery = query.toLowerCase();
  return promptTemplates.filter(t => 
    t.title.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.capabilities.some(c => c.toLowerCase().includes(lowerQuery))
  );
}
