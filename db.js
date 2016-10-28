var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(`app/store/test.db.sqlite`, sqlite3.OPEN_READWRITE);
