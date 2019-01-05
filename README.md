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





