const fs = require('fs')
const path = require('path')
const os = require('os')

var SensorsUtils = function() {

    // generate temperal dll copy in os.tmpdir. This prevent to access locked file at the same time
    this.generateLibTmpPath = function(libName) {
        var fileContent = fs.readFileSync('lib/win/' + libName)
        var tmpPath = path.join(os.tmpdir(), 'dll_cpy_' + new Date().getTime())

        fs.writeFileSync(tmpPath, fileContent)

        return path.resolve(tmpPath);
    }
}

module.exports = new SensorsUtils();