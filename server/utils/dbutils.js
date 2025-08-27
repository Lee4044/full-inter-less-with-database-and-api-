import{ pool } from '../config/db.js';

const userTableQuery = `
  CREATE TABLE IF NOT EXISTS app_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    username VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  );
`;


const postsTableQuery = `
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES app_users(id) ON DELETE CASCADE
      );
    `

const creaTetable = async (tableName,query) => {
  try {
    await pool.query( query );
    console.log(`${tableName} table created successfully or already exists`);

  } catch (error) {
    console.error(`Error creating ${tableName} table`, error);

  }
};

const createAllTables = async () => {
  try {
    await creaTetable('Users',userTableQuery );
    await creaTetable('Posts',postsTableQuery );
    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error );
    throw error;
  }
}

export default createAllTables;
