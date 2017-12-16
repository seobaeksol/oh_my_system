
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
        wmi.Query({
            class: "Win32_PerfRawData_PerfOS_Processor",
            props: ["name", "PercentProcessorTime", "Timestamp_Sys100NS"]
        }, (function(err, data) {
            total = 0;

            var sensors = [];

            if (this.raw_cpu) {
                for(var i in data) {
                    var item = data[i]
                    raw_cpu = this.raw_cpu[i]
                    usage = ((1 - 
                        ((item.PercentProcessorTime - raw_cpu.PercentProcessorTime) / 
                        (item.Timestamp_Sys100NS - raw_cpu.Timestamp_Sys100NS))) * 100
                    );
                    sensors.push(
                        new Sensor('CPU#' + item.Name,
                        (usage > 0 ? usage.toFixed(1) : "0.0") + "%")
                    );
                }
                this.cpu.sensors = sensors;
            } else {
                for(var i in data) {
                    sensors.push(
                        new Sensor('CPU#' + data[i].Name, "0.0%")
                    );
                }
                this.cpu.sensors = sensors;
            }

            this.raw_cpu = data
        }).bind(this))
    }

    this.update = function() {
        this.updateCPU();
    }
}