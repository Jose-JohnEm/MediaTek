import express from 'express';
import authware from './auth_middleware'
import { getProfile, rmProfile } from './profile';
import { getPosts, addPost, rmPost } from './posts';
import { addLiked, getLikeds, rmLiked } from './liked';
import { addSaved, getSaveds, rmSaved } from './saved';
import { addComment, editComment, rmComment } from './comment';
import { checkValidation, sendAnotherCode } from './validation';

var router = express.Router()

router.use(authware)

router.route('/validation')
    .post(checkValidation)
    .get(sendAnotherCode)

router.route('/user')
    .get(getProfile)
    .delete(rmProfile)
    
router.route('/user/posts')
    .get(getPosts)
    .post(addPost)
    .delete(rmPost)

router.route('/user/liked')
    .get(getLikeds)
    .post(addLiked)
    .delete(rmLiked)

router.route('/user/saved')
    .get(getSaveds)
    .post(addSaved)
    .delete(rmSaved)

router.route('/user/comment')
    .post(addComment)
    .put(editComment)
    .delete(rmComment)

export default router