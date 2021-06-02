const router = require('express').Router();

const {PieModel} = require('../models');
const middleware = require('../middleware');
// router.get('/', (req, res) => res.send('I love pies'));

router.get('/', async(req, res) =>{
    try{
        const allPies = await PieModel.findAll();

        res.status(200).json(allPies);
    } catch(err){
        res.status(500).json({
            error: err
        })
    }
});

router.get("/:name", async(req,res) => {
    try{ 
        const locatedPie = await PieModel.findOne({
        where: {nameOfPie: req.params.name}
    })
    res.status(200).json({
        message: 'Pies successfully retrieved',
        pie: locatedPie
    })
    } catch(err) {
        res.status(500).json({
            message: `Failed to retrieve pies: ${err}`
        })

    }
});

router.post('/', middleware.validateSession, async(req,res) =>{
    const {
        nameOfPie,
        baseOfPie,
        crust,
        timeToBake,
        servings,
        ratings
    } = req.body;

    try{
        const Pie = await PieModel.create({
            nameOfPie,
            baseOfPie,
            crust,
            timeToBake,
            servings,
            ratings,
        })
        const currentUser = req.user.firstName;
        res.status(201).json({
            message: "pie successfully created",
            Pie,
            currentUser
        })

    } catch (err) {
        res.status(500).json({
            message: `Failed to create pie: ${err}`
        })
    }
});


router.put('/:id', middleware.validateSession, async(req, res) =>{
    const { nameOfPie, baseOfPie, crust, timeToBake, servings, ratings} = req.body;
    try{
        const pieUpdated = await PieModel.update({nameOfPie, baseOfPie, crust, timeToBake, servings, ratings},
            {where: {id: req.params.id}}
            )

            res.status(200).json({
                message: "Pie successfuly updated",
                pieUpdated
            })
    } catch(err) {
        res.status(500).json({
            message:`failed to updated pie: ${err}`
        })

    }
});

router.delete('/:id', middleware.validateSession, async (req, res) => {
    try{
        const locatedPie = await PieModel.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            message: "pie sucessfully deleted",
            deletedPie: locatedPie

            })
        } catch(err) {
            res.status(500).json({
                message: `Failed to delete pie: ${err}`
            })
        }
    }
);

router.get('/id/:id', async(req, res) => {
    try{
        const locatedPie = await PieModel.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: 'Pies sucessfully retrieved',
            pie: locatedPie,
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to retrieve pies: ${err}`
        })
    }
});


// my attempt at delete:
// router.delete('/:id', async(req, res) => {
//     try{
//         const pieToDelete = await PieModel.remove({nameOfPie, baseOfPie, crust, timeToBake, servings, ratings},
//             {where: {id: req.params.id}}
//         )
//         res.status(410).json({
//             message: 'Pie sucessfully deleted',
    
//         })
//     } catch (err) {
//         res.status(500).json({
//             message: `Failed to delete pies: ${err}`
//         })
//     }
// })


module.exports = router;