
const si = require('systeminformation');
const wmi = require('node-wmi')
const hwi = require('./HardwareInfo')
const Sensor = require('./Sensor')
const PSHelper = require('./powershell/PowerShellScriptHelper')

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
    this.gpu = new hwi('GPU')
    this.infos.push(this.gpu)

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

    this.updateGPU = function() {
        PSHelper.getRawSensorsData((output => {
            normalizedSensorsData = "";
            dataLines = output.split("\r\n");
    
            isOnSensor = false;
            isHardwareType = false;
            sensor = null
            sensors = [];

            var getProperPostFix = function(type) {
                if (type == 'Temperature')
                    return ' C'
                else if (type == 'Fan')
                    return ' RPM'
                else if (type == 'Clock')
                    return ' MHz'
                else if (type == 'Load')
                    return ' %'
                else if (type == 'SmallData')
                    return ' MB'
                else
                    return ' '
            }

            dataLines.forEach(element => {
                if (!isHardwareType && (element.indexOf('HardwareType') != -1)) {
                    isHardwareType = true;
                }

                if (isHardwareType && (element.indexOf('Name') != -1)) {
                    this.gpu.name = element.split(':')[1].trim()
                    isHardwareType = false;
                }
                if (!isOnSensor && (element.indexOf('SensorType') != -1)) {
                    sensor = new Sensor(element.split(':')[1].trim())
                    sensor.type = sensor.name
                    isOnSensor = true;
                }
                if (isOnSensor && (element.indexOf('Name') != -1)) {
                    sensor.name += ' - ' + element.split(':')[1].trim()
                }
                if (isOnSensor && (element.indexOf('Value') != -1)) {
                    sensor.value = element.split(':')[1].trim() + getProperPostFix(sensor.type)
                    isOnSensor = false;
                    sensors.push(sensor)
                }
            });

            this.gpu.sensors = sensors;
        }).bind(this))
    }

    this.update = function() {
        this.updateCPU();
        this.updateGPU();
    }
}