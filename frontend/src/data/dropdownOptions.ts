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
      'Arts and science',
      'Arts and science Women',
      'Polytechnic',
      'Maritime',
    ],
    targetGroups: {
      Engineering: [
        '1st year', '2nd year', '3rd year', '4th year', '5th year',
        'Teaching Staff', 'Non - teaching Staff', 'more',
      ],
      'Arts and science': [
        '1st year', '2nd year', '3rd year',
        'Teaching Staff', 'Non - teaching Staff', 'more',
      ],
      'Arts and science Women': [
        '1st year', '2nd year', '3rd year',
        'Teaching Staff', 'Non - teaching Staff', 'more',
      ],
      Polytechnic: [
        '1st year', '2nd year', '3rd year',
        'Teaching Staff', 'Non - teaching Staff', 'more',
      ],
      Maritime: [
        '1st year', '2nd year', '3rd year',
        'Teaching Staff', 'Non - teaching Staff', 'more',
      ],
    },
    serviceComponents: [
      'Group Session',
      'Skill Development',
      'Workshop',
      'Lifeskill Training',
      'Awarness Campaigen',
      'Program Follow-up',
      'Emergency & Crises Management',
      'Creative Therapy',
      'Focus group',
    ],
  },

  'Mind Matter Junior': {
    categories: [
      'CBSE School',
      'School (matric)',
      'School (Gov)',
    ],
    targetGroups: {
      'CBSE School': [
        '1st grade', '2nd grade', '3rd grade', '4th grade',
        'Non - teaching Staff', 'Staff training', 'more',
      ],
      'School (matric)': [
        '1st grade', '2nd grade', '3rd grade', '4th grade',
        'Non - teaching Staff', 'Staff training', 'more',
      ],
      'School (Gov)': [
        '1st grade', '2nd grade', '3rd grade', '4th grade',
        'Non - teaching Staff', 'Staff training', 'more',
      ],
    },
    serviceComponents: [
      'Personality Counselling Session',
      'Skill Building Workshop',
      'Carreer & Acdemic Guidance',
      'Digital Wellbeing & Cyber Awarness',
      'Exam Readiases & Focus Coaching',
      'Community & Social Responsibility Program',
      'Creative Therapies',
      'Group Wellness Circles',
      'Focus group',
    ],
  },

  WorkWell: {
    categories: [
      'work well cooperate',
      'work well seafarers',
      'more',
    ],
    targetGroups: {
      'work well cooperate': ['Professional staff', 'Support Staff'],
      'work well seafarers': ['Professional staff', 'Support Staff'],
      more: ['Professional staff', 'Support Staff'],
    },
    serviceComponents: {
      'work well cooperate': [
        'Employee Wellness Evatution',
        'Individual Session',
        'Group Wellness Session',
        'Skill Devolopment',
        'Performance Coaching',
        'Employee Assistance Program',
        'Workshop',
        'Culture Activation Program',
        'Emergency and cris Management',
        'Lunch and Learn Session',
        'Leadership Coaching',
        'Leadership & Culture',
        'Workforce Wellbeing Insights',
      ],
      'work well seafarers': [
        'Psychological Balance & Regulation Care',
        'Crew Alignment Program',
        'Early Detection Program',
        'Crisis Containment Program',
        'Safety - Critical Mental Fitness',
        'Long - Voyage Sustainablity',
        'Leadership Stability at sea',
        'Cultural harmony & Team Dynamics',
        'Family Wellness Contiuity',
        'Digital & Discreet Access Support',
        'Traing Skill Building & Awarness',
        'Wellbeing Analytics & Admin',
      ],
    } as any,
  },

  'Soul Sister': {
    categories: ['General'],
    targetGroups: {
      General: ['Women Group', 'Support Staff'],
    },
    serviceComponents: ['Group Session', 'Workshop', 'Focus group'],
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