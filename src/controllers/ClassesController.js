module.exports = {
    listar_turmas(req, res) {
        const { teacher_id } = req.params;

        let classes = require('../models/Classes');

        classes = classes.filter(cl => {
            return cl.professor == teacher_id;
        })

        res.json(classes);
    }
}