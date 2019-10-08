module.exports = {
    login(req, res) {
        const { email } = req.body;
        const users = require('../models/User').users;
        let user = {};

        for (const item of users) {
            if (item.login === email) {
                user = item;
            }
        }

        res.json(user);
    }
}