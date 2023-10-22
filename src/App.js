import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoutes';
import Registration from './pages/Registration';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';


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
      <Route path='/profile/:profileId/' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }/>
      <Route path='/profile/:profileId/edit/' element={
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      } />
      <Route path='/register/' element={<Registration />} />
      <Route path='/login/' element={<Login />} />
    </Routes>
  );
}

export default App;
