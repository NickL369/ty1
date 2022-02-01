
var express = require("express")
var app = express()
var db = require("./sqlLiteBase")


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





var HTTP_PORT = 8020

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});





 

//конечное апи по которому пользователи будут узнавать кому дарить подарок
app.post("/api/santaresult", (req, res) => {
var sql = "select * from santaresult where  idresult = '"+ req.body.myid +"'" 
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
        
          "message":"Ты тайный санта для этого человека",
          "имя": rows[0].name,
          "фамилия": rows[0].lname
        
      })
    });
});



//api чтобы получить всех в новой таблице с перемешанными айди 
app.get("/api/santaresultadmin", ( res) => {
  var sql = "select * from santaresult"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

//создание новой таблицы с перемешиванием айди, айди добавляем новым столбцом и по нему будем тянуть
app.get("/api/adminmix", ( res ) => {
  
  var sql = "create table 'santaresult' as SELECT * from 'user';"
  var params = []     
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
    
      db.all("ALTER TABLE santaresult ADD idresult INTEGER")
     
      res.json({
          "message":"success",
          "data":rows
      })
    
      db.all("UPDATE `santaresult` SET `idresult` = (SELECT * FROM `santaresult` ORDER BY RAND() LIMIT 1);")
      //UPDATE `santaresult` SET  RAND_ID = SELECT RAND()*((SELECT MAX(ID) FROM `santaresult`)-1)+1;
    });
});


//получить список всех юзеров, кто уже зарегистрирован
app.get("/api/users", ( res) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});









app.post("/api/user/", (req, res) => {
    var errors=[]
   if (!req.body.name){
       errors.push("you must input FirstName");
    }
    if (!req.body.lname){
        errors.push("you must input LastName");
    }
    if (req.body.gifts){

      var strgifts = req.body.gifts.replace(/[^,]/g, '');
if(strgifts.length > 9){

      errors.push("only 10 gifts");}
  }

    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        lname: req.body.lname,
        lname: req.body.gifts
    }
    var sql ='INSERT INTO user (name, lname) VALUES (?,?,?)'
    var params =[data.name, data.lname,data.gifts]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

