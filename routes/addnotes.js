const express = require('express')

const Note = require('../models/notes')
const jwt = require('jsonwebtoken')

const { body, validationResult, header } = require('express-validator');

const router = express.Router()



const JWT_SECRET = 'HarshIsMyName';

router.post('/', body('data.title').isLength({ min: 3 }), body('data.content').isLength({ min: 10 }), async (req, res) => {

    try {

        const errors = validationResult(req);
        console.log(errors.errors)

        if (errors.errors.length==0) {

            console.log('header',req.header('auth-token'))
            
            if (req.header('auth-token')) {

                const data = jwt.verify(req.header('auth-token'), JWT_SECRET)

                console.log('auth-token-verified', data.user.id);


                const note = new Note({
                    userid: data.user.id,
                    title: req.body.data.title, content: req.body.data.content
                });
                console.log(note);
                const t = await note.save();

                res.send({ success: true })

            }
        }

        else
            throw res.send({ success: false, error: errors.errors });



    } catch (error) {

    }





}







)

module.exports = router