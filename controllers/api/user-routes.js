const router = require('express').Router();

//const {User,Plant,Tip} = require('../../models');
const {User} = require('../../models');
const sequelize = require('../../config/connection');

router.get('/',(req,res)=>
{
    User.findAll(
        {
            attributes: { exclude: ['password'] }
        }
    )
    .then(data=>res.json(data))
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id',(req,res)=>
{
    User.findOne(
    {
        attributes: 
        { 
            exclude: ['password'] 
        },
        where: 
        {
            id : req.params.id
        }
    })
    .then(data=>res.json(data))
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/',(req,res)=>
{
    console.log("Create: " + req.body.name + req.body.email + req.body.password);
     User.create(req.body)
    .then(data=>res.json(data))
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id',(req,res)=>
{
    User.update(req.body,
        {
            where:
            {
                id: req.params.id
            }
        })
    .then(data=>res.json(data))
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id',(req,res)=>
{
    User.destroy({
            where:
            {
                id: req.params.id
            }
        })
    .then(data=>res.json(data))
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});


router.post('/login',(req,res)=>
{
    User.findOne(
        {
            where:
            {
                email: req.body.email
            }
        }
    )

    .then(data=>
    {
        if(!data)
        {
            res.status(400).json({ message: 'Incorrect username!' });
            return; 
        }

        const pwd = data.checkPassword(req.body.password);
        
        if(!pwd)
        {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => 
        {
            req.session.user_id = data.id;
            req.session.email = data.email;
            req.session.loggedIn = true;
      
            res.json({ user: data, message: 'You are now logged in!' });
        });
    })
    .catch(err => 
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/logout',(req,res)=>
{
    if (req.session.loggedIn) 
    {
        req.session.destroy(() => 
        {
            res.status(204).end();
        });
    }
    else 
    {
        res.status(404).end();
    }
});

module.exports = router;