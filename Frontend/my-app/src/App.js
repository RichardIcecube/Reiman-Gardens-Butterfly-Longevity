import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegisterButterfly } from './pages/AdminRegisterButterfly';
import { UserTypeSelection } from './pages/UserTypeSelection';
import { AdminHome } from './pages/AdminHome';
import { PublicHome } from './pages/PublicHome';
import { PublicFact } from './pages/PublicFact';
import { DocentFact } from './pages/DocentFact';
import { PublicAdd } from './pages/PublicAdd';
import { DocentHome } from './pages/DocentHome';
import { DocentAdd } from './pages/DocentAdd';
import { AdminAdd } from './pages/AdminAdd';
import { AdminFact } from './pages/AdminFact';
import { AdminLogin } from './pages/AdminLogin';
import { DocentLogin } from './pages/DocentLogin';
import { PublicLogin } from './pages/PublicLogin';
import { AdminManageData } from './pages/AdminManageData';
import { GenerateReport } from './pages/GenerateReport';
import { AdminAddSpecies } from './pages/AdminAddSpecies';
import { Report } from './pages/Report';
import { AdminEditDelete } from './pages/AdminEditDelete';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserTypeSelection />} />
        <Route exact path="/admin/register" element={<RegisterButterfly />} />

        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/docent/login" element={<DocentLogin />} />
        <Route exact path="/public/login" element={<PublicLogin />} />

        <Route exact path="/admin/home" element={<AdminHome />} />

        <Route exact path="/public/home" element={<PublicHome />} />
        <Route exact path="/public/add" element={<PublicAdd />} />
        <Route exact path="/public/fact" element={<PublicFact />} />
        <Route exact path="/docent/home" element={<DocentHome />} />
        <Route exact path="/docent/add" element={<DocentAdd />} />
        <Route exact path="/docent/fact" element={<DocentFact />} />
        <Route exact path="/admin/add" element={<AdminAdd />} />
        <Route exact path="/admin/fact" element= {<AdminFact/>}/>
        <Route exact path="/admin/species" element={<AdminAddSpecies/>}/>
        <Route exact path="/admin/manage" element={<AdminManageData />} />
        <Route exact path="/admin/generate" element={<GenerateReport />} />
        <Route exact path="/admin/report" element={<Report/>}/>
        <Route exact path="/admin/edit" element={<AdminEditDelete/>}/>

      </Routes>
    </Router>
  );
}

export default App;
