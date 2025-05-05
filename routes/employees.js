const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Employee = require('../models/Employee');

// Get all employees
router.get('/', protect, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single employee
router.get('/:id', protect, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create employee
router.post('/', protect, async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update employee
router.put('/:id', protect, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete employee
router.delete('/:id', protect, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search employees
router.get('/search/:query', protect, async (req, res) => {
  try {
    const query = req.params.query;
    const employees = await Employee.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { role: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 