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
    emails : List of Emails
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
POST auth/token/verify

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
