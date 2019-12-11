const configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
    	if (configValues.mode !== "dev") {
        	return `mongodb://${configValues.uname}:${configValues.pwd}@ds133533.mlab.com:33533/todo7sam`;
    	}
		return `mongodb://localhost:27017/${configValues.db}`
    }
    
}