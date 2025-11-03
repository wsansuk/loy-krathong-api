const Krathong = require("../models/krathong.model");

// Create a new Krathong
const createKrathong = async (req, res) => {
  try {
    const { krathong_type, emp_name, emp_department, emp_wish } = req.body;
    const krathong = await Krathong.create({
      krathong_type,
      emp_name,
      emp_department,
      emp_wish,
    });
    res.status(201).json({ data: krathong });
  } catch (error) {
    console.error(error);
    res.status(500).json({ response_code: "0500", response_message: "Internal server error" });
  }
};

// Get latest 20 Krathongs
const getKrathongs = async (req, res) => {
  try {
    const krathongs = await Krathong.findAll({
      limit: 20,
      order: [["created_at", "DESC"]],
    });
    res.json({ data: krathongs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ response_code: "0500", response_message: "Internal server error" });
  }
};

module.exports = { createKrathong, getKrathongs };
