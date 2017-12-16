
const si = require('systeminformation');
const wmi = require('node-wmi')
const hwi = require('./HardwareInfo')
const Sensor = require('./Sensor')

module.exports = function () {
    this.infos = [];
    
    this.initCPU = function(data) {
        this.cpu.name = data.brand
    }

    // cpu
    this.cpu = new hwi('CPU')
    // raw_cpu for calcurating cpu usage
    this.raw_cpu = null;
    si.cpu(this.initCPU.bind(this))
    this.infos.push(this.cpu)
    // gpu
    this.infos.push(new hwi('GPU'))

    // mem
    this.infos.push(new hwi('MEM'))

    // disk
    this.infos.push(new hwi('DISK'))

    this.updateCPU = function(data) {
        si.currentLoad((function(data) {
            this.cpu.sensors = data.cpus.map((item, index) => new Sensor('CPU#' + index, item.load.toFixed(1)));
            this.cpu.sensors.push(new Sensor('Total', data.currentload.toFixed(1)))
        }).bind(this))
    }

    this.update = function() {
        this.updateCPU();
    }
}