
const path = require('path')
const fs = require('fs')
const SensorsUtils = require('./SensorsUtils')
const LINE_BREAK = "\r\n";
const shell = require('node-powershell')

var PowerShellScriptHelper = function() {
    this.ps = null;

    this.dllImport = function() {
        tmpPath = SensorsUtils.generateLibTmpPath("OpenHardwareMonitorLib.dll")

        this.ps.addCommand("[System.Reflection.Assembly]::LoadFile(\""
        + tmpPath + "\")" + " | Out-Null"
        + LINE_BREAK);

        return tmpPath;
    }

    this.newComputerInstance = function() {
        this.ps.addCommand('$PC = New-Object OpenHardwareMonitor.Hardware.Computer')
        // this.ps.addCommand('$PC.CPUEnabled = $true')
        // this.ps.addCommand('$PC.RAMEnabled = $true')
        this.ps.addCommand('$PC.GPUEnabled = $true')
        // this.ps.addCommand('$PC.FanControllerEnabled = $true')
        // this.ps.addCommand('$PC.HDDEnabled = $true')
    }

    this.sensorsQueryLoop = function() {
        var cmd =
            "try" + LINE_BREAK + 
            "{" + LINE_BREAK + 
            "$PC.Open()" + LINE_BREAK + 
            "}" + LINE_BREAK + 
            "catch" + LINE_BREAK + 
            "{" + LINE_BREAK + 
            "$PC.Open()" + LINE_BREAK + 
            "}" + LINE_BREAK + 
            "ForEach ($hw in $PC.Hardware)" + LINE_BREAK + 
            "{" + LINE_BREAK + 
            "$hw" + LINE_BREAK + 
            "$hw.Update()" + LINE_BREAK + 
            "ForEach ($subhw in $hw.SubHardware)" + LINE_BREAK + 
            "{" + LINE_BREAK + 
            "$subhw.Update()" + LINE_BREAK +  
            "}" + LINE_BREAK +  
            "ForEach ($sensor in $hw.Sensors)" + LINE_BREAK +  
            "{" + LINE_BREAK +  
            "$sensor" + LINE_BREAK +  
            "Write-Host \"\"" + LINE_BREAK +  
            "}" + LINE_BREAK +  
            "}" + LINE_BREAK;
        
        this.ps.addCommand(cmd)
    }
    
    this.getPowerShellScript = function() {
        this.ps = new shell({debugMsg: false})

        tmpPath = this.dllImport()
        this.newComputerInstance();
        this.sensorsQueryLoop();

        return tmpPath;
    }

    this.getRawSensorsData = function(cb) {
        tmpPath = this.getPowerShellScript();

        this.ps.invoke().then(cb).catch(err => {
            console.error(err);
            this.ps.dispose();
        })
    }
}

module.exports = new PowerShellScriptHelper();