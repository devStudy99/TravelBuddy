import accompanyService from '@src/services/accompanyService';
import { User } from '@src/types';
import { runNonTxnReturn, runTxnReturn, runTxnVoid } from '@src/utils/transactionUtils';
import { RequestHandler } from 'express';

const createAccompanyPost: RequestHandler = async (req, res, next) => {
  const data = req.body;
  const { id: userId } = req.user as User;
  try {
    await runTxnVoid(await accompanyService.createAccompanyPost({ userId, ...data }));
  } catch (error) {
    next(error);
  }
};

const uploadImage: RequestHandler = async (req, res, next) => {
  // 파일이 저장된 경로를 클라이언트에게 반환해준다.
  const IMG_URL = `http://localhost:8080/uploads/${req.file?.filename}`;
  res.json({ url: IMG_URL });
};

const getAccompanyPosts: RequestHandler = async (req, res, next) => {
  try {
    const accompanyPosts = await runNonTxnReturn(await accompanyService.getAccompanyPosts());
    console.log('전체 동행게시글 가져오기 성공' + accompanyPosts);
    res.json(accompanyPosts);
  } catch (error) {
    next(error);
  }
};

const getAccompanyPostByPostId: RequestHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const accompanyPost = await runTxnReturn(await accompanyService.getAccompanyPostById(postId));
    console.log('상세 동행게시글 가져오기 성공' + accompanyPost);
    res.json(accompanyPost);
  } catch (error) {
    next(error);
  }
};

export default {
  createAccompanyPost,
  uploadImage,
  getAccompanyPosts,
  getAccompanyPostByPostId,
};
