const router = require("express").Router();
const Form = require('../models/form');
const bodyParser = require('body-parser');
router.use(bodyParser.json());


router.post('/:userId', (req, res) => {
    const form = new Form();
    form.userId = req.params.userId,
        form.item = req.body.item,
        form.images = req.body.images,
        form.scale = req.body.scale,
        form.getDesignerHome = req.body.getDesignerHome,
        form.haveMaterial = req.body.haveMaterial,
        form.contact = req.body.cantact,
        form.emailId = req.body.emailId,
        form.address = req.body.address,
        form.city = req.body.city,
        form.state = req.body.state,
        form.country = req.body.country,
        form.pincode = req.body.pincode,
        form.quantity = req.body.quantity

    form.save((err, doc) => {
        if (!err) {
            res.status(200).send(doc);
            console.log("Custome design submitted");
        } else {
            res.status(500).send(err);
            console.log("Erro  while sending the custom design");
        }
    })
})

module.exports = router;