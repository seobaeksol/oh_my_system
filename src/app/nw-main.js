const si = require('systeminformation');
const gui = require('nw.gui');
const App = gui.App;

var win = nw.Window.get();
var body = document.getElementById('body');

win.on('minimize', function() {
    // Hide window
    this.hide();

    // Show tray
    tray = new gui.Tray({ icon: 'icon.png' });

    // Show window and remove tray when clicked
    tray.on('click', function() {
    win.show();
    this.remove();
    tray = null;
    });
});