# FileZ-Server

## Features
* admin can list all users with their usage storage,
* admin can see number of uploaded files ,
* admin can see  usage storage,
* admin can delete user,
* admin can add new admin,
* user can uploade files,
* user can add folders,
* user can move files to folders,
* user can  moved this file to trash, 
* user can delete file from trash,
* user can sort file by type,
* user can search on file,
* User can update his profile,
* max file size for free package 50MB

## Installation
```
$ npm i 
```
## Start !
```
$ npm start 
```

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

Response:**JWT Token**

```
{
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMzExMDNiODdiYTA4MDBmMzQ1NWRkMCIsImlhdCI6MTU0NjcxOTI5MSwiZXhwIjoxNTQ3MzI0MDkxfQ.0R4BXIdDgh2c3WZdVkYw8-VXDIWSP4-8ruFMCGO4lEc
    
}
```
#### login

Link:[/api/user/login](http://localhost:5000/api/user/login)
<br><br>
Method: **POST**	
<br><br>
email: Required 
<br><br>
password: Required 
<br><br>

Response:**JWT Token**

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
public: Required | 0 = private  or 1 = public
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

Link:[/api/files/](http://localhost:5000/api/files)
<br><br>
Method: **GET**	
<br><br>
token: Required | user shoud be user should be authenticated

Response:

```
[
    {
        "data": [
            {
                "_id": "5c38f4edf7a2749642f8329f",
                "user": "5c362005a267641767dac7a7",
                "name": "BookAppReact-master.zip",
                "size": 7115701,
                "main": 1,
                "bin": false,
                "type": "application/x-zip-compressed",
                "public": 1,
                "FilePath": "5c362005a267641767dac7a7/fcbf2570-15da-11e9-83c3-67f99aa51e83BookAppReact-master.zip",
                "uptime": "11/1/2019",
                "__v": 0
            },
            {
                "_id": "5c3d804f96e3052dc376fbfa",
                "user": "5c362005a267641767dac7a7",
                "name": "1.png",
                "size": 86973,
                "main": 1,
                "bin": false,
                "type": "image",
                "public": 1,
                "FilePath": "6a660960-1890-11e9-a9fb-b579ce37b8bb1.png",
                "uptime": "15/1/2019",
                "__v": 0
            }
        ]
    },
    {
        "session": {
            "_id": "5c362005a267641767dac7a7",
            "name": "rasheed",
            "package": "free",
            "limit": "70386794",
            "email": "rasheed@rasheed",
            "role": 1,
            "porfileImg": "f438acc0-17c2-11e9-b78b-79b755faf69buser.png",
            "__v": 0
        }
    }
]
```

#### get all files in folder

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


#### Move file to Trash

Link:[/api/files//bin/add/:id](http://localhost:5000/api/files/bin/add/5c38bfe334573927d79820a5)
<br><br>
Method: **POST**	
<br><br>
token: Required | user shoud be user should be authenticated
<br><br>
Response:

```
File has been move to trash 
```

#### Recovery file from Trash

Link:[/api/files/bin/:id](http://localhost:5000/api/files/bin/5c38bfe334573927d79820a5)
<br><br>
Method: **POST**	
<br><br>
token: Required | user shoud be user should be authenticated
<br><br>
Response:

```
File has been Recovery 
```

#### DELETE file in Trash

Link:[/api/files/bin/:id](http://localhost:5000/api/files/bin/5c38bfe334573927d79820a5)
<br><br>
Method: **DELETE**	
<br><br>
token: Required | user shoud be user should be authenticated
<br><br>
Response:

```
the file has been deleted
```

#### Recovery file from Trash

Link:[/api/files/bin/add/:id](http://localhost:5000/api/files/bin/5c38bfe334573927d79820a5)
<br><br>
Method: **DELETE**	
<br><br>
token: Required | user shoud be user should be authenticated
<br><br>
file_id: Required
<br><br>
Response:

```
the file has been deleted
```

#### Update user Profile

Link:[/api/user/update/](http://localhost:5000/api/user/update/)
<br><br>
Method: **POST**	
<br><br>
token: Required | user shoud be user should be authenticated
<br><br>
name: Required Or file or both
<br><br>
Response:

```
the Profile update successfully
```

#### Check Login

Link:[/api/user/checklogin](http://localhost:5000/api/user/checklogin/)
<br><br>
Method: **GET**	
<br><br>
token: Required | user shoud be user should be authenticated
<br><br>
Response:

```
[
    {
        "auth": "login"
    },
    {
        "sesson": {
            "_id": "5c362005a267641767dac7a7",
            "name": "rasheed",
            "package": "free",
            "limit": "70386794",
            "email": "rasheed@rasheed",
            "role": 1,
            "porfileImg": "f438acc0-17c2-11e9-b78b-79b755faf69buser.png",
            "__v": 0
        }
    }
]
```




#### Add new admin by admin only!

Link:[/admin/add](http://localhost:5000/api/use//admin/add)
<br><br>
Method: **POST**
<br><br>
token: Required | user shoud be user should be authenticated 
<br><br>
Role: Required | should be 1 means user rolye Admin 
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
A new Admin has been Added
    
}
```


#### Get all users admin only!

Link:[/api/user/admin/users/](http://localhost:5000/api/user/admin/users/)
<br><br>
Method: **GET**	
<br><br>
token: Required | user shoud be user should be authenticated
<br><br>
Role: Required | should be 1 means user rolye Admin 
<br><br>
Response:

```
[
     {
        "_id": "5c362005a267641767dac7a7",
        "name": "rasheed2",
        "package": "free",
        "limit": "70386794",
        "email": "rasheed@rasheed",
        "password": "$2a$10$tqw2f5rYm0vaVGTRFoI0G.jly/Isis7z0H08aejckfvN6mVbfwoJ2",
        "role": 1,
        "porfileImg": "f438acc0-17c2-11e9-b78b-79b755faf69buser.png",
        "__v": 0
    },
    {
        "_id": "5c38fc27f7a2749642f832a7",
        "name": "rasheed",
        "package": "free",
        "limit": "97824529",
        "email": "rasheed@rasheed2",
        "password": "$2a$10$CzTpLjKHMSFlw3WuQK6.EO17WbXxyr/1JRo.xFMa/TIA8ylVq2W.a",
        "role": 0,
        "porfileImg": "defaultUser.png",
        "__v": 0
    },
    {
        "_id": "5c39ffacf17904e0d6accaeb",
        "name": "rsheed",
        "package": "free",
        "limit": "100000000",
        "email": "rsheed",
        "password": "$2a$10$QhhIY6CO31ok76cWKO48V.4dH2mLmUbMez6Hzs1jUvfR4Nib9UMtu",
        "role": 1,
        "porfileImg": "defaultUser.png",
        "uptime": "12/1/2019",
        "__v": 0
    },
    {
        "_id": "5c3a03c6ba96fc03bf3d291b",
        "name": "rsheed2",
        "package": "free",
        "limit": "100000000",
        "email": "rsheed2",
        "password": "$2a$10$4pFTJBSE8ztpUZ5lNyyZAeMyoSTahhWDJfxm6seGoZdYuh0lfZ88C",
        "role": 1,
        "porfileImg": "defaultUser.png",
        "uptime": "12/1/2019",
        "__v": 0
    },
]
```
#### Get get files info by  admin only!

Link:[/api/user/admin/filesinfo/](http://localhost:5000/api/user/admin/filesinfo/)
<br><br>
Method: **GET**	
<br><br>
token: Required | user shoud be user should be authenticated
<br><br>
Role: Required | should be 1 means user rolye Admin 
<br><br>
Response:

```
 [
    {
        "_id": "files",
        "totalFilesUplodedSize": 322361568,
        "totalFiles": 38
    }
]
```


### FrontEnd [Repo](https://github.com/rasheed92/FileZ-React)















