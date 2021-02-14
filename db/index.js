const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PW,
    database : process.env.DB_NAME,
    port: 3306
  }
});

const testCon = function (){
  knex.select().table("file_paths")
  .then(function(rows){
      rows.forEach( row => console.log(row.file_id))
  })
  .catch(function(error) { console.error(error); });
}
 
module.exports = {knex, testCon}