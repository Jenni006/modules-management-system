export type ProgramKey =
  | 'Mind Matter'
  | 'Mind Matter Junior'
  | 'WorkWell'
  | 'Soul Sister'
  | 'Safe Home'
  | 'Custom';

export interface DropdownConfig {
  categories: string[];
  targetGroups: Record<string, string[]>;
  serviceComponents: string[];
}

export const dropdownMatrix: Record<ProgramKey, DropdownConfig> = {
  'Mind Matter': {
    categories: [
      'Engineering',
      'Arts and Science',
      'Arts and Science Women',
      'Polytechnic',
      'Maritime',
    ],
    targetGroups: {
      Engineering: [
        '1st year', '2nd year', '3rd year', '4th year', '5th year',
        'Teaching Staff', 'Non-teaching Staff',
      ],
      'Arts and Science': [
        '1st year', '2nd year', '3rd year',
        'Teaching Staff', 'Non-teaching Staff',
      ],
      'Arts and Science Women': [
        '1st year', '2nd year', '3rd year',
        'Teaching Staff', 'Non-teaching Staff',
      ],
      Polytechnic: [
        '1st year', '2nd year', '3rd year',
        'Teaching Staff', 'Non-teaching Staff',
      ],
      Maritime: [
        '1st year', '2nd year', '3rd year',
        'Teaching Staff', 'Non-teaching Staff',
      ],
    },
    serviceComponents: [
      'Group Session',
      'Skill Development',
      'Workshop',
      'Lifeskill Training',
      'Awareness Campaign',
      'Program Follow-up',
      'Emergency & Crisis Management',
      'Creative Therapy',
      'Focus Group',
    ],
  },
  'Mind Matter Junior': {
    categories: ['CBSE School', 'School (Matric)', 'School (Govt)'],
    targetGroups: {
      'CBSE School': [
        '1st grade', '2nd grade', '3rd grade', '4th grade',
        'Non-teaching Staff', 'Staff Training',
      ],
      'School (Matric)': [
        '1st grade', '2nd grade', '3rd grade', '4th grade',
        'Non-teaching Staff', 'Staff Training',
      ],
      'School (Govt)': [
        '1st grade', '2nd grade', '3rd grade', '4th grade',
        'Non-teaching Staff', 'Staff Training',
      ],
    },
    serviceComponents: [
      'Personality Counselling Session',
      'Skill Building Workshop',
      'Career & Academic Guidance',
      'Digital Wellbeing & Cyber Awareness',
      'Exam Readiness & Focus Coaching',
      'Community & Social Responsibility Program',
      'Creative Therapies',
      'Group Wellness Circles',
      'Focus Group',
    ],
  },
  WorkWell: {
    categories: ['Work Well Corporate', 'Work Well Seafarers'],
    targetGroups: {
      'Work Well Corporate': ['Professional Staff', 'Support Staff'],
      'Work Well Seafarers': ['Professional Staff', 'Support Staff'],
    },
    serviceComponents: [
      'Group Session',
      'Skill Development',
      'Workshop',
      'Awareness Campaign',
      'Focus Group',
    ],
  },
  'Soul Sister': {
    categories: ['General'],
    targetGroups: {
      General: ['Women Group', 'Support Staff'],
    },
    serviceComponents: ['Group Session', 'Workshop', 'Focus Group'],
  },
  'Safe Home': {
    categories: ['General'],
    targetGroups: {
      General: ['Family Group', 'Support Staff'],
    },
    serviceComponents: ['Group Session', 'Workshop', 'Awareness Campaign'],
  },
  Custom: {
    categories: ['Custom Category'],
    targetGroups: {
      'Custom Category': ['Custom Group'],
    },
    serviceComponents: ['Custom Service'],
  },
};