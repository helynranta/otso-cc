DATA
=============

All data in project is constructed in json files. data/model directory holds specific model structure for each own data structure. They are used in new data insertion.

Every object has id when they are sent to server. This ID will become key to this specific object in json "database".

#### account.json
Account.json holds all accounts in plain text (lol). This is for codecamp purposes to fake log in functionality. Groups are represented in integers
* 0 for manufacturers
* 1 for subcontractor

```json
{
    "id":"",
    "name":"",
    "password":"",
    "group":0
}

```
#### feedback.json
Feedback form submission. date should be represented as Date().toJSON(). Stars are in order, and should represent:
 * yleisarvosana
 * aikataulu
 * palvelu
 * siisteys

```json
{
    "id":"",
    "email":"",
    "date":"",
    "stars": [0,0,0,0],
    "comment":"",
    "recall":0
}
```
#### order.json
Represents one order. sc_id means id of the assigned subcontractor. date should be represented as Date().toJSON(). add_info means additional information from manufacturer to subcontractor.

```json
{
    "id" : "",
    "sc_id" : "",
    "date": "",
    "name": "",
    "address": "",
    "add_info": ""
}
```

#### subcontractor.json
Represents a subcontractor
```json
{
    "id" : "",
    "name" : "",
    "cat": "",
    "address" : "",
    "y":"",
    "phone":""
}
```
