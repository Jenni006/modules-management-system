import { Tag } from '@carbon/react';
import type { Module } from '../types/module';

interface ModuleDetailsProps {
  module: Module;
}

const ModuleDetails = ({ module }: ModuleDetailsProps) => {
  return (
    <div
      style={{
        padding: '1rem',
        background: '#f4f4f4',
      }}
    >
      <p>
        <strong>Category:</strong> {module.category}
      </p>

      <p>
        <strong>Target Group:</strong> {module.target_group}
      </p>

      <p>
        <strong>Service Component:</strong> {module.service_component}
      </p>

      <div style={{ marginTop: '1rem' }}>
        <strong>Summary</strong>

        <p style={{ marginTop: '0.5rem' }}>
          {module.quick_summary}
        </p>
      </div>

      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        {module.tags?.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
};

export default ModuleDetails;