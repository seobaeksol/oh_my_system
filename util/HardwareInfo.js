
var HardwareInfo = function(category) {
    this.category = category;
    this.name = "";
    this.sensors = [];

    this.setName = function(name) {
        this.name = name;
    }
}

module.exports = HardwareInfo;