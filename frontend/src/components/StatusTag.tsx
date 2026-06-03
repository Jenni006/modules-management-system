import { Tag } from '@carbon/react';
import { CheckmarkFilled, SubtractFilled } from '@carbon/icons-react';
import type { ModuleStatus } from '../types/module';

interface StatusTagProps {
  status: ModuleStatus;
}

const statusConfig = {
  active: { type: 'green' as const, label: 'Active', icon: CheckmarkFilled },
  draft: { type: 'gray' as const, label: 'Draft', icon: SubtractFilled },
  pending: { type: 'warm-gray' as const, label: 'Pending', icon: SubtractFilled },
};

const StatusTag = ({ status }: StatusTagProps) => {
  const config = statusConfig[status];
  const IconComponent = config.icon;
  return (
    <Tag
      type={config.type}
      renderIcon={() => <IconComponent size={16} />}
      className={`custom-status-tag status-${status}`}
    >
      {config.label}
    </Tag>
  );
};

export default StatusTag;