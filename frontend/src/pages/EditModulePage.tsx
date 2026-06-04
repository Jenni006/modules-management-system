import { useState, useEffect } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  TextInput,
  TextArea,
  Dropdown,
  Form,
  Stack,
  InlineNotification,
  DismissibleTag
} from '@carbon/react';
import { Save } from '@carbon/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { useModule, useUpdateModule } from '../hooks/useModules';
import { dropdownMatrix } from '../data/dropdownOptions';
import type { ProgramKey } from '../data/dropdownOptions';
import type { ModuleUpdate } from '../types/module';

const SUMMARY_MAX = 100;

const programOptions = Object.keys(dropdownMatrix) as ProgramKey[];

const EditModulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: module, isLoading, isError } = useModule(id!);
  const updateModule = useUpdateModule(id!);

  const [form, setForm] = useState<ModuleUpdate>({});
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (module) {
      setForm({
        name: module.name,
        author: module.author,
        program: module.program,
        category: module.category,
        target_group: module.target_group,
        service_component: module.service_component,
        quick_summary: module.quick_summary,
        tags: module.tags || [],
        status: module.status,
      });
    }
  }, [module]);

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

  const selectedProgram = form.program as ProgramKey | undefined;
  const programConfig = selectedProgram ? dropdownMatrix[selectedProgram] : null;
  const categoryOptions = programConfig?.categories || [];
  const targetGroupOptions =
    programConfig && form.category
      ? programConfig.targetGroups[form.category] || []
      : [];
  const serviceOptions = programConfig
    ? Array.isArray(programConfig.serviceComponents)
      ? programConfig.serviceComponents
      : (programConfig.serviceComponents as any)[form.category || ''] || []
    : [];

  const handleProgramChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      program: value,
      category: '',
      target_group: '',
      service_component: '',
    }));
  };

  const handleCategoryChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      category: value,
      target_group: '',
    }));
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (form.tags?.includes(trimmed)) return;
    setForm((prev) => ({ ...prev, tags: [...(prev.tags || []), trimmed] }));
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag),
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name?.trim()) newErrors.name = 'Module name is required';
    if (!form.author?.trim()) newErrors.author = 'Author is required';
    if (!form.program) newErrors.program = 'Program is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.target_group) newErrors.target_group = 'Target group is required';
    if (!form.service_component)
      newErrors.service_component = 'Service component is required';
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    try {
      await updateModule.mutateAsync(form);
      setSaved(true);
      setTimeout(() => {
        navigate(`/modules/${id}`);
      }, 1000);
    } catch (err) {
      setErrors({ general: 'Failed to update module. Please try again.' });
    }
  };

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
          <BreadcrumbItem>
            <a href={`/modules/${id}`}>{module.name}</a>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Edit</BreadcrumbItem>
        </Breadcrumb>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <h1 style={{ fontSize: '1.75rem', fontWeight: 300, margin: 0 }}>
            Edit Module
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button
              kind="secondary"
              onClick={() => navigate(`/modules/${id}`)}
            >
              Cancel
            </Button>
            <Button
              kind="primary"
              renderIcon={Save}
              onClick={handleSave}
              disabled={updateModule.isPending}
            >
              {updateModule.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '800px' }}>
        {saved && (
          <InlineNotification
            kind="success"
            title="Saved"
            subtitle="Module updated successfully. Redirecting..."
            style={{ marginBottom: '1.5rem' }}
          />
        )}

        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            padding: '2rem',
          }}
        >
          <Form>
            <Stack gap={7}>
              <TextInput
                id="edit-name"
                labelText="Module Name"
                value={form.name || ''}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                invalid={!!errors.name}
                invalidText={errors.name}
              />

              <TextInput
                id="edit-author"
                labelText="Author"
                value={form.author || ''}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, author: e.target.value }))
                }
                invalid={!!errors.author}
                invalidText={errors.author}
              />

              <Dropdown
                id="edit-program"
                titleText="Program"
                label="Select program"
                items={programOptions}
                itemToString={(item) => item || ''}
                selectedItem={(form.program as ProgramKey) || null}
                onChange={({ selectedItem }) => {
                  if (selectedItem) handleProgramChange(selectedItem);
                }}
                invalid={!!errors.program}
                invalidText={errors.program}
              />

              <Dropdown
                id="edit-category"
                titleText="Category"
                label="Select category"
                items={categoryOptions}
                itemToString={(item) => item || ''}
                selectedItem={form.category || null}
                onChange={({ selectedItem }) => {
                  if (selectedItem) handleCategoryChange(selectedItem);
                }}
                disabled={!form.program}
                invalid={!!errors.category}
                invalidText={errors.category}
              />

              <Dropdown
                id="edit-target-group"
                titleText="Target Group"
                label="Select target group"
                items={targetGroupOptions}
                itemToString={(item) => item || ''}
                selectedItem={form.target_group || null}
                onChange={({ selectedItem }) => {
                  if (selectedItem)
                    setForm((prev) => ({
                      ...prev,
                      target_group: selectedItem,
                    }));
                }}
                disabled={!form.category}
                invalid={!!errors.target_group}
                invalidText={errors.target_group}
              />

              <Dropdown
                id="edit-service"
                titleText="Service Component"
                label="Select service component"
                items={serviceOptions}
                itemToString={(item) => item || ''}
                selectedItem={form.service_component || null}
                onChange={({ selectedItem }) => {
                  if (selectedItem)
                    setForm((prev) => ({
                      ...prev,
                      service_component: selectedItem,
                    }));
                }}
                disabled={!form.program}
                invalid={!!errors.service_component}
                invalidText={errors.service_component}
              />

              <div>
                <TextArea
                  id="edit-summary"
                  labelText="Quick Summary"
                  value={form.quick_summary || ''}
                  onChange={(e) => {
                    if (e.target.value.length <= SUMMARY_MAX) {
                      setForm((prev) => ({
                        ...prev,
                        quick_summary: e.target.value,
                      }));
                    }
                  }}
                  rows={3}
                />
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: '#525252',
                    textAlign: 'right',
                    marginTop: '0.25rem',
                  }}
                >
                  {form.quick_summary?.length || 0}/{SUMMARY_MAX}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                  }}
                >
                  Tags
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <TextInput
                    id="edit-tag-input"
                    labelText=""
                    hideLabel
                    placeholder="Add a tag and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button kind="secondary" size="md" onClick={addTag}>
                    Add
                  </Button>
                </div>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
                >
                  {form.tags?.map((tag) => (
                    <DismissibleTag
                      key={tag}
                      type="blue"
                      text={tag}
                      onClose={() => removeTag(tag)}
                    />
                  ))}
                </div>
              </div>

            </Stack>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditModulePage;