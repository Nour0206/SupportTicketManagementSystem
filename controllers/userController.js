const User = require('../models/User');

const getUsersByRole = async (req, res) => {
    try {
        const users = await User.find({ role: req.params.role });
        if (users.length === 0) {
            return res.status(404).send({ message: "No users found with this role" });
        }
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getUsersByRole,
};