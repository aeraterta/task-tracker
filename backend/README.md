# Task Tracker API List

## /api

### GET localhost:5000/api/

#### Parameters

- NONE

#### Responses
 - **200**: Successful API ping
```
{
    "message": "Welcome to task tracker API!"
}
```

## /api/todo

### GET localhost:5000/api/todo

#### Parameters

- NONE

#### Responses

 - **200**: Successful tasks query in database
```
    {
        "id": 13,
        "taskname": "Return laptop to IS",
        "taskdue": "2022-09-09",
        "isdone": false,
        "tstamp": null
    },
    {
        "id": 14,
        "taskname": "Get clearance",
        "taskdue": "",
        "isdone": false,
        "tstamp": null
    },
    {
        "id": 12,
        "taskname": "Pass resignation letter",
        "taskdue": "2022-09-02",
        "isdone": false,
        "tstamp": null
    }
```
 - **400**: Database connection failed
```
connect ECONNREFUSED 127.0.0.1:5432
```
### POST localhost:5000/api/todo

#### Parameters

 - body 
   - *required
   - content type: application/json

```
{
  "taskname": "give mark girlfriend",
  "taskdue": "09/10/2022",
  "isdone": false,
  "tstamp": null
}
```
#### Responses

 - **200**: Successful operation
```
{
    "id": 16,
    "taskname": "give mark giraffe",
    "taskdue": "09/10/2022",
    "isdone": false,
    "tstamp": null
}
```
 - **400**: Database connection failed
```
connect ECONNREFUSED 127.0.0.1:5432
```
 - **409**: Duplicate content
```
Duplicate Content!
```

## /api/todo/:id

### PUT localhost:5000/api/todo/:id

#### Parameters

- NONE
  
#### Responses

 - **200**: Sucessful mark task as done with timestamp
```
"2022-08-30T13:45:43.224Z"
```
 - **400**: Database connection failed
```
connect ECONNREFUSED 127.0.0.1:5432
```
 - **404**: ID query does not exist
```
Can not find request task!
```

### DELETE localhost:5000/api/todo/:id

#### Parameters

- NONE
  
#### Responses

 - **200**: Successfule task delete
```
Task deleted!
```
 - **400**: Database connection failed
```
connect ECONNREFUSED 127.0.0.1:5432
```
 - **404**: ID query does not exist
```
Can not find request task!
```