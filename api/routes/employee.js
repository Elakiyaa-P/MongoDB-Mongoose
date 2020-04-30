const Employee = require('../../models/employee')

module.exports = function (router) {

    //GET: The 12 newest employee meeting notes
    router.get('/employee', function (req, res) {
        // res.send("Bonjour Elite");
        Employee.find({}, (err, employee) => {

            //Check if error was found or not
            if (err) {
                res.json({ success: false, message: err });  //Returns error msg
            }
            else {
                //Check if employee were found in database
                if (!employee) {
                    res.json({ success: false, message: 'No employee found!' });  //Returns error of 'No employee found'
                }
                else {
                    res.json({ success: true, employee: employee });   //Returns success and employee array 
                }
            }
        });
    });

    //POST: Get new meeting note document...
    router.post('/employee', function (req, res) {
        let note = new Employee(req.body)
        note.save(function (err, note) {
            if (err) {
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        });
    });

    //PUT: Updating employee record
    router.put('/updateEmployee', (req, res) => {

        //Check if id was provided
        if (!req.body._id) {
            res.json({ success: false, message: 'No employee id was provided' }); //Returns error msg
        }
        else {
            //Check if id exists in database
            Employee.findOne({ _id: req.body._id }, (err, employee) => {
                //Check if id is a valid one
                if (err) {
                    res.json({ success: false, message: 'No employee id was provided' }); //Returns error msg
                }
                else {
                    employee.emp_name = req.body.emp_name;
                    employee.emp_salary = req.body.emp_salary;
                    employee.emp_address = req.body.emp_address;
                    employee.emp_phone = req.body.emp_phone;
                    employee.emp_location = req.body.emp_location;
                    employee.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err }); //Returns error msg
                        }
                        else {
                            res.json({ success: true, message: 'Employee Updated!' });    //Returns Success msg
                        }
                    });
                }
            });
        }
    });

    //DELETE: Removing the doc by passing the id
    router.delete('/deleteEmployee/:id', (req, res) => {
        //Check if ID was provided in parameters
        if (!req.params.id) {
            res.json({ success: false, message: 'No id provided' });    //Returns error msg
        }
        else {
            //Check if id is found in database
            Employee.findOne({ _id: req.params.id }, (err, employee) => {
                //Check if error has found
                if (err) {
                    res.json({ success: false, message: 'Invalid id' });     //Returns error msg
                }
                else {
                    //Remove the employee from database
                    employee.remove((err) => {
                        if (err)
                            res.json({ success: false, message: err });  //Returns error msg
                        else
                            res.json({ success: true, message: 'Employee Deleted!' });    //Returns Success msg
                    });
                }
            });
        }
    });
}