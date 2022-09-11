const express = require('express')
const password = require('s-salt-pepper');
const Note = require('../models/notes');
const jwt = require('jsonwebtoken')

const User = require('../models/users')

const JWT_SECRET = 'HarshIsMyName';


const router = express.Router()

router.post('/', async (req, res) => {

    console.log(req.body.data);



    if (req.body.data.password == req.body.data.confirmpassword && req.body.data.first && req.body.data.last && req.body.data.userid && req.body.data.password && req.body.data.confirmpassword) {
        if (await User.findOne({ userid: req.body.data.userid })) {
            console.log('aaa');
            res.status(400).json({success:false, error: 'A user with same userid already exist' });
        }



        else {
            let passwordhash = await password.hash(req.body.data.password)

            const user = new User({ first: req.body.data.first, last: req.body.data.last, userid: req.body.data.userid, password: passwordhash })

            await user.save();

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);

            res.send({ success:true,msg:'You have signed up successfully' })
        }
    }
})

router.post('/login', async (req, res) => {


   let a=await User.findOne({ userid: req.body.data.userid });
    if (a) {
        let pwd = await password.compare(req.body.data.password,a.password)
        if (pwd) {
            
            let user=await User.findOne({ userid: req.body.data.userid });

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);

            res.send({ success:true,authtoken })

            
        }
    }

    else {
        console.log('pls provide correct credentials')
        res.status(400).json({success:false,error:'please provide correct credentials'})
    }



    
})


module.exports = router;