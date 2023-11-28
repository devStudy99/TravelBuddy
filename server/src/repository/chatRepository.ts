import { OkPacket, PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { handleDbError } from '@src/middlewares/errorMiddleware';

export const createMessage = async (conn: PoolConnection, data: any) => {
  try {
    const sql =
      'INSERT INTO `travel_buddy`.`chats` (`sender_id`, `receiver_id`, `message`) VALUES (?, ?, ?)';
    const [row] = await conn.execute<ResultSetHeader>(sql, data);
    return row.insertId;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

export const checkChatRoom = async (conn: PoolConnection, users: any) => {
  try {
    const sql =
      'SELECT `id` FROM `travel_buddy`.`rooms` WHERE (`user1_id` = ? AND `user2_id` = ?) OR (`user1_id` = ? AND `user2_id` = ?)';
    const [existingChatRoom] = await conn.execute<RowDataPacket[]>(sql, [
      users[0],
      users[1],
      users[1],
      users[0],
    ]);

    const isRoomExist = existingChatRoom.length > 0;
    return isRoomExist;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

export const createChatRoom = async (conn: PoolConnection, data: any) => {
  try {
    const sql =
      'INSERT INTO `travel_buddy`.`rooms` (`user1_id`, `user2_id`, `created_at`) VALUES (?, ?, CURRENT_TIMESTAMP)';
    const [createChatRoomResult] = await conn.execute<ResultSetHeader>(sql, [data[0], data[1]]);

    return createChatRoomResult;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

export const getChatRoomsByUserId = async (conn: PoolConnection, userId: number) => {
  try {
    const getChatRoomsSql =
      'SELECT `id`, `user1_id` as user1Id, `user2_id` as user2Id, `created_at` as createdAt ' +
      'FROM `travel_buddy`.`rooms` ' +
      'WHERE `user1_id` = ? OR `user2_id` = ?';

    const [chatRooms] = await conn.execute<RowDataPacket[]>(getChatRoomsSql, [userId, userId]);

    return chatRooms;
  } catch (error) {
    handleDbError(error);
  }
};

export const getChatMessagesByRoomId = async (conn: PoolConnection, roomId: number) => {
  try {
    const sql =
      'SELECT `id`, `sender_id` as senderId, `receiver_id` as receiverId, `message`, `created_at` as createdAt ' +
      'FROM `travel_buddy`.`chats` ' +
      'WHERE `room_id` = ? ' +
      'ORDER BY `created_at` ASC';

    const [chatMessages] = await conn.execute(sql, [roomId]);
    return chatMessages;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

export const createChatMessage = async (conn: PoolConnection, data: any) => {
  try {
    // Insert message into the chats table
    const insertMessageSql =
      'INSERT INTO `travel_buddy`.`chats` (`room_id`, `sender_id`, `receiver_id`, `message`) VALUES (?, ?, ?, ?)';
    const [insertMessageResult] = await conn.execute<ResultSetHeader>(insertMessageSql, data);
    const insertId = insertMessageResult.insertId;

    // Get the created_at value of the last inserted record
    const [lastInsertResult] = await conn.execute<any>(
      'SELECT `created_at` as createdAt FROM `travel_buddy`.`chats` WHERE `id` = LAST_INSERT_ID()',
    );

    const createdAt = lastInsertResult[0]?.createdAt;

    // Use the created_at value as needed

    return { insertId, createdAt };
  } catch (error: unknown) {
    handleDbError(error);
  }
};

export default {
  createMessage,
  checkChatRoom,
  createChatRoom,
  getChatRoomsByUserId,
  getChatMessagesByRoomId,
  createChatMessage,
};
