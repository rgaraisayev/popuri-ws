
class error {
    
    constructor(status, message) {
        this.code = status;
        this.message = message;
    }
 
}

module.exports = error;