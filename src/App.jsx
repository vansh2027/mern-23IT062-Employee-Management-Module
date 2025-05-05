import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import EmployeeListScreen from './screens/EmployeeListScreen';
import EmployeeEditScreen from './screens/EmployeeEditScreen';
import EmployeeCreateScreen from './screens/EmployeeCreateScreen';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<EmployeeListScreen />} />
              <Route path='/employee/create' element={<EmployeeCreateScreen />} />
              <Route path='/employee/:id/edit' element={<EmployeeEditScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
