import { useState } from 'react';
import {
  Button,
  Checkbox,
  DatePicker,
  DatePickerInput,
  Tag,
  TextInput,
} from '@carbon/react';
import { Close, ChevronDown, ChevronUp } from '@carbon/icons-react';
import { mockModules } from '../data/mockModules';

export interface FilterState {
  collaborators: string[];
  createdOnStart: string;
  createdOnEnd: string;
  categories: string[];
  tags: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

const uniqueAuthors = [...new Set(mockModules.map((m) => m.author))];
const uniqueCategories = [...new Set(mockModules.map((m) => m.category))];
const uniqueTags = [...new Set(mockModules.flatMap((m) => m.tags || []))];

const AccordionSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: '1px solid #e0e0e0' }}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#161616',
        }}
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div style={{ paddingBottom: '1rem' }}>
          {children}
        </div>
      )}
    </div>
  );
};

const FilterPanel = ({ open, onClose, onApply }: Props) => {
  const [filters, setFilters] = useState<FilterState>({
    collaborators: [],
    createdOnStart: '',
    createdOnEnd: '',
    categories: [],
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  if (!open) return null;

  const toggleCollaborator = (author: string) => {
    setFilters((prev) => ({
      ...prev,
      collaborators: prev.collaborators.includes(author)
        ? prev.collaborators.filter((c) => c !== author)
        : [...prev.collaborators, author],
    }));
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || filters.tags.includes(trimmed)) return;
    setFilters((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleReset = () => {
    setFilters({
      collaborators: [],
      createdOnStart: '',
      createdOnEnd: '',
      categories: [],
      tags: [],
    });
  };

  return (
    <div
      style={{
        width: '280px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
          Filter
        </h2>
        <Button
          kind="ghost"
          renderIcon={Close}
          iconDescription="Close filter"
          hasIconOnly
          size="sm"
          onClick={onClose}
        />
      </div>

      {/* Filter Sections */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 1rem' }}>

        {/* Collaborators */}
        <AccordionSection title="Collaborators">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {uniqueAuthors.map((author) => (
              <Checkbox
                key={author}
                id={`collab-${author}`}
                labelText={author}
                checked={filters.collaborators.includes(author)}
                onChange={() => toggleCollaborator(author)}
              />
            ))}
          </div>
        </AccordionSection>

        {/* Created On */}
        <AccordionSection title="Created on">
          <DatePicker
            datePickerType="range"
            onChange={(dates) => {
              setFilters((prev) => ({
                ...prev,
                createdOnStart: dates[0]?.toISOString() || '',
                createdOnEnd: dates[1]?.toISOString() || '',
              }));
            }}
          >
            <DatePickerInput
              id="date-start"
              placeholder="mm/dd/yyyy"
              labelText="Start date"
              size="md"
            />
            <DatePickerInput
              id="date-end"
              placeholder="mm/dd/yyyy"
              labelText="End date"
              size="md"
            />
          </DatePicker>
        </AccordionSection>

        {/* Category */}
        <AccordionSection title="Category">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {uniqueCategories.map((category) => (
              <Checkbox
                key={category}
                id={`cat-${category}`}
                labelText={category}
                checked={filters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
            ))}
          </div>
        </AccordionSection>

        {/* Tags */}
        <AccordionSection title="Tags">
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <TextInput
              id="filter-tag-input"
              labelText=""
              hideLabel
              placeholder="Add tag"
              size="sm"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <Button kind="secondary" size="sm" onClick={addTag}>
              Add
            </Button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {uniqueTags.map((tag) => (
              <Checkbox
                key={tag}
                id={`tag-${tag}`}
                labelText={tag}
                checked={filters.tags.includes(tag)}
                onChange={() => {
                  setFilters((prev) => ({
                    ...prev,
                    tags: prev.tags.includes(tag)
                      ? prev.tags.filter((t) => t !== tag)
                      : [...prev.tags, tag],
                  }));
                }}
              />
            ))}
            {filters.tags
              .filter((t) => !uniqueTags.includes(t))
              .map((tag) => (
                <Tag
                  key={tag}
                  type="blue"
                  filter
                  onClose={() => removeTag(tag)}
                >
                  {tag}
                </Tag>
              ))}
          </div>
        </AccordionSection>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '1rem',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <Button kind="ghost" onClick={handleReset} style={{ flex: 1 }}>
          Reset
        </Button>
        <Button
          kind="primary"
          onClick={() => onApply(filters)}
          style={{ flex: 1 }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;