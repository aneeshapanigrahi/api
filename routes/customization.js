const router = require("express").Router();
const Customizations = require('../models/customize');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.route('/') //Done
    .get((req, res, next) => {
        Customizations.find({})
            .populate('tags')
            .then((customizations) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(customizations);
            }, (err) => next(err))
            .catch((err) => next(err));
    })//Done
    .post((req, res, next) => {
        Customizations.create(req.body)
            .then((customization) => {
                console.log('Customization Created ', customization);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(customization);
            }, (err) => next(err))
            .catch((err) => next(err));
    })//Done
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /customizations');
    })//Done

router.route('/:customizationId')//Done
    .get((req, res, next) => {
        Customizations.findById(req.params.customizationId)
            .populate('tags')
            .then((customization) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(customization);
            }, (err) => next(err))
            .catch((err) => next(err));
    })//Done
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /customizations/' + req.params.customizationId);
    })//Done
    .put((req, res, next) => {
        Customizations.findByIdAndUpdate(req.params.customizationId, {
            $set: req.body
        }, { new: true })
            .then((customization) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(customization);
            }, (err) => next(err))
            .catch((err) => next(err));
    })//Done
    .delete((req, res, next) => {
        Customizations.findByIdAndRemove(req.params.customizationId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });//Done

router.route('/:customizationId/tags')//Done
    .get((req, res, next) => {
        Customizations.findById(req.params.customizationId)
            .populate('tags')
            .then((customization) => {
                if (customization != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(customization.tags);
                }
                else {
                    err = new Error('Customization' + req.params.customizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })//Done
    .post((req, res, next) => {
        Customizations.findById(req.params.customizationId)
            .then((customization) => {
                if (customization != null) {
                    // req.body.tag_id = req.params._id;
                    customization.tags.push(req.body);
                    customization.save()
                        .then((customization) => {
                            Customizations.findById(customization._id)
                                .populate('tags')
                                .then((customization) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(customization);
                                })
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Customization ' + req.params.customizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })//Done
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes/'
            + req.params.customizationId + '/tags');
    })//Done

router.route('/:customizationId/tags/:tagId')//Done
    .get((req, res, next) => {
        Customizations.findById(req.params.customizationId)
            .populate('tags')
            .then((customization) => {
                if (customization != null && customization.tags.id(req.params.tagId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(customization.tags.id(req.params.tagId));
                }
                else if (customization == null) {
                    err = new Error('Customization ' + req.params.customizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Tag ' + req.params.tagId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })//Done
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /customizations/' + req.params.customizationId
            + '/tags/' + req.params.tagId);
    })//Done
    .put((req, res, next) => {
        Customizations.findById(req.params.customizationId)
            .then((customization) => {
                if (customization != null && customization.tags.id(req.params.tagId) != null) {
                    if (req.body.images) {
                        customization.tags.id(req.params.tagId).images = req.body.images;
                    }
                    if (req.body.name) {
                        customization.tags.id(req.params.tagId).name = req.body.name;
                    }
                    customization.save()
                        .then((customization) => {
                            Customizations.findById(customization._id)
                                .populate('tags')
                                .then((customization) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(customization);
                                })
                        }, (err) => next(err));
                }
                else if (customization == null) {
                    err = new Error('Customization ' + req.params.customizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Tag ' + req.params.tagId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })//Done
    .delete((req, res, next) => {
        Customizations.findById(req.params.customizationId)
            .then((customization) => {
                if (customization != null && customization.tags.id(req.params.tagId) != null) {

                    customization.tags.id(req.params.tagId).remove();
                    customization.save()
                        .then((customization) => {
                            Customizations.findById(customization._id)
                                .populate('tags')
                                .then((customization) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(customization);
                                })
                        }, (err) => next(err));
                }
                else if (customization == null) {
                    err = new Error('Customization ' + req.params.customizationId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Tag ' + req.params.tagId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });//Done

module.exports = router;

