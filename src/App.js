import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';
import Home from './components/pages/home';
import AddTask from './components/pages/taskAdd';
import AddGoal from './components/pages/goalAdd';
import Navigation from './components/nav/nav';
import TaskDetail from './components/pages/taskDetail';
import GoalDetail from './components/pages/goalDetail';


function App() {
  return (
    <div className="app-container">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Home type="tasks" />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/goals" element={<Home type="goals"/>} />
          <Route path="/add-goal" element={<AddGoal />} />
          <Route path="/goal/:id" element={<GoalDetail />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
