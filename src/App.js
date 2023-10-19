import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoutes';
import Registration from './pages/Registration';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';


function App() {
  return (
    <Routes>      
      <Route path='/' element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>} 
      />  
      <Route path='/post/:postId/' element={
        <ProtectedRoute>
          <SinglePost />
        </ProtectedRoute>
      }/> 
      <Route path='/register/' element={<Registration />} />
      <Route path='/login/' element={<Login />} />
    </Routes>
  );
}

export default App;
