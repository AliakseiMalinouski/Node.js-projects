
const EventEmitter = require('events');

class Logger extends EventEmitter {
    log = msg => {
        console.log(msg);
        this.emit('someEvent', {
            name: 'Aleksy',
            surname: 'Malinowski'
        });
        
    }
}



module.exports = Logger;