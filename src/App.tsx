import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalLayout from './layouts/GlobalLayout';
import ConsoleLayout from './layouts/ConsoleLayout';

// Pages
import ModelSquare from './pages/ModelSquare';
import CodingPlan from './pages/CodingPlan';
import Docs from './pages/Docs';
import ApiRef from './pages/ApiRef';
import History from './pages/History';

// Console Pages
import Experience from './pages/Console/Experience';
import Inference from './pages/Console/Inference';
import Training from './pages/Console/Training';
import Application from './pages/Console/Application';
import ModelWorkspace from './pages/Console/ModelWorkspace';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          {/* Redirect root to console experience */}
          <Route index element={<Navigate to="/console/experience" replace />} />
          
          {/* Top Nav Independent Pages */}
          <Route path="model-square" element={<ModelSquare />} />
          <Route path="coding-plan" element={<CodingPlan />} />
          <Route path="docs" element={<Docs />} />
          <Route path="api-ref" element={<ApiRef />} />
          <Route path="history" element={<History />} />
          
          {/* Console Module */}
          <Route path="console" element={<ConsoleLayout />}>
            <Route index element={<Navigate to="experience" replace />} />
            <Route path="experience" element={<Experience />} />
            <Route path="inference" element={<Inference />} />
            <Route path="training" element={<Training />} />
            <Route path="application" element={<Application />} />
            <Route path="workspace" element={<ModelWorkspace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
