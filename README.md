# DEALERSHIP API [CARS API]

Aplicacao desenvolvida para fins de avaliacao tecnica

Conteudos abordados
  - TypeORM 
  - PostgreSQL
  - Relacionamento de dados (OneToMany, eager)
  - jWT para autenticação

# How to use

 - Install all dependences
   `$ yarn`
 - Change `ormconfig.example.json` to `ormconfig.json` is a configuration to TYPEORM (PostgresSQL)
 - It uses `$ yarn typeorm migration:run` to execute migrations.
 
# Run the APP Dev server

 ```sh
    $ yarn dev:server
```
   * Attention in the configuration of the database, and do not forget to run the migrations for create tables.

# API REST
> The REST API to the example app is described below.

### Request
### Create a new user
`POST /users/`

      {
      "name": "User Example",
      "email": "user@example.com",
      "password": "example"
      }
      
#### RESPONSE

    {
      "name": "User example",
      "email": "user@example.com",
      "id": "95a5403a-0b65-42d4-96ac-a1e1d89b686f",
      "created_at": "2020-08-26T08:55:05.098Z",
      "updated_at": "2020-08-26T08:55:05.098Z"
    }
    
---
### Create a new session
`POST /sessions/`

      {
      "email": "user@example.com",
      "password": "example"
      }

#### RESPONSE
     {
        "user": {
        "id": "95a5403a-0b65-42d4-96ac-a1e1d89b686f",
        "name": "User example",
        "email": "user@example.com",
        "created_at": "2020-08-26T08:55:05.098Z",
        "updated_at": "2020-08-26T08:55:05.098Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg0MjE0NjIsImV4cCI6MTU5ODUwNzg2Miwic3ViIjoiOTVhNTQwM2EtMGI2NS00MmQ0LTk2YWMtYTFlMWQ4OWI2ODZmIn0.GUESKRO0SHvxvHXD_pt8frZrCPRIvRA3RE6Ut31-J4I"
    }
    

----
### Add new vehicle
`POST /vehicles/`

    {
	"brand": "Jeep Compass",
	"model": "RENEGADE",
	"year": 2015,
	"fuel": "gasoline", 
	"color": "Preto",
	"price": 46000,
	"category": "ELETRICO" 
	}
	
* All are required.
* Fuel accepts only 3 parameters. Parameters accepted: **Gasoline**, **Alcohol**, and **Flex**.

#### RESPONSE
    {
    	"brand": "Jeep Compass",
    	"model": "RENEGADE",
    	"year": 2015,
    	"fuel": "Gasoline",
    	"color": "Preto",
    	"price": 46000,
    	"category": "compacto"
    }
----
### Show vehicles
`GET /vehicles/:id?`

* Id not required, enter id to display only unique records. 

#### Example route to use id
`GET /vehicles/84a234e8-3671-43d7-9060-275335d11d3b`

#### RESPONSE
      {
        "id": "84a234e8-3671-43d7-9060-275335d11d3b",
        "brand": "peugeot",
        "model": "allure 1.6 at",
        "year": 2008,
        "fuel": "gasolina",
        "color": "branco",
        "price": "46000.00",
        "category_id": "a2206d12-f304-40d2-ae4d-96a36ca2c8de",
        "created_at": "2020-08-26T04:53:41.174Z",
        "updated_at": "2020-08-26T05:00:57.956Z",
        "category": {
          "id": "a2206d12-f304-40d2-ae4d-96a36ca2c8de",
          "title": "economico",
          "created_at": "2020-08-26T04:54:03.605Z",
          "updated_at": "2020-08-26T04:54:03.605Z"
        }
      }
----

#### Example route to use filtering 
`GET /vehicles/?brand=jeep`
* Accepted query parameters for filtering records : **brand**, **color**, **fuel**, **category**, and **model**.
#### RESPONSE
      {
        "id": "84a234e8-3671-43d7-9060-275335d11d3b",
        "brand": "peugeot",
        "model": "allure 1.6 at",
        "year": 2008,
        "fuel": "gasolina",
        "color": "branco",
        "price": "46000.00",
        "category_id": "a2206d12-f304-40d2-ae4d-96a36ca2c8de",
        "created_at": "2020-08-26T04:53:41.174Z",
        "updated_at": "2020-08-26T05:00:57.956Z",
        "category": {
          "id": "a2206d12-f304-40d2-ae4d-96a36ca2c8de",
          "title": "economico",
          "created_at": "2020-08-26T04:54:03.605Z",
          "updated_at": "2020-08-26T04:54:03.605Z"
        }
      },
      {
        "id": "8912768a-aaa1-4cdd-bd0d-8d24349640f4",
        "brand": "jeep",
        "model": "renegade",
        "year": 2015,
        "fuel": "gasolina e alcool",
        "color": "preto",
        "price": "46000.00",
        "category_id": "d0a7d738-aa1a-4b7a-8d74-dd739de13ae7",
        "created_at": "2020-08-26T05:15:48.222Z",
        "updated_at": "2020-08-26T05:15:48.222Z",
        "category": {
          "id": "d0a7d738-aa1a-4b7a-8d74-dd739de13ae7",
          "title": "suv",
          "created_at": "2020-08-26T05:15:48.180Z",
          "updated_at": "2020-08-26T05:15:48.180Z"
        }
      },
      }

### Update vehicle
`PUT /vehicles/:id`

    {
        "brand": "peugeot",
        "model": "allure 1.6 at",
        "year": 2008,
        "fuel": "gasoline",
        "color": "branco",
        "price": "46000.00",
        "category": "Economico"
    }
* All are required. 

#### RESPONSE
      {
        "id": "84a234e8-3671-43d7-9060-275335d11d3b",
        "brand": "peugeot",
        "model": "allure 1.6 at",
        "year": 2008,
        "fuel": "gasoline",
        "color": "branco",
        "price": "46000.00",
        "category_id": "a2206d12-f304-40d2-ae4d-96a36ca2c8de",
        "created_at": "2020-08-26T04:53:41.174Z",
        "updated_at": "2020-08-26T05:00:57.956Z",
        "category": {
          "id": "a2206d12-f304-40d2-ae4d-96a36ca2c8de",
          "title": "economico",
          "created_at": "2020-08-26T04:54:03.605Z",
          "updated_at": "2020-08-26T04:54:03.605Z"
        }
      }
     
----

### Delete vehicle
`DELETE /vehicles/:id`

#### RESPONSE
> 204  NO CONTENT

    
#### Building for deploy
For production release:
```sh
$ yarn build
```
It will generate the dist folder




