import { useState } from 'react';
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
  Button,
  Dropdown,
  Tag,
} from '@carbon/react';
import { Add, Filter } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import StatusTag from '../components/StatusTag';
import { mockModules } from '../data/mockModules';
import type { Module } from '../types/module';

const headers = [
  { key: 'name', header: 'Module Name' },
  { key: 'author', header: 'Author' },
  { key: 'program', header: 'Program' },
  { key: 'status', header: 'Status' },
  { key: 'publish_date', header: 'Publish Date' },
  { key: 'actions', header: 'Actions' },
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

  const liveCount = mockModules.filter((m) => m.status === 'active').length;
  const draftCount = mockModules.filter((m) => m.status === 'draft').length;

  const filteredModules =
    selectedProgram.id === 'all'
      ? mockModules
      : mockModules.filter((m) => m.program === selectedProgram.id);

  const rows = filteredModules.map((m: Module) => ({
    id: m.id,
    name: m.name,
    author: m.author,
    program: m.program,
    status: m.status,
    publish_date: m.publish_date,
    actions: m.id,
  }));

  return (
    <div>
      <TopNav />

      <div style={{ marginTop: '3rem', padding: '2rem' }}>
        {/* Page Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Modules</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button kind="secondary">Review Queue</Button>
            <Button
              kind="primary"
              renderIcon={Add}
              onClick={() => navigate('/modules/create')}
            >
              Create Modules
            </Button>
          </div>
        </div>

        {/* Tabs Row */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '0.5rem',
            borderBottom: '2px solid #e0e0e0',
            paddingBottom: '0.5rem',
          }}
        >
          <span
            style={{
              fontWeight: 600,
              borderBottom: '2px solid #0f62fe',
              paddingBottom: '0.5rem',
              color: '#0f62fe',
            }}
          >
            All Modules
          </span>
          <span style={{ color: '#525252', cursor: 'pointer' }}>
            My Modules
          </span>
        </div>

        {/* Status Summary */}
        <p
          style={{
            fontSize: '0.875rem',
            color: '#525252',
            marginBottom: '1.5rem',
          }}
        >
          Live Modules: {liveCount} | Draft Modules: {draftCount}
        </p>

        {/* Data Table */}
        <DataTable rows={rows} headers={headers}>
          {({
            rows: tableRows,
            headers: tableHeaders,
            getTableProps,
            getHeaderProps,
            getRowProps,
            onInputChange,
          }: any) => (
            <TableContainer>
              <TableToolbar>
                <TableToolbarContent>
                  <Button
                    kind="ghost"
                    renderIcon={Filter}
                    iconDescription="Filter"
                    hasIconOnly
                    tooltipPosition="bottom"
                  />
                  <Dropdown
                    id="program-filter"
                    titleText=""
                    items={programOptions}
                    itemToString={(item: any) => item?.label || ''}
                    selectedItem={selectedProgram}
                    onChange={({ selectedItem }: any) =>
                      setSelectedProgram(selectedItem)
                    }
                    label="All Programs"
                    size="md"
                    style={{ minWidth: '180px' }}
                  />
                  <TableToolbarSearch
                    placeholder="Find module by name, author or category"
                    onChange={onInputChange}
                    expanded
                  />
                </TableToolbarContent>
              </TableToolbar>

              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {tableHeaders.map((header: any) => (
                      <TableHeader
                        {...getHeaderProps({ header })}
                        key={header.key}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRows.map((row: any) => {
                    const module = filteredModules.find(
                      (m) => m.id === row.id
                    )!;
                    return (
                      <TableRow {...getRowProps({ row })} key={row.id}>
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
                          if (cell.info.header === 'actions') {
                            return (
                              <TableCell key={cell.id}>
                                <Button
                                  kind="ghost"
                                  size="sm"
                                  onClick={() =>
                                    navigate(`/modules/${module.id}`)
                                  }
                                >
                                  View
                                </Button>
                                <Button
                                  kind="ghost"
                                  size="sm"
                                  onClick={() =>
                                    navigate(`/modules/${module.id}/edit`)
                                  }
                                >
                                  Edit
                                </Button>
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell key={cell.id}>
                              {cell.value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      </div>
    </div>
  );
};

export default ModulesPage;