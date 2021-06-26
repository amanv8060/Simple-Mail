
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

Header
x-access-token: JWT
Content-Type: application/json

Body
{
name: String,
to: String,
subject: String,
body: String,,
cc: [String] (optional),
interval:{
	minutes: Number,
	hours:Number,
	days:Number,
	seconds:Number,
	}
}

Response:
Status:200
{ message: "Successful" }

Status:500
{ message: "Some Error Occurred" }
```

3. Get all sent emails
```bash
GET mails/getsent

Header
x-access-token: JWT
Content-Type: application/json

Response:
Status:200
{ sentemails:[
	 {
		"_id": String,
		"sentTime": Date,
		"email": {
			"cc": [String],
			"_id": String,
			"name": String,
			"to": String,

			"subject": String,

			"body": String,

			"from": String,
			},
		}
	]
}
Status:500
{message: 'Something went wrong' }
```

4.Edit a scheduled Mail

2. Create Email Schedule 

```bash
PUT mails/edit

Header
x-access-token: JWT
Content-Type: application/json

Body
{
name: String,
to: String,
subject: String,
body: String,,
cc: [String] (optional),
interval:{
	minutes: Number,
	hours:Number,
	days:Number,
	seconds:Number,
	},
id:String (Id of the schedule)
}

Response:
Status:200
{ message: "Successful" }

Status:500
{ message: "Some Error Occurred" }
```