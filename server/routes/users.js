    const express = require('express');
    const router = express.Router();

    const User = require('../models/users.model')


//💥💥💥 GET ALL USERS

    router.get('/', (req, res, next)=>{
        console.log('🔰 - Attempting to GET Users.')

        User.find()
            .then(x => {
                console.log('✔️ - Users Found!');
                console.log(req.body)
                console.log(x);
                res.json(x);
                console.log('✔️ - Users Returned!');
            })
            .catch(err => {
                console.log('❌ - Error Loading Users!')
                res.status(400).json('Error: ' + err);
        });
    });

//💥💥💥 GET USER INFO ----- TEST -----

router.post('/info', (req, res, next)=>{
    console.log('🔰 - Attempting to GET Users.')
    console.log(req.body)
    console.log(`INFO IP address is: `+ req.body.ip)

   User.findOne({user_ip: req.body.ip})
    //.exec()
    //.then((res) => {return res.json();})
    .then( x=> {
        console.log('✔️ - User Found!');
        console.log(x);
        res.json(x); 
        console.log('✔️ - User Returned!');
    })
    .catch(err => {
        console.log('❌ - Error Loading User!')
        res.status(400).json('Error: ' + err);
});
      
});



//💥💥💥 ADD NEW USER / UPDATE EXISTING USER

    router.post('/add', async (req, res, next)=>{
        console.log('🔰 - Attempting to ADD User.')
        console.log(req.body.id)
        //First verify user does not exist ✔️

        let userLookup = await User.findOne({user_ip: req.body.ip});
        let userAlreadyExists = userLookup !== null;

        //add user

        if (userAlreadyExists === false) { 
            console.log('✔️ - User does not exist!')

        const newUser = new User({
            user_ip: req.body.ip,
            can: [req.body.can[0], req.body.can[1], req.body.can[2]],
            datecreated: Date.now(),
            timestamps: Date.now()
        });

        console.log('✔️ - User object created. Attempting to Save to Database.')

        newUser.save()
        .then((x)=> {
            console.log('✔️ - User Successfully Saved to Database!');
            console.log(x);
            res.json(x);
        })
        .catch(err => {
            console.log('❌ - Error Saving User!');
            res.status(400).json('Error: ' + err);
        });
        }
        else {
 
            console.log('⚠️ - User Already Exists.');
            console.log('🔰 - Attempting to UPDATE User.');

            await User.findOne({user_ip: req.body.ip})
                .then(x => {
                    x.can = [req.body.can[0], req.body.can[1], req.body.can[2]];
                    x.timestamps = Date.now();

                    console.log(x);
                    console.log('✔️ - User object created. Attempting to UPDATE the Database.');
    
                    x.save()
                        //.then(response => {return response.json()})
                        .then(response => {
                            console.log('✔️ - User Successfully Updated!');
                            console.log(response);
                            res.json(response);
                        })
                        .catch(err => {
                            console.log('❌ - Error Updating User!');
                            res.status(400).json('Error: ' + err);
                        });

                });
        }
    });

//💥💥💥 UPDATE USER

    router.post('/update/:id', (req, res)=>{
        console.log('🔰 - Attempting to UPDATE User.')

        User.findById(req.params.id)
            .then(x => {
                x.user_ip = req.body.ip
                x.can = [req.body.can[0], req.body.can[1], req.body.can[2]]
                x.timestamps = Date.now()

                //ONLY UPDATING NAME FOR NOW - NEED TO INCLUDE OTHER VARIABLES
                //need to update timestamp

                console.log('✔️ - User object created. Attempting to UPDATE the Database.')

                x.save()
                    .then(()=> {
                        console.log('✔️ - User Successfully Updated!');
                        res.json('User Added!');
                    })
                    .catch(err => {
                        console.log('❌ - Error Updating User!')
                        res.status(400).json('Error: ' + err)
                    });
            });
    });


//💥💥💥 DELETE USER

    //User shouldn't need deletion.

    module.exports = router;