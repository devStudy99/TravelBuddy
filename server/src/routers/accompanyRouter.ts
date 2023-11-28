import { isLoggedIn } from '@src/middlewares/authMiddleware';
import { Router } from 'express';
import accompanyController from '@src/controllers/accompanyController';
import upload from '@src/config/multerConfig';

const accompanyRouter = Router();

accompanyRouter.post('/', isLoggedIn, accompanyController.createAccompanyPost);

accompanyRouter.post(
  '/upload-image',
  isLoggedIn,
  upload.single('img'),
  accompanyController.uploadImage,
);

accompanyRouter.get('/', accompanyController.getAccompanyPosts);

accompanyRouter.get('/:postId', accompanyController.getAccompanyPostByPostId);

export default accompanyRouter;
