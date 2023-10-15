import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoutes';

function App() {
  return (
    <Routes>
      <ProtectedRoute>
        <Route path='/' element={<Home />} />
      </ProtectedRoute>
      <Route path='/login/' element={<div>Login</div>} />
    </Routes>
  );
}

export default App;
