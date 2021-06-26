### Mail Api

1. Delete Schedule 

```bash
DELETE mails/delete

Header
x-access-token: JWT

Query
- sId

Response
Status: 200
{message: "Schedule Deleted"}

Status: 500
{ message: "Something went wrong" }
```

2. Create Email Schedule 

```bash
PUT mails/create

