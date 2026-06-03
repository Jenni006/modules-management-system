import { Tag } from '@carbon/react';
import type { ModuleStatus } from '../types/module';

interface StatusTagProps {
  status: ModuleStatus;
}

const statusConfig = {
  active: { type: 'green' as const, label: 'Active' },
  draft: { type: 'gray' as const, label: 'Draft' },
  pending: { type: 'warm-gray' as const, label: 'Pending' },
};

const StatusTag = ({ status }: StatusTagProps) => {
  const config = statusConfig[status];
  return (
    <Tag type={config.type} size="sm">
      {config.label}
    </Tag>
  );
};

export default StatusTag;