const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const armazen = multer.diskStorage({
    destination:(req, file, cb) => { 
        cb(null, path.resolve(__dirname, '..', 'src', 'uploads')) },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err);
            
            const fileName = `${hash.toString('hex')}${path.extname(file.originalname)}`;

            cb(null, fileName);
        });
    }
});

const uploadImagens = multer({ storage: armazen });

module.exports = uploadImagens;