
const {
    client,
    getAllUsers,
    createUser
  } = require('./index');
  

  async function testDB() {
    try {
      console.log("Starting to test database...");
  
      const users = await getAllUsers();
      console.log("getAllUsers:", users);
  
      console.log("Finished database tests!");
    } catch (error) {
      console.error("Error testing database!");
      throw error;
    }
  }
  
async function dropTables() {
    try {
      await client.query(`
        DROP TABLE IF EXISTS users;
      `);
    } catch (error) {
      throw error;
    }
  }

  async function createTables() {
    try {
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL
        );
      `);
    } catch (error) {
      throw error;
    }
  }

  
  async function createInitialUsers() {
    try {
      console.log("Starting to create users...");
  
      const albert = await createUser({ username: 'albert', password: 'bertie99' });
      const sandra = await createUser({ username: 'sandra', password: 'glamgal' });
  
      console.log(albert);
      console.log(sandra);
  
      console.log("Finished creating users!");
    } catch(error) {
      console.error("Error creating users!");
      throw error;
    }
  }




async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();

  } catch (error) {
    throw error;
  }
}
  
 
  rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());


