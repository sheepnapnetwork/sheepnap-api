
const  Pool  = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    password: 'rasengan-',
    database: 'postgres',
    port: '5432'
});


const getUsers = async (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    //  try{
    //     console.log('entra al try');
    //     const pool = new Pool(credentials)
    //     const response = 'papas';
    //     //const response = await pool.query('SELECT * FROM users ');
    //     console.log('hice la query');
        
    //     res.send(response);
        
    // }catch(error){
    //     console.log('entra al catch')
    //     res.status(500);
    //     res.send('ocurrio un error es',error);
    // }
        
};


const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { name, email } = req.body;
    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {name, email}
        }
    })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const response =await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    Pool
};