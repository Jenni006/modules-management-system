import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ModulesPage from './pages/ModulesPage';
import CreateModulePage from './pages/CreateModulePage';
import ViewModulePage from './pages/ViewModulePage';
import EditModulePage from './pages/EditModulePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/modules" replace />} />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/modules/create" element={<CreateModulePage />} />
        <Route path="/modules/:id" element={<ViewModulePage />} />
        <Route path="/modules/:id/edit" element={<EditModulePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;