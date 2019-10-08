module.exports = {
    listar_alunos_turmas(req, res) {
        const { class_id } = req.params;
        let students = require('../models/ClassStudent').classes_students;

        students = students.filter(student => {
            return student.turma_id == class_id;
        });

        res.json(students);
    },

    listar_trabalhos_aluno(req, res) {
        const { student_id } = req.params;
        let works = require('../models/StudentWorks').works;

        works = works.filter(work => {
            return work.aluno_id == student_id;
        });

        res.json(works);
    },

    enviar_arquivo_trabalho(req, res, next) {
        const { work_id } = req.params;

        res.json(work_id);
    }
}