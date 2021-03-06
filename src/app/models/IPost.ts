import {IUser} from './IUser';
import {IPostComment} from './IPostComment';

export interface IPost{
  'postId': number;
  'text': string;
  'date': string;
  'userId': number;
  'groupId': number;
  'numOfLikes': number;
  'photoUrl': string;
  'user': IUser;
  'comments': IPostComment[];
}
