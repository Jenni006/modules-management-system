import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tag,
} from '@carbon/react';
import { Edit } from '@carbon/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import TopNav from '../components/TopNav';
import StatusTag from '../components/StatusTag';
import { useModule } from '../hooks/useModules';
const formatDate = (dateStr?: string) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const ViewModulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: module, isLoading, isError } = useModule(id!);

  if (isLoading) {
  return (
    <div>
      <TopNav />
      <div style={{ marginTop: '48px', padding: '2rem' }}>
        <p>Loading module...</p>
      </div>
    </div>
  );
}

if (isError || !module) {
  return (
    <div>
      <TopNav />
      <div style={{ marginTop: '48px', padding: '2rem' }}>
        <p>Module not found.</p>
        <Button kind="secondary" onClick={() => navigate('/modules')}>
          Back to Modules
        </Button>
      </div>
    </div>
  );
}

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <TopNav />

      <div
        style={{
          marginTop: '48px',
          backgroundColor: '#ffffff',
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="#">Bread Crumb</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/modules">Modules</a>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            {module.name}
          </BreadcrumbItem>
        </Breadcrumb>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 300, margin: 0 }}>
              {module.name}
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#525252', marginTop: '0.25rem' }}>
              {module.program} — {module.category}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <StatusTag status={module.status} />
            <Button
              kind="primary"
              renderIcon={Edit}
              onClick={() => navigate(`/modules/${module.id}/edit`)}
            >
              Edit Module
            </Button>
          </div>
        </div>
      </div>

      <div style={{ padding: '2rem' }}>

        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}
        >
          <h2
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            Module Details
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
            }}
          >
            <div>
              <p style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '0.25rem' }}>
                Author
              </p>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {module.author}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '0.25rem' }}>
                Program
              </p>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {module.program}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '0.25rem' }}>
                Category
              </p>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {module.category}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '0.25rem' }}>
                Target Group
              </p>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {module.target_group}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '0.25rem' }}>
                Service Component
              </p>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {module.service_component}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '0.25rem' }}>
                Publish Date
              </p>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {formatDate(module.publish_date)}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '0.25rem' }}>
                Created At
              </p>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {formatDate(module.created_at)}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#525252', marginBottom: '0.25rem' }}>
                Last Updated
              </p>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {formatDate(module.updated_at)}
              </p>
            </div>
          </div>
        </div>

        {module.quick_summary && (
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              padding: '2rem',
              marginBottom: '1.5rem',
            }}
          >
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '1rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Quick Summary
              <span
                style={{
                  background: '#0f62fe',
                  color: '#ffffff',
                  padding: '0.1rem 0.4rem',
                  fontSize: '10px',
                  borderRadius: '2px',
                  fontWeight: 700,
                }}
              >
                AI
              </span>
            </h2>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#161616' }}>
              {module.quick_summary}
            </p>
          </div>
        )}

        {module.tags && module.tags.length > 0 && (
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              padding: '2rem',
              marginBottom: '1.5rem',
            }}
          >
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '1rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              Tags
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {module.tags.map((tag: string) => (
                <Tag key={tag} type="blue" size="md">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        )}

        <Button
          kind="secondary"
          onClick={() => navigate('/modules')}
        >
          Back to Modules
        </Button>
      </div>
    </div>
  );
};

export default ViewModulePage;