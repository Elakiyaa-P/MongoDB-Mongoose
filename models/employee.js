const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    emp_name: { type: String },
    emp_salary: { type: Number },
    emp_address: { type: String },
    emp_phone: { type: Number },
    emp_location: { type: String }
})

module.exports = mongoose.model('Employee', EmployeeSchema)
