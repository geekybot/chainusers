# Node.js mongoose express CRUD
Node.js CRUD application based on the MongoDB database design and Express.js framework

This Node.js CRUD code use 
- Express.js framework
- mongoose ORM
```
npm install --save express mongoose body-parser
```

### Note:

Create collection name 'books' on 'example' database at MongoDB
```
use example
```
```
db.createCollection("books")
```


#Register

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:8081/chainusers/register",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Postman-Token": "cc442dbf-e0fc-4e47-9b83-bc5c57799a8e"
  },
  "processData": false,
  "data": "{\n\t\"name\": \"Utpal Pal\",\n\t\"password\": \"PeterThiel\"\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

#login

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:8081/chainusers/login",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Postman-Token": "2fe2a3eb-5a37-4cb6-9b8d-78687dc4c3ae"
  },
  "processData": false,
  "data": "{\n\t\"id\": \"5d5ad0109f285c110c234e40\",\n\t\"password\": \"PeterThiel\"\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

#get Users
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:8081/chainusers/5d5ad0109f285c110c234e40",
  "method": "GET",
  "headers": {
    "Cache-Control": "no-cache",
    "Postman-Token": "a309ddc6-c40f-44d4-b6a7-f6f9eac50f95"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});