import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { hashSync } from 'bcrypt';
import { handleDbError } from '@src/middlewares/errorMiddleware';
import { UserInfo } from '@src/types/user';

const createUser = async (conn: PoolConnection, userInfo: UserInfo) => {
  try {
    const sql =
      'INSERT INTO `travel_buddy`.`users` (`email`, `password`, `name`, `phone_number`, `gender`, `birth_date`) ' +
      'VALUES (?, ?, ?, ?, ?, ?);';
    const { email, password, name, phoneNumber, gender, birthDate } = userInfo;
    const values = [email, hashSync(password, 12), name, phoneNumber, gender, birthDate];
    await conn.execute(sql, values);
  } catch (error: unknown) {
    handleDbError(error);
  }
};

const createFakeUsers = async (conn: PoolConnection) => {
  try {
    const sql =
      'INSERT INTO `travel_buddy`.`users` (`email`, `password`, `name`, `phone_number`, `gender`, `birth_date`) VALUES ?;';
    const fakeUserData = [
      ['user1@example.com', 'password1', 'User 1', '1234567890', 'male', '1990-01-01'],
      ['user2@example.com', 'password2', 'User 2', '2345678901', 'female', '1991-02-02'],
      ['user3@example.com', 'password3', 'User 3', '3456789012', 'male', '1992-03-03'],
      ['user4@example.com', 'password4', 'User 4', '4567890123', 'female', '1993-04-04'],
      ['user5@example.com', 'password5', 'User 5', '5678901234', 'male', '1994-05-05'],
      ['user6@example.com', 'password6', 'User 6', '6789012345', 'female', '1995-06-06'],
      ['user7@example.com', 'password7', 'User 7', '7890123456', 'male', '1996-07-07'],
      ['user8@example.com', 'password8', 'User 8', '8901234567', 'female', '1997-08-08'],
      ['user9@example.com', 'password9', 'User 9', '9012345678', 'male', '1998-09-09'],
      ['user10@example.com', 'password10', 'User 10', '0123456789', 'female', '1999-10-10'],
    ];

    const hashedUserData = await Promise.all(
      fakeUserData.map(async (userData) => {
        return [...userData.slice(0, 1), hashSync(userData[1], 12), ...userData.slice(2)];
      }),
    );

    const values = hashedUserData
      .map((userData) => `(${userData.map((value) => `'${value}'`).join(', ')})`)
      .join(', ');
    const modifiedSql = sql.replace('?', values);

    await conn.execute(modifiedSql);
  } catch (error: unknown) {
    handleDbError(error);
  }
};

const getUser = async (conn: PoolConnection) => {
  try {
    const sql = 'SELECT * FROM users';
    const [rows] = await conn.execute<RowDataPacket[]>(sql);
    return rows;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

const getUserByEmail = async (conn: PoolConnection, email: string) => {
  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await conn.execute<RowDataPacket[]>(sql, [email]);
    return rows;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

const getUserById = async (conn: PoolConnection, id: number) => {
  try {
    const sql = 'SELECT id, email, name, phone_number, gender, birth_date FROM users WHERE id = ?';
    const [rows] = await conn.execute<RowDataPacket[]>(sql, [id]);
    return rows;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

const getUserByName = async (conn: PoolConnection, name: string) => {
  try {
    const sql = 'SELECT * FROM users WHERE name = ?';
    const [rows] = await conn.execute<RowDataPacket[]>(sql, [name]);
    return rows;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

const getUserByPhoneNumber = async (conn: PoolConnection, phoneNumber: string) => {
  try {
    const sql = 'SELECT * FROM users WHERE phone_number = ?';
    const [rows] = await conn.execute<RowDataPacket[]>(sql, [phoneNumber]);
    return rows;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

export default {
  createUser,
  getUser,
  getUserByEmail,
  getUserById,
  getUserByName,
  getUserByPhoneNumber,
  createFakeUsers,
};
