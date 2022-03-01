const { Pool } = require('pg');
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	password: 'postgres',
	port: 5433,
	database: 'repertorio',
});
// INSERTAR
const insertar = async (datos) => {
	const insert = {
		rowMode: 'array',
		text: 'INSERT INTO repertorio (cancion, artista, tono) VALUES ($1, $2, $3) RETURNING *;',
		values: datos,
	};
	try {
		const result = await pool.query(insert);
		return result;
		//
	} catch (error) {
		console.log('Error:', error);
		return error;
	}
};
//
// CONSULTAR
const consultar = async () => {
	try {
		const result = await pool.query(`SELECT * FROM repertorio`);
		if (result.rows != '') {
			console.log('Consulta tabla: ', result.rows);
			return result.rows;
		}
	} catch (error) {
		console.log(error);
		return error;
	}
};
// EDITAR
const editar = async (datos) => {
	console.log(datos);
	try {
		const result =
			await pool.query(`UPDATE repertorio SET cancion = '${datos[1]}', artista = '${datos[2]}', tono = '${datos[3]}'
            WHERE id = ${datos[0]} RETURNING *`);
		return result;
	} catch (error) {
		console.log(error);
		return error;
	}
};
// ELIMINAR
const eliminar = async (id) => {
	console.log(id);
	try {
		const result = await pool.query(`DELETE FROM repertorio WHERE id = '${id}' RETURNING *`);
		console.log(result.rows);
		return result;
	} catch (error) {
		console.log(error);
		return error;
	}
};
// EXPORT
module.exports = { insertar, consultar, editar, eliminar };
