const HouseModel = require("../models/houseModel")


const postHouse = async (req, res) => {
    const { headline, description, location } = req.body
    if (headline && description && location) {
        const newHouse = new HouseModel({
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

const getHouse = async (req, res) => {
    const houses = await HouseModel.find()
    res.send({ houses })
}

module.exports = { postHouse, getHouse }