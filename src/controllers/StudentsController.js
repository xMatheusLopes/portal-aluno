module.exports = {
    listar_alunos_turmas(req, res) {
        const { class_id } = req.params;
        let students = require('../models/ClassStudent');

        students = students.filter(student => {
            return student.turma_id == class_id;
        });

        res.json(students);
    },

    listar_trabalhos_aluno(req, res) {
        const { student_id } = req.params;
        let works = require('../models/StudentWorks');

        works = works.filter(work => {
            return work.aluno_id == student_id;
        });

        res.json(works);
    },

    enviar_arquivo_trabalho(req, res, next) {
        const credentials = require('../../cloud_credentials.json');
        const { work_id } = req.params;
        const { Storage } = require('@google-cloud/storage');
        const storage = new Storage({ credentials });

        if (!req.file) {
            return next();
        }

        // Deixei estatico no id para não precisar trocar o link no objeto cada vez que atualizar o arquivo
        const gcsname = Date.now() + req.file.originalname;
        const file = storage.bucket('trabalho-storage').file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            },
            resumable: false
        });

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            next(err);
        });

        stream.on('finish', () => {
            req.file.cloudStorageObject = gcsname;
            file.makePublic().then((item) => {
                // Atualiza o link no objeto
                const tools = require('../services/tools');
                tools.updateLink(work_id, gcsname);
                next();
            });
        });

        stream.end(req.file.buffer);

        res.json({ url: `https://storage.googleapis.com/trabalho-storage/${gcsname}` });
    },

    trabalho(req, res) {
        const { work_id } = req.params;
        let studentsWorks = require('../models/StudentWorks');
        let work = {};

        for (const item of studentsWorks) {
            if (item.trabalho_id == work_id) {
                work = item;
            }
        }

        res.json(work);
    }
}