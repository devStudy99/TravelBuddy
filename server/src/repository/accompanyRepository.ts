import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { handleDbError } from '@src/middlewares/errorMiddleware';

const findBuddy = async (conn: PoolConnection, data: any) => {
  try {
    const sql = 'INSERT INTO `travel_buddy`.`accompany` (`user_id`, `content`) ' + 'VALUES (?, ?);';

    await conn.execute(sql, [data.userId, data.value]);
  } catch (error: unknown) {
    handleDbError(error);
  }
};

const insertIntoPosts = async (conn: PoolConnection, data: any) => {
  try {
    const sql =
      'INSERT INTO `travel_buddy`.`travel_posts` (`user_id`, `content`, ' +
      '`continent`,`country`,`title`,`travel_companions`,`start_date`,`end_date`) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
    // 타입  any대신 변경해야됨
    const [result] = await conn.execute<any>(sql, [
      data.userId,
      data.content,
      data.continent,
      data.country,
      data.title,
      data.travelCompanions,
      data.startDate,
      data.endDate,
    ]);
    // Get the last inserted id
    return result.insertId;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

const insertIntoPlans = async (conn: PoolConnection, data: any) => {
  try {
    const sql = 'INSERT INTO `travel_buddy`.`travel_plans` (`post_id`, `date`) ' + 'VALUES (?, ?);';
    const [result] = await conn.execute<any>(sql, [data.postId, data.date]);

    // Get the last inserted id
    return result.insertId;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

const insertIntoDetails = async (conn: PoolConnection, data: any) => {
  try {
    const sql =
      'INSERT INTO `travel_buddy`.`plan_details` (`plan_id`, `location`, `lat`, `lng`) ' +
      'VALUES (?, ?, ?, ?);';

    await conn.execute(sql, [data.planId, data.location, data.position.lat, data.position.lng]);
  } catch (error: unknown) {
    handleDbError(error);
  }
};

const getAccompany = async (conn: PoolConnection) => {
  try {
    const sql = 'SELECT * FROM accompany';
    const [rows] = await conn.execute<RowDataPacket[]>(sql);

    return rows;
  } catch (error: unknown) {
    handleDbError(error);
  }
};

const getTravelPlansWithDetails = async (conn: PoolConnection, postId: string) => {
  try {
    const sql =
      'SELECT tp.id AS plan_id, tp.date, pd.location, pd.lat, pd.lng ' +
      'FROM travel_buddy.travel_plans AS tp ' +
      'JOIN travel_buddy.plan_details AS pd ON tp.id = pd.plan_id ' +
      'WHERE tp.post_id = ?;';

    const [rows] = await conn.execute<any>(sql, [postId]);

    // Process the query result as needed
    const plansWithDetails = rows.map((row: any) => ({
      planId: row.plan_id,
      date: row.date,
      location: row.location,
      lat: row.lat,
      lng: row.lng,
    }));

    return plansWithDetails;
  } catch (error) {
    handleDbError(error);
  }
};

const getAccompanyPostById = async (conn: PoolConnection, postId: string) => {
  try {
    const sql = 'SELECT * FROM travel_buddy.travel_posts WHERE id = ?;';

    const [rows] = await conn.execute<any>(sql, [postId]);

    // Process the query result as needed
    const travelPost = rows.map((row: any) => ({
      postId: row.id,
      userId: row.user_id,
      content: row.content,
      continent: row.continent,
      country: row.country,
      title: row.title,
      travelCompanions: row.travel_companions,
      startDate: row.start_date,
      endDate: row.end_date,
    }));

    return travelPost[0];
  } catch (error) {
    handleDbError(error);
  }
};

const getAllAccompanyPosts = async (conn: PoolConnection) => {
  try {
    const sql = 'SELECT * FROM travel_buddy.travel_posts;';

    const [rows] = await conn.execute<any>(sql);

    // Process the query result as needed
    const travelPosts = rows.map((row: any) => ({
      postId: row.id,
      userId: row.user_id,
      content: row.content,
      continent: row.continent,
      country: row.country,
      title: row.title,
      travelCompanions: row.travel_companions,
      startDate: row.start_date,
      endDate: row.end_date,
    }));

    return travelPosts;
  } catch (error) {
    handleDbError(error);
  }
};

const getAllTravelPlansWithDetailsForPostId = async (conn: PoolConnection, postId: string) => {
  try {
    const sql =
      'SELECT tp.id AS plan_id, tp.date, pd.location, pd.lat, pd.lng ' +
      'FROM travel_buddy.travel_plans AS tp ' +
      'JOIN travel_buddy.plan_details AS pd ON tp.id = pd.plan_id ' +
      'WHERE tp.post_id = ?;';

    const [rows] = await conn.execute<any>(sql, [postId]);

    // Process the query result as needed
    const plansWithDetails = rows.map((row: any) => ({
      planId: row.plan_id,
      date: row.date,
      location: row.location,
      lat: row.lat,
      lng: row.lng,
    }));

    return plansWithDetails;
  } catch (error) {
    handleDbError(error);
  }
};

const getAllAccompanyPostsByUserId = async (conn: PoolConnection, userId: string) => {
  try {
    const sql = 'SELECT * FROM travel_buddy.travel_posts WHERE user_id = ?;';

    const [rows] = await conn.execute<any>(sql, [userId]);

    const travelPosts = rows.map((row: any) => ({
      postId: row.id,
      userId: row.user_id,
      content: row.content,
      continent: row.continent,
      country: row.country,
      title: row.title,
      travelCompanions: row.travel_companions,
      startDate: row.start_date,
      endDate: row.end_date,
    }));

    return travelPosts;
  } catch (error) {
    handleDbError(error);
  }
};

export default {
  findBuddy,
  insertIntoPosts,
  insertIntoPlans,
  insertIntoDetails,
  getAccompany,
  getTravelPlansWithDetails,
  getAccompanyPostById,
  getAllAccompanyPosts,
  getAllTravelPlansWithDetailsForPostId,
  getAllAccompanyPostsByUserId,
};
