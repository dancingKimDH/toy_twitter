
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>HomePage</h1>} />
      <Route path="/posts" element={<h1>Post List Page</h1>} />
      <Route path="/posts/:id" element={<h1>Post Detail Page</h1>} />
      <Route path="/posts/new" element={<h1>Post New</h1>} />
      <Route path="/posts/edit/:id" element={<h1>Post Edit</h1>} />
      <Route path="/profile" element={<h1>Profile</h1>} />
      <Route path="/profile/edit" element={<h1>Profile Edit</h1>} />
      <Route path="/notification" element={<h1>Notification</h1>} />
      <Route path="/search" element={<h1>Search</h1>} />
      <Route path="/users/login" element={<h1>Login</h1>} />
      <Route path="/users/signup" element={<h1>Signup</h1>} />
      <Route path="*" element={<Navigate replace to="/"/>}/>
    </Routes>
  );
}

export default App;
