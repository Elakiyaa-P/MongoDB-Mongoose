const Standup = require('../../models/standup')

module.exports = function (router) {

    //GET: The 12 newest standup meeting notes
    router.get('/standup', function (req, res) {
        //res.send("Bonjour Elite")
        Standup.find({}, (err, standup) => {

            //Check if error was found or not
            if (err) {
                res.json({ success: false, message: err });  //Returns error msg
            }
            else {
                //Check if standup were found in database
                if (!standup) {
                    res.json({ success: false, message: 'No standup found!' });  //Returns error of 'No standup found'
                }
                else {
                    res.json({ success: true, standup: standup });   //Returns success and standup array 
                }
            }
        });
    });

    //POST: Get new meeting note document...
    router.post('/standup', function (req, res) {
        let note = new Standup(req.body)
        note.save(function (err, note) {
            if (err) {
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        });
    });

    //PUT: Updating standup record
    router.put('/updateStandup', (req, res) => {

        //Check if id was provided
        if (!req.body._id) {
            res.json({ success: false, message: 'No standup id was provided' }); //Returns error msg
        }
        else {
            //Check if id exists in database
            Standup.findOne({ _id: req.body._id }, (err, standup) => {
                //Check if id is a valid one
                if (err) {
                    res.json({ success: false, message: 'No standup id was provided' }); //Returns error msg
                }
                else {
                    standup.teamMember = req.body.teamMember;
                    standup.project = req.body.project;
                    standup.workYesterday = req.body.workYesterday;
                    standup.workToday = req.body.workToday;
                    standup.impediment = req.body.impediment;
                    standup.createdOn = req.body.createdOn;
                    standup.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err }); //Returns error msg
                        }
                        else {
                            res.json({ success: true, message: 'Standup Updated!' });    //Returns Success msg
                        }
                    });
                }
            });
        }
    });

    //DELETE: Removing the doc by passing the id
    router.delete('/deleteStandup/:id', (req, res) => {
        //Check if ID was provided in parameters
        if (!req.params.id) {
            res.json({ success: false, message: 'No id provided' });    //Returns error msg
        }
        else {
            //Check if id is found in database
            Standup.findOne({ _id: req.params.id }, (err, standup) => {
                //Check if error has found
                if (err) {
                    res.json({ success: false, message: 'Invalid id' });     //Returns error msg
                }
                else {
                    //Remove the standup from database
                    standup.remove((err) => {
                        if (err)
                            res.json({ success: false, message: err });  //Returns error msg
                        else
                            res.json({ success: true, message: 'Standup Deleted!' });    //Returns Success msg
                    });
                }
            });
        }
    });
}
