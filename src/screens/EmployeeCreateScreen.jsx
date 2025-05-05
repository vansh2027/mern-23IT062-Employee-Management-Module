import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee } from '../slices/employeeSlice';
import { toast } from 'react-toastify';

const EmployeeCreateScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'Active',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.employee);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (profilePic) {
      formDataToSend.append('profilePic', profilePic);
    }

    try {
      await dispatch(createEmployee(formDataToSend)).unwrap();
      toast.success('Employee created successfully');
      navigate('/');
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <Card className='p-4' style={{ width: '600px' }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Add New Employee</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='role'>
              <Form.Label>Role</Form.Label>
              <Form.Select
                name='role'
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value=''>Select Role</option>
                <option value='Manager'>Manager</option>
                <option value='Developer'>Developer</option>
                <option value='Designer'>Designer</option>
                <option value='HR'>HR</option>
                <option value='Other'>Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3' controlId='department'>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type='text'
                name='department'
                value={formData.department}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='status'>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name='status'
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value='Active'>Active</option>
                <option value='Inactive'>Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3' controlId='profilePic'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
              {previewUrl && (
                <div className='mt-2'>
                  <img
                    src={previewUrl}
                    alt='Preview'
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                </div>
              )}
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              className='w-100'
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Employee'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeCreateScreen; 