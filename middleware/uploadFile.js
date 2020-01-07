const multer = require('multer')

module.exports = postedFile => {
	const fileStorage = multer.diskStorage({
	    destination: (req, file, cb) => {
	        cb(null, 'public/img');
	    },
	    filename: (req, file, cb) => {
	        cb(null, new Date().toISOString() + '-' + file.originalname);
	    }
	});

	const fileFilter = (req, file, cb) => {
	    if (
	        file.mimetype === 'image/png' ||
	        file.mimetype === 'image/jpg' ||
	        file.mimetype === 'image/jpeg'
	    ) {
	        cb(null, true);
	    } else {
	        cb(null, false);
	    }
	};

	return multer({ storage: fileStorage, fileFilter: fileFilter }).single(postedFile)

}