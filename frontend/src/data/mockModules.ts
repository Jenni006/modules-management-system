import type { Module } from '../types/module';

export const mockModules: Module[] = [
  {
    id: '1',
    name: 'Introduction to CBT',
    author: 'Dr. B Ramesh',
    program: 'Mind Matter',
    category: 'Engineering',
    target_group: '1st year',
    service_component: 'Group Session',
    quick_summary:
      'This module introduces cognitive behavioral therapy techniques for engineering students facing academic stress.',
    tags: ['Maharishi Chetpet', 'Mental Health', 'CBT'],
    status: 'active',
    publish_date: '2024-01-15T00:00:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Stress Management Workshop',
    author: 'Dr. Priya S',
    program: 'Mind Matter Junior',
    category: 'CBSE School',
    target_group: '12th Grade',
    service_component: 'Skill Building Workshop',
    quick_summary:
      'A workshop designed to help 12th grade students manage exam stress effectively.',
    tags: ['Exam Stress', 'Workshop'],
    status: 'draft',
    publish_date: undefined,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Workplace Wellness',
    author: 'Dr. B Ramesh',
    program: 'WorkWell',
    category: 'work well corporate',
    target_group: 'Professional Staff',
    service_component: 'Skill Development',
    quick_summary:
      'A comprehensive wellness program for corporate professionals.',
    tags: ['Wellness', 'Corporate'],
    status: 'pending',
    publish_date: undefined,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z',
  },
];