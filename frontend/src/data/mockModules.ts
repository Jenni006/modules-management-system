import type { Module } from '../types/module';

export const mockModules: Module[] = [
  {
    id: '1',
    name: 'Child Wellbeing',
    author: 'Saranya Loganathan',
    program: 'Mind Matters',
    category: 'Engineering',
    target_group: '1st year',
    service_component: 'Group Session',
    quick_summary:
      'This module focuses on the early identification and support for child psychological and emotional wellbeing.',
    tags: ['Child Health', 'Wellbeing', 'Mental Health'],
    status: 'active',
    publish_date: '2025-11-22T00:00:00Z',
    created_at: '2025-11-22T00:00:00Z',
    updated_at: '2025-11-22T00:00:00Z',
  },
  {
    id: '2',
    name: 'Anti Bullying Methods',
    author: 'Saranya Loganathan',
    program: 'Mind Matters Jr.',
    category: 'CBSE School',
    target_group: '12th Grade',
    service_component: 'Skill Building Workshop',
    quick_summary:
      'A workshop designed to help schools identify, prevent, and address bullying incidents.',
    tags: ['Bullying', 'Prevention', 'School'],
    status: 'draft',
    publish_date: '2025-11-19T00:00:00Z',
    created_at: '2025-11-19T00:00:00Z',
    updated_at: '2025-11-19T00:00:00Z',
  },
  {
    id: '3',
    name: 'Handing Depression in Minors',
    author: 'Janice Anthony',
    program: 'Mind Matters Jr.',
    category: 'Clinical Psychology',
    target_group: 'Adolescents',
    service_component: 'Individual Counseling',
    quick_summary:
      'Providing effective counseling techniques and intervention plans for handling depression in minors.',
    tags: ['Depression', 'Counseling', 'Adolescents'],
    status: 'draft',
    publish_date: '2025-11-23T00:00:00Z',
    created_at: '2025-11-23T00:00:00Z',
    updated_at: '2025-11-23T00:00:00Z',
  },
];