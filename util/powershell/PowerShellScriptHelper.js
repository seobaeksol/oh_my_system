
const path = require('path')
const fs = require('fs')
const SensorsUtils = require('./SensorsUtils')
const LINE_BREAK = "\r\n";
const shell = require('node-powershell')

// generate and execute Windows PowerShell Script
var PowerShellScriptHelper = function() {
    this.ps = new shell({debugMsg: false})

    // generate dll import query
    this.dllImport = function() {
        this.ps.addCommand("[System.Reflection.Assembly]::LoadFile(\""
        + SensorsUtils.generateLibTmpPath("OpenHardwareMonitorLib.dll") + "\")" + " | Out-Null"
        + LINE_BREAK);
    }

    // Create object and configure getting data
    this.newComputerInstance = function() {
        this.ps.addCommand('$PC = New-Object OpenHardwareMonitor.Hardware.Computer')
        // this.ps.addCommand('$PC.CPUEnabled = $true')
        // this.ps.addCommand('$PC.RAMEnabled = $true')
        this.ps.addCommand('$PC.GPUEnabled = $true')
        // this.ps.addCommand('$PC.FanControllerEnabled = $true')
        // this.ps.addCommand('$PC.HDDEnabled = $true')
    }

    // getting data
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
    
    // combine scripts
    this.getPowerShellScript = function() {

        this.dllImport()
        this.newComputerInstance();
        this.sensorsQueryLoop();
    }

    // generate script and execute
    this.getRawSensorsData = function(cb) {
        this.getPowerShellScript();
        this.ps.invoke().then(cb).catch(err => {
            console.error(err);
            this.ps.dispose();
        })
    }
}

module.exports = new PowerShellScriptHelper();