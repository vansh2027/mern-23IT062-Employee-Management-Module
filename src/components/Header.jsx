import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <Link to='/'>
          <Navbar.Brand>Employee Management</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.name} id='username'>
                  <Link to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <Link to='/employee/create' className='nav-link'>
                  Add Employee
                </Link>
              </>
            ) : (
              <>
                <Link to='/login' className='nav-link'>
                  Sign In
                </Link>
                <Link to='/register' className='nav-link'>
                  Sign Up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 