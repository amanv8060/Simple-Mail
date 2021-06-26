### Auth APIs

1. Create User

```bash
PUT auth/user/signup

Header
Content-Type: application/json

Body
{
    name: String,
    email: String,
    password: String,
}

Response
Status: 200
{ message: 'User Registered Successfully' }

Status: 500
{ message: Error(Whatever the error is) }
```

2. User Signin

```bash
POST auth/user/signin

Header
Content-Type: application/json

Body
{
    email: String,
    password: String
}

Response
Status: 200
Header
{ Set-Cookie: x-access-token=JWT }
{
    id: user._id,
    name: user.name,
    email: user.email,
    avtarUrl: user.avtarUrl,
    scheduledemails: List of Scheduled Emails
    token:token
}

Status: 401
{ message: 'Invalid Password' }

Status: 404
{ message: 'Email Not Found' }

Status: 500
{ message: Error(Whatever the error is) }
```


3. JWT Verify

```bash
POST token/verify

Header
x-access-token: JWT

Response
Status: 200
{ message: 'Token Verified' }

Status: 403
{ message: 'No token provided!' }

Status: 401
{ message: 'Unauthorized!' }
```

4. User Exists

```bash
GET auth/user/exists

Query
lId = String

Response
Status: 200
{ message: true }

Status: 401
{ message: false }
```

5. Get User Data

```bash
GET auth/user/getdata

Header
Content-Type: application/json
x-access-token: JWT

Response
Status: 200
{
    _id: user._id,
    name: user.name,
    email: user.email,
    scheduledmails: List of Scheduled Emails
}

Status: 401
{ message: 'Invalid Password' }

Status: 404
{ message: 'Email Not Found' }

Status: 500
{ message: Error(Whatever the error is) }
```

6. Google Login

```bash
GET auth/user/getdata

Header
Content-Type: application/json

Body
{
    tokenId:String
}

Response
Status: 200
{
    id: user._id,
    name: user.name,
    email: user.email,
    avtarUrl: user.avtarUrl,
    scheduledemails: user.scheduledemails,
    token: token,
}

Status: 500
{ message: Error(Whatever the error is) }
```
