const houseModel = require("../models/houseModel")


const postHouse = async (req, res) => {
    const { headline, description, location } = req.body
    if (headline && description && location) {
        const newHouse = new houseModel.HouseModel({
            headline,
            description,
            location
        })
        await newHouse.save()
        res.status(201).send({ "status": "success", "message": "House Successfully Added." })
    } else {
        res.send({ "status": "failed", "message": "All fields are required and fields should be headline, description and location" })
    }
}

const postFavProperty = async (req, res) => {
    const { headline, description, location } = req.body
    if (headline && description && location) {
        const newFavProperty = new houseModel.FavPropertyModel({
            headline,
            description,
            location
        })
        await newFavProperty.save()
        res.status(201).send({ "status": "success", "message": "Successfully added in your Favourite." })
    } else {
        res.send({ "status": "failed", "message": "All fields are required and fields should be headline, description and location" })
    }
}

const getHouse = async (req, res) => {
    const houses = await houseModel.HouseModel.find()
    res.send({ houses })
}

const getFavProperty = async (req, res) => {
    const houses = await houseModel.FavPropertyModel.find()
    res.send({ houses })
}


module.exports = { postHouse, getHouse, postFavProperty, getFavProperty }