## DhanPe


### Local Environment Setup

#### Prerequisite

* Node & NPM
* Postgres (Optional)
* pgAdmin
* Git
* Sequelize Cli

#### Editor

Visual Studio Code

#### NPM dependencies

````
npm install -g seqeulize-cli
npm install
````

To install any NPM packages, always use `--save`

````
npm install <package_name> --save
````

#### Up and Running Local Instance

To run the app

````
npm run dev
````
App get started to listening port number 3000

### Back End

+ Keep DB models in `server/models`
+ Use Constants wherever required


#### Environment Varaible

To store the **Secret Keys**, we use `.env` file with the help of `dotenv` npm module


#### Error Handler

### Database

+ Create Table scheme with Sequelize Migration which helps to keep track of Schema changes
+ Keep table names in `snake_case`
+ Field names in `snake_case`
+ Use *UUID* for primary key
+ Limit `varchar` length
+ Set Defauld values wherever needed

#### Sequelize

+ Always use `catch` callback for every Sequelize method
+ Log the error with `error` module

#### DB Migration

[Sequelize Guide](http://docs.sequelizejs.com/manual/tutorial/migrations.html)

We are using Sequelize Migration to keep track of DB changes

+ Define the paths on `.sequelizerc` at `root` directory for config, migrations
+ Migration folder includes the Migration files

#### Enable Migration

````
npm install -g sequelize-cli
seqeulize init // it will create config, migration files at specified directory `.sequelizerc`
````

#### Create migration

````
sequelize migration:create --name "user-add-column"
````

It will create JS file with data time prefix i.e `20171205-user-admin-column.js` with Up and Down Functions

+ Use **queryInterface** to make any changes on Tables
+ Up funtion to transforming to new state
+ Down function to reverting the changes

#### Run migration

`sequelize db:migrate` to run the Migrations

#### Export and Import Commands Postgres

`pg_dump -h "host" -U "user_name" -c "db_name" > "file_name.sql"`<br />
`psql -h "host" -U "user_name" "db_name" < "file_name.sql"`


#### Build

+ Do NPM install  
`npm install`
+ Do DB Migration  
`sequelize db:migrate`
+ Do DB Seeders  
`sequelize db:seed --seed filenam1 filename2`


#### Start
`npm start`


#### Server Setup
`npm install pm2`

+ Start
`pm2 start server.js`

+ Restart
`pm2 restart ${id}`

#### Checklist

+ DB Migratiom
+ NPM Package Updates
+ Check configuration value in `.env` file
+ Port number for application
+ DB Credentails
