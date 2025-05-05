import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
    if (error) {
      toast.error(error);
    }
  }, [userInfo, error, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <Card className='p-4' style={{ width: '400px' }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign In</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              className='w-100 mb-3'
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            <div className='text-center'>
              <p>
                New User? <Link to='/register'>Register</Link>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginScreen; 