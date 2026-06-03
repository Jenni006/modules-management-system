export type ModuleStatus = 'active' | 'draft' | 'pending';

export interface Module {
  id: string;
  name: string;
  author: string;
  program: string;
  category: string;
  target_group: string;
  service_component: string;
  quick_summary?: string;
  tags?: string[];
  status: ModuleStatus;
  publish_date?: string;
  created_at: string;
  updated_at: string;
}

export interface ModuleCreate {
  name: string;
  author: string;
  program: string;
  category: string;
  target_group: string;
  service_component: string;
  quick_summary?: string;
  tags?: string[];
  status?: ModuleStatus;
  publish_date?: string;
}

export interface ModuleUpdate extends Partial<ModuleCreate> {}