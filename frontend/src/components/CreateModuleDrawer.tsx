import { useState } from 'react';
import {
  Button,
  TextInput,
  TextArea,
  Dropdown,
  Tag,
  Form,
  Stack,
  InlineNotification,
} from '@carbon/react';
import { Close } from '@carbon/icons-react';
import { dropdownMatrix } from '../data/dropdownOptions';
import type { ProgramKey } from '../data/dropdownOptions';
import type { ModuleCreate } from '../types/module';
import { useCreateModule } from '../hooks/useModules';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const programOptions = Object.keys(dropdownMatrix) as ProgramKey[];
const SUMMARY_MAX = 100;

const CreateModuleDrawer = ({ open, onClose }: Props) => {
  const createModule = useCreateModule();

  const [form, setForm] = useState<Partial<ModuleCreate>>({
    tags: [],
    status: 'draft',
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  if (!open) return null;

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
    if (!trimmed || form.tags?.includes(trimmed)) return;
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

  const handleSaveDraft = async () => {
    if (!form.name?.trim()) {
      setErrors({ name: 'Module name is required' });
      return;
    }
    console.log('Sending payload:', { ...form, status: 'draft' });
    try {
      await createModule.mutateAsync({ ...form, status: 'draft' } as ModuleCreate);
      onClose();
    } catch (err) {
      console.error('Save draft error:', err);
      setSubmitError('Failed to save draft. Please try again.');
    }
  };

  const handleCreate = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    try {
      await createModule.mutateAsync({ ...form, status: 'active' } as ModuleCreate);
      onClose();
    } catch (err) {
      setSubmitError('Failed to create module. Please try again.');
    }
  };

  const isCreateEnabled =
    !!form.name &&
    !!form.author &&
    !!form.program &&
    !!form.category &&
    !!form.target_group &&
    !!form.service_component;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 6000,
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '480px',
          height: '100vh',
          background: '#ffffff',
          zIndex: 6001,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 16px rgba(0,0,0,0.15)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              Add Modules
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#525252' }}>
              Fill in the details to create a new module.
            </p>
          </div>
          <Button
            kind="ghost"
            renderIcon={Close}
            iconDescription="Close"
            hasIconOnly
            onClick={onClose}
          />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {submitError && (
            <InlineNotification
              kind="error"
              title="Error"
              subtitle={submitError}
              style={{ marginBottom: '1rem' }}
            />
          )}
          <Form>
            <Stack gap={6}>
              <TextInput
                id="module-name"
                labelText="Module Name"
                placeholder="Enter module name"
                value={form.name || ''}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                invalid={!!errors.name}
                invalidText={errors.name}
              />

              <TextInput
                id="module-author"
                labelText="Author"
                placeholder="Enter author name"
                value={form.author || ''}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, author: e.target.value }))
                }
                invalid={!!errors.author}
                invalidText={errors.author}
              />

              <Dropdown
                id="module-program"
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
                id="module-category"
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
                id="module-target-group"
                titleText="Target Group"
                label="Select target group"
                items={targetGroupOptions}
                itemToString={(item) => item || ''}
                selectedItem={form.target_group || null}
                onChange={({ selectedItem }) => {
                  if (selectedItem)
                    setForm((prev) => ({ ...prev, target_group: selectedItem }));
                }}
                disabled={!form.category}
                invalid={!!errors.target_group}
                invalidText={errors.target_group}
              />

              <Dropdown
                id="module-service"
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
                  id="module-summary"
                  labelText="Quick Summary"
                  placeholder="Enter a brief summary (max 100 characters)"
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
                <p style={{ fontSize: '0.75rem', color: '#525252', textAlign: 'right', marginTop: '0.25rem' }}>
                  {form.quick_summary?.length || 0}/{SUMMARY_MAX}
                </p>
              </div>

              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Tags
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <TextInput
                    id="tag-input"
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
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {form.tags?.map((tag) => (
                    <Tag key={tag} type="blue" filter onClose={() => removeTag(tag)}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </Stack>
          </Form>
        </div>

        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            kind="secondary"
            onClick={handleSaveDraft}
            disabled={createModule.isPending}
          >
            {createModule.isPending ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            kind="primary"
            onClick={handleCreate}
            disabled={!isCreateEnabled || createModule.isPending}
          >
            {createModule.isPending ? 'Creating...' : 'Create and Open'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateModuleDrawer;