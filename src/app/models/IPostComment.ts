import {IUser} from './IUser';

export interface IPostComment {
  'postCommentId': number;
  'text': string;
  'date': string;
  'userId': number;
  'postId': number;
  'numOfLikes': number;
  'photoUrl': string;
  'user': IUser;
}
