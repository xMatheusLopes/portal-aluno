module.exports = {
    atualizar_nota_trabalho_aluno(req, res) {
        const fs = require('fs');
        const { work_id } = req.params;
        const { rate } = req.body

        let works = require('../models/StudentWorkClass');
        let studentsWorks = require('../models/StudentWorks');


        for (const [index, item] of works.entries()) {
            if (item.trabalho_id == work_id) {
                works[index].nota = rate;
            }
        }
        for (const [index, item] of studentsWorks.entries()) {
            if (item.trabalho_id == work_id) {
                studentsWorks[index].nota = rate;
            }
        }

        fs.writeFileSync('src/models/StudentWorkClass.json', JSON.stringify(works, null, 4));
        fs.writeFileSync('src/models/StudentWorks.json', JSON.stringify(studentsWorks, null, 4));

        res.json({ ok: true });
    },

    professor_trabalho(req, res) {
        const { work_id } = req.params;
        let studentsWorks = require('../models/StudentWorkClass');
        let work = {};

        for (const item of studentsWorks) {
            if (item.trabalho_id == work_id) {
                work = item;
            }
        }

        res.json(work);
    }
}