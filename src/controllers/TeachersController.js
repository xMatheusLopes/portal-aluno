module.exports = {
    atualizar_nota_trabalho_aluno(req, res) {
        const fs = require('fs');
        const { work_id } = req.params;
        const { rate } = req.body

        let works = require('../models/StudentWorkClass');

        for (const [index, item] of works.students_works.entries()) {
            if (item.trabalho_id == work_id) {
                works.students_works[index].nota = rate;
            }
        }

        fs.writeFileSync('src/models/StudentWorkClass.json', JSON.stringify(works, null, 4));

        res.json({ ok: true });
    }
}