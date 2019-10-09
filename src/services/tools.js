module.exports = {
    updateLink(work_id, gcsname) {
        const fs = require('fs');
        const works = require('../models/StudentWorkClass');

        for (const [index, item] of works.entries()) {
            if (item.trabalho_id == work_id) {
                works[index].link = `https://storage.googleapis.com/trabalho-storage/${gcsname}`
            }
        }

        fs.writeFileSync('src/models/StudentWorkClass.json', JSON.stringify(works, null, 4));
    }
}