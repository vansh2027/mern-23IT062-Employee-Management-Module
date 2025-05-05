import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  Form,
  InputGroup,
  Modal,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmployees,
  deleteEmployee,
  searchEmployees,
} from '../slices/employeeSlice';
import { toast } from 'react-toastify';

const EmployeeListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchEmployees(searchQuery));
    } else {
      dispatch(getEmployees());
    }
  };

  const handleDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      dispatch(deleteEmployee(employeeToDelete._id));
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
    }
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2>Employee List</h2>
        <Link to='/employee/create'>
          <Button variant='primary'>Add Employee</Button>
        </Link>
      </div>

      <Form onSubmit={handleSearch} className='mb-4'>
        <InputGroup>
          <Form.Control
            type='text'
            placeholder='Search by name or role...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type='submit' variant='outline-secondary'>
            Search
          </Button>
        </InputGroup>
      </Form>

      {loading ? (
        <div className='text-center'>Loading...</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>{employee.department}</td>
                <td>{employee.status}</td>
                <td>
                  <Link to={`/employee/${employee._id}/edit`}>
                    <Button variant='info' size='sm' className='me-2'>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant='danger'
                    size='sm'
                    onClick={() => handleDelete(employee)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {employeeToDelete?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant='danger' onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeListScreen; 