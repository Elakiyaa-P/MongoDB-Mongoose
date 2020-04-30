const Product = require('../../models/product')

module.exports = function (router) {

    //GET: The 12 newest product meeting notes
    router.get('/product', function (req, res) {
        // res.send("Bonjour Elite");
        Product.find({}, (err, product) => {

            //Check if error was found or not
            if (err) {
                res.json({ success: false, message: err });  //Returns error msg
            }
            else {
                //Check if product were found in database
                if (!product) {
                    res.json({ success: false, message: 'No product found!' });  //Returns error of 'No product found'
                }
                else {
                    res.json({ success: true, product: product });   //Returns success and product array 
                }
            }
        });
    });

    //POST: Get new meeting note document...
    router.post('/product', function (req, res) {
        let note = new Product(req.body)
        note.save(function (err, note) {
            if (err) {
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        });
    });

    //PUT: Updating product record
    router.put('/updateProduct', (req, res) => {

        //Check if id was provided
        if (!req.body._id) {
            res.json({ success: false, message: 'No product id was provided' }); //Returns error msg
        }
        else {
            //Check if id exists in database
            Product.findOne({ _id: req.body._id }, (err, product) => {
                //Check if id is a valid one
                if (err) {
                    res.json({ success: false, message: 'No product id was provided' }); //Returns error msg
                }
                else {
                    product.prod_name = req.body.prod_name;
                    product.prod_desc = req.body.prod_desc;
                    product.prod_price = req.body.prod_price;
                    product.manuf_date = req.body.manuf_date;
                    product.exp_date = req.body.exp_date;
                    product.barcode = req.body.barcode;

                    product.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err }); //Returns error msg
                        }
                        else {
                            res.json({ success: true, message: 'Product Updated!' });    //Returns Success msg
                        }
                    });
                }
            });
        }
    });

    //DELETE: Removing the doc by passing the id
    router.delete('/deleteProduct/:id', (req, res) => {
        //Check if ID was provided in parameters
        if (!req.params.id) {
            res.json({ success: false, message: 'No id provided' });    //Returns error msg
        }
        else {
            //Check if id is found in database
            Product.findOne({ _id: req.params.id }, (err, product) => {
                //Check if error has found
                if (err) {
                    res.json({ success: false, message: 'Invalid id' });     //Returns error msg
                }
                else {
                    //Remove the product from database
                    product.remove((err) => {
                        if (err)
                            res.json({ success: false, message: err });  //Returns error msg
                        else
                            res.json({ success: true, message: 'Product Deleted!' });    //Returns Success msg
                    });
                }
            });
        }
    });
}