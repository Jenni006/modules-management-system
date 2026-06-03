import React, { useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  Button,
  Dropdown,
  IconButton,
  OverflowMenu,
  OverflowMenuItem,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
} from '@carbon/react';
import { Add, Filter, Renew } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import StatusTag from '../components/StatusTag';
import { mockModules } from '../data/mockModules';
import type { Module, ModuleCreate } from '../types/module';
import CreateModuleDrawer from '../components/CreateModuleDrawer';

const headers = [
  { key: 'name', header: 'Module Name' },
  { key: 'author', header: 'Author' },
  { key: 'program', header: 'Program' },
  { key: 'status', header: 'Status' },
  { key: 'publish_date', header: 'Publish Date' },
];

const programOptions = [
  { id: 'all', label: 'All Programs' },
  { id: 'Mind Matter', label: 'Mind Matter' },
  { id: 'Mind Matter Junior', label: 'Mind Matter Junior' },
  { id: 'WorkWell', label: 'WorkWell' },
  { id: 'Soul Sister', label: 'Soul Sister' },
  { id: 'Safe Home', label: 'Safe Home' },
  { id: 'Custom', label: 'Custom' },
];

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const ModulesPage = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(programOptions[0]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const liveCount = mockModules.filter((m) => m.status === 'active').length;
  const draftCount = mockModules.filter((m) => m.status === 'draft').length;

  const filteredModules = mockModules.filter((m) => {
    const matchesProgram =
      selectedProgram.id === 'all' || m.program === selectedProgram.id;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.program.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProgram && matchesSearch;
  });

  const rows = filteredModules.map((m: Module) => ({
    id: m.id,
    name: m.name,
    author: m.author,
    program: m.program,
    status: m.status,
    publish_date: m.publish_date,
  }));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <TopNav />

      {/* White header banner */}
      <div
        style={{
          marginTop: '48px',
          backgroundColor: '#ffffff',
          padding: '1.5rem 2rem 0 2rem',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="#">Bread Crumb</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="#">Bread Crumb</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="#">Bread Crumb</a>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <a href="/modules">Modules</a>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Title row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <h1 style={{ fontSize: '1.75rem', fontWeight: 300, margin: 0 }}>
            Modules
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button kind="secondary">Review Queue</Button>
            <Button
              kind="primary"
              renderIcon={Add}
              onClick={() => setDrawerOpen(true)}
            >
              Create Modules
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex' }}>
          {['All Modules', 'My Modules'].map((label, index) => (
            <button
              key={label}
              onClick={() => setActiveTabIndex(index)}
              style={{
                padding: '0.65rem 1.5rem',
                fontSize: '14px',
                fontWeight: 400,
                cursor: 'pointer',
                border: '1px solid #e0e0e0',
                borderRight: index === 0 ? 'none' : '1px solid #e0e0e0',
                background: activeTabIndex === index ? '#161616' : '#ffffff',
                color: activeTabIndex === index ? '#ffffff' : '#161616',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: '1rem 2rem 2rem 2rem' }}>
        <p style={{ fontSize: '12px', color: '#525252', marginBottom: '1rem' }}>
          Live Modules: {liveCount} | Draft modules: {draftCount}
        </p>

        <DataTable rows={rows} headers={headers}>
          {({
            rows: tableRows,
            headers: tableHeaders,
            getTableProps,
            getHeaderProps,
            getRowProps,
          }: any) => (
            <TableContainer>
              <TableToolbar>
                <TableToolbarContent style={{ gap: 0 }}>
                  <IconButton
                    kind="ghost"
                    label="Filter"
                    align="bottom"
                  >
                    <Filter />
                  </IconButton>

                  <div style={{ width: '180px' }}>
                    <Dropdown
                      id="program-select-dropdown"
                      titleText=""
                      items={programOptions}
                      selectedItem={selectedProgram}
                      onChange={({ selectedItem }) => {
                        if (selectedItem) setSelectedProgram(selectedItem);
                      }}
                      label="All Programs"
                      size="md"
                      type="inline"
                    />
                  </div>

                  <TableToolbarSearch
                    placeholder="Find module by name, author or category"
                    onChange={(e: any) => setSearchQuery(e?.target?.value || '')}
                    expanded
                  />

                  <IconButton
                    kind="ghost"
                    label="Reset Filters"
                    align="bottom"
                    onClick={() => {
                      setSelectedProgram(programOptions[0]);
                      setSearchQuery('');
                    }}
                  >
                    <Renew />
                  </IconButton>
                </TableToolbarContent>
              </TableToolbar>

              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    <TableExpandHeader />
                    {tableHeaders.map((header: any) => (
                      <TableHeader
                        {...getHeaderProps({ header })}
                        key={header.key}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                    <TableHeader />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRows.map((row: any) => {
                    const module = filteredModules.find(
                      (m) => m.id === row.id
                    )!;
                    return (
                      <React.Fragment key={row.id}>
                        <TableExpandRow
                          key={row.id}
                          {...(() => {
                            const { key, ...rest } = getRowProps({ row });
                            return rest;
                          })()}
                        >
                          {row.cells.map((cell: any) => {
                            if (cell.info.header === 'name') {
                              return (
                                <TableCell key={cell.id}>
                                  <span
                                    style={{
                                      color: '#0f62fe',
                                      cursor: 'pointer',
                                      textDecoration: 'underline',
                                    }}
                                    onClick={() =>
                                      navigate(`/modules/${module.id}`)
                                    }
                                  >
                                    {cell.value}
                                  </span>
                                </TableCell>
                              );
                            }
                            if (cell.info.header === 'status') {
                              return (
                                <TableCell key={cell.id}>
                                  <StatusTag status={cell.value} />
                                </TableCell>
                              );
                            }
                            if (cell.info.header === 'publish_date') {
                              return (
                                <TableCell key={cell.id}>
                                  {formatDate(cell.value)}
                                </TableCell>
                              );
                            }
                            return (
                              <TableCell key={cell.id}>
                                {cell.value}
                              </TableCell>
                            );
                          })}
                          <TableCell>
                            <OverflowMenu flipped size="sm">
                              <OverflowMenuItem
                                itemText="View Details"
                                onClick={() =>
                                  navigate(`/modules/${module.id}`)
                                }
                              />
                              <OverflowMenuItem
                                itemText="Edit Module"
                                onClick={() =>
                                  navigate(`/modules/${module.id}/edit`)
                                }
                              />
                            </OverflowMenu>
                          </TableCell>
                        </TableExpandRow>

                        <TableExpandedRow colSpan={tableHeaders.length + 2}>
                          <div
                            style={{ padding: '1rem', background: '#f4f4f4' }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                gap: '2rem',
                                marginBottom: '1rem',
                              }}
                            >
                              <div>
                                <p style={{ fontSize: '12px', color: '#525252' }}>
                                  Category
                                </p>
                                <p style={{ fontWeight: 500 }}>
                                  {module.category}
                                </p>
                              </div>
                              <div>
                                <p style={{ fontSize: '12px', color: '#525252' }}>
                                  Target Group
                                </p>
                                <p style={{ fontWeight: 500 }}>
                                  {module.target_group}
                                </p>
                              </div>
                              <div>
                                <p style={{ fontSize: '12px', color: '#525252' }}>
                                  Service Component
                                </p>
                                <p style={{ fontWeight: 500 }}>
                                  {module.service_component}
                                </p>
                              </div>
                            </div>

                            {module.quick_summary && (
                              <div style={{ marginBottom: '1rem' }}>
                                <p
                                  style={{
                                    fontSize: '12px',
                                    color: '#525252',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.25rem',
                                  }}
                                >
                                  Generated Summary
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
                                </p>
                                <p style={{ fontSize: '14px' }}>
                                  {module.quick_summary}
                                </p>
                              </div>
                            )}

                            {module.tags && module.tags.length > 0 && (
                              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {module.tags.map((tag) => (
                                  <Tag key={tag} type="blue" size="sm">
                                    {tag}
                                  </Tag>
                                ))}
                              </div>
                            )}
                          </div>
                        </TableExpandedRow>
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      </div>

      <CreateModuleDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={(data: ModuleCreate) => {
          console.log('New module:', data);
          setDrawerOpen(false);
        }}
      />
    </div>
  );
};

export default ModulesPage;