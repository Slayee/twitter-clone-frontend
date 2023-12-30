import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import ProtectedRoute from './pages/ProtectedRoute';
import PageLoading from './pages/PageLoading/PageLoading';
import Feed from './pages/Feed/Feed';
import Messages from './pages/Messages/Messages';
import Bookmark from './pages/Bookmark/Bookmark';
import Lists from './pages/Lists/List';
import Profile from './pages/Profile/Profile';
import More from './pages/More/More';
import Explore from './pages/Explore/Explore';
import Notification from './pages/Notification/Notification';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}>
            <Route index element={<Feed/>}/>
          </Route>
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}>
            <Route path='feed' element={<Feed/>} />
            <Route path='explore' element={<Explore/>} />
            <Route path='notification' element={<Notification/>} />
            <Route path='messages' element={<Messages/>} />
            <Route path='bookmark' element={<Bookmark/>} />
            <Route path='lists' element={<Lists/>} />
            <Route path='profile' element={<Profile/>} />
            <Route path='more' element={<More/>} />
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/page-loading' element={<PageLoading/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
