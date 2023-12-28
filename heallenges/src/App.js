import Home from '@pages/Home';
import Layout from '@pages/Layout';
import Mypage from '@pages/Mypage';
import Login from '@pages/Login';
import {Route, Routes} from 'react-router-dom';
import Signup from '@pages/Signup';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
