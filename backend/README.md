# Task Tracker API List

## /api

### GET localhost:5000/api/

#### Parameters

- NONE

#### Responses

| Code  |       Description     | 
|-------|-----------------------| 
|  200  | Successful API ping   |

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

| Code  |            Description            | 
|-------|-----------------------------------| 
|  200  | Successful database content fetch |
|Example:|```
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
```|
|  400  | Database connection failed        |
|Example:|connect ECONNREFUSED 127.0.0.1:5432|

