import accompanyRepository from '@src/repository/accompanyRepository';
import { PoolConnection } from 'mysql2/promise';

const createAccompanyPost = async (data: any) => {
  return async (conn: PoolConnection) => {
    try {
      const {
        userId,
        title,
        content,
        continent,
        country,
        travelCompanions,
        travelDates: { startDate, endDate },
        travelPlans,
      } = data;

      const a = {
        userId,
        title,
        content,
        continent,
        country,
        travelCompanions,
        startDate,
        endDate,
      };

      const postId = await accompanyRepository.insertIntoPosts(conn, a);

      for (const plan of travelPlans) {
        // Loop through each plan in the array

        const newPlanData = { ...plan, postId }; // Include postId in the data to be inserted into Plans table
        const planId = await accompanyRepository.insertIntoPlans(conn, newPlanData);

        // If there are details within this plan that need to be added to another table
        if (plan.info && Array.isArray(plan.info)) {
          for (const detail of plan.info) {
            const newDetailData = { ...detail, planId }; // Include newly created Plan Id here

            await accompanyRepository.insertIntoDetails(conn, newDetailData);
          }
        }
      }
    } catch (error) {
      throw error;
    }
  };
};

const getAccompanyPosts = async () => {
  return async (conn: PoolConnection) => {
    try {
      let posts = await accompanyRepository.getAllAccompanyPosts(conn);

      for (let post of posts) {
        post.plans = await accompanyRepository.getAllTravelPlansWithDetailsForPostId(
          conn,
          post.postId,
        );
      }

      return posts;
    } catch (error) {
      throw error;
    }
  };
};

const getAllAccompanyPostsByUserId = async (userId: any) => {
  return async (conn: PoolConnection) => {
    try {
      let posts = await accompanyRepository.getAllAccompanyPostsByUserId(conn, userId);

      for (let post of posts) {
        post.plans = await accompanyRepository.getAllTravelPlansWithDetailsForPostId(
          conn,
          post.postId,
        );
      }

      return posts;
    } catch (error) {
      throw error;
    }
  };
};

const getAccompanyPostById = async (postId: string) => {
  return async (conn: PoolConnection) => {
    try {
      const travelPost = await accompanyRepository.getAccompanyPostById(conn, postId);
      const travelPlans = await accompanyRepository.getTravelPlansWithDetails(conn, postId);
      return { travelPost, travelPlans };
    } catch (error) {
      throw error;
    }
  };
};

export default {
  createAccompanyPost,
  getAccompanyPosts,
  getAllAccompanyPostsByUserId,
  getAccompanyPostById,
};
