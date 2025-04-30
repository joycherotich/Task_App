import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import TaskOverview from './TaskOverview';
import TaskOverview from './components/TaskOverview';
// src/components/TaskOverview.js

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/TaskOverview" element={<TaskOverview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
