var sqlite3 = require('sqlite3').verbose()


var  DBSOURCE = "db.sqlite"


var  db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE  (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            lname text,
            gifts text
            )`,
        (err) => {
            if (err) {
             
            }else{
             
                var insert = 'INSERT INTO user (name, lname,gifts) VALUES (?,?,?)'
                db.run(insert, ("nick","lobachev","potato,corn,pasta"))
            //у меня по другому не получилось создать таблицу , поэтому я считаю , что при первом запуске мы добавляем автора всей затеи) 
            //ищу другой способ (   
            }
        });  
    }
});


module.exports = db