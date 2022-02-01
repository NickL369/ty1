
- для запуска приложения необходим node js
- требуется создать новую папку
и выполнить команлы
mkdir node-express
cd node-express (укажет дополнительный путь в папке /node-express  )
npm init  ( указать server.js для  entry point: (index.js)   )


npm install express
npm install sqlite3

- после в package.json  изменить обьект
  "scripts": {
    "start": "node server.js",
    "test": "echo "Error: no test specified" && exit 1"
  },

  "start": "node server.js",
необходимо для запуска проекта командой npm run start





после запуска для пользователей будут доступны апи

хост http://localhost:8020{{url}}
headers {Content-Type":"application/x-www-form-urlencoded"}


доступные урлы
(только урлы 1 и 5 доступны для пользователей)



1)
/api/user/
POST

входящие параметры
name - имя
lname - фамилия
gifts - желаемые подарки, но не более 10 ( список подарков указывать через запятую ",")


2)
получить всех пользователей , кто зарегистрирован на данный момент
/api/users
GET 



3)
апи создает новую таблицу и закрепляет за каждым сотрудником тайного санту
GET
/api/adminmix

4)
апи для получения финальной таблицы , где за каждый пользователем будет закреплен айди коллеги, которому нужно дарить подарок
(таблица с данными доступа только после вызова /api/adminmix )
GET
/api/santaresultadmin

5) 
по данному урлу сотрудник можно узнать для кого он является тайным сантой
(таблица с данными доступа только после вызова /api/adminmix  )
POST 
 /api/santaresult

входящие данные:
myid - айди пользователя 
