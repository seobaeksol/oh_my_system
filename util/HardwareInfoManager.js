
const si = require('systeminformation');
const hwi = require('./HardwareInfo')

module.exports = function () {
    this.infos = [];
    
    this.infos.push(new hwi('CPU'))
    this.infos.push(new hwi('GPU'))
    this.infos.push(new hwi('MEM'))
    this.infos.push(new hwi('DISK'))

    this.update = function() {

    }
}