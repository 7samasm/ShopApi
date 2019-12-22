const configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
    	if (configValues.mode !== "dev") {
        	return `mongodb://${configValues.uname}:${encodeURIComponent(configValues.pwd)}@ds257648.mlab.com:57648/shop`;
    	}
		return `mongodb://localhost:27017/${configValues.db}`
    }
    
}