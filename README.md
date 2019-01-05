# FileZ-Server

#### register

Link:[/api/user/register](http://localhost:5000/api/user/register)
<br><br>
Method: **POST**	
<br><br>
email: Required 
<br><br>
password: Required 
<br><br>
limit:Required
<br><br>
name:Required
<br><br>

Response:

```
{
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMzExMDNiODdiYTA4MDBmMzQ1NWRkMCIsImlhdCI6MTU0NjcxOTI5MSwiZXhwIjoxNTQ3MzI0MDkxfQ.0R4BXIdDgh2c3WZdVkYw8-VXDIWSP4-8ruFMCGO4lEc
    
}
```
#### login

Link:[/api/user/register](http://localhost:5000/api/user/register)
<br><br>
Method: **POST**	
<br><br>
email: Required 
<br><br>
password: Required 
<br><br>

Response:

```
{
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMzExMDNiODdiYTA4MDBmMzQ1NWRkMCIsImlhdCI6MTU0NjcxOTQ4NywiZXhwIjoxNTQ3MzI0Mjg3fQ.vjm_hdIarHbVL0lxuSeLO8XMGO6CzW21h-VpiLJTNOE
    
}
```

#### add files

Link:[/api/files/add](http://localhost:5000/api/files/add)
<br><br>
Method: **POST**	
<br><br>
token: Required | user shoud be user should be authenticated
<br><br>
file: Required 
<br><br>
size: Required 
<br><br>
public: Required 0 or 1
<br><br>
folder: folder_id or null to main folder 
<br><br>
Response:

```
{
the file has been uploaded successfully
    
}
```

#### add folder

Link:[/api/folder/add](http://localhost:5000/api/folder/add)
<br><br>
Method: **POST**	
<br><br>
token: Required | user shoud be user should be authenticated
<br><br>

name: Required 
<br><br>

Response:

```
{
    "_id": "5c31125d87ba0800f3455dd2",
    "name": "test",
    "user": "5c30abbb9dd573a9deac88d9",
    "__v": 0
}
```
#### get all folders

Link:[/api/folder](http://localhost:5000/api/folder/)
<br><br>
Method: **GET**	
<br><br>
token: Required | user shoud be user should be authenticated

Response:

```
[
 
    {
        "_id": "5c31125d87ba0800f3455dd2",
        "name": "folder 1",
        "user": "5c30abbb9dd573a9deac88d9",
        "__v": 0
    },
    {
        "_id": "5c3113a987ba0800f3455dd3",
        "name": "folder 2",
        "user": "5c30abbb9dd573a9deac88d9",
        "__v": 0
    }
]
```
#### get all files

Link:[/api/files/folder/:id](http://localhost:5000/api/files/folder/5c30c104bb23d3ac2257fa5c)
<br><br>
Method: **GET**	
<br><br>
token: Required | user shoud be user should be authenticated

Response:

```
[
    {
        "_id": "5c310a9c026dc8af66bd973d",
        "user": "5c30ab270ac48ca25e63be6d",
        "name": "asset 11.png",
        "size": 0,
        "main": 0,
        "type": "image/png",
        "public": 1,
        "FilePath": "5c30ab270ac48ca25e63be6d/350469c0-1123-11e9-b9a5-55b0e56889aeasset 11.png",
        "__v": 0,
        "folder": "5c30c104bb23d3ac2257fa5c"
    },
    {
        "_id": "5c310aa2026dc8af66bd973e",
        "user": "5c30ab270ac48ca25e63be6d",
        "name": "asset 11.png",
        "size": 0,
        "main": 0,
        "folder": "5c30c104bb23d3ac2257fa5c",
        "type": "image/png",
        "public": 1,
        "FilePath": "5c30ab270ac48ca25e63be6d/38972d70-1123-11e9-b9a5-55b0e56889aeasset 11.png",
        "__v": 0
    }
]
```
#### Move file to folder

Link:[/api/files/move/:id](http://localhost:5000/api/files/move/5c310aa2026dc8af66bd973e)
<br><br>
Method: **POST**	
<br><br>
token: Required | user shoud be user should be authenticated
<br><br>
folder: Required
<br><br>
Response:

```
Number of updated users is 1
```
















