import mysql from 'mysql';

const user = 'root'
const password = '2105'
const host = 'localhost'
const database = 'SIS_ADM_USUARIOS'

const dbOptions = {
  user,
  password,
  host,
  database
}

const connection = mysql.createConnection(dbOptions);

connection.connect(err => {
  if (err) throw err;
  console.log('Conectado correctamente a la DB');
})

export default connection