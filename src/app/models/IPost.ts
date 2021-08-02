import {IUser} from './IUser';

export interface IPost{
  'postId': number;
  'text': string;
  'date': string;
  'userId': number;
  'groupId': number;
  'numOfLikes': number;
  'photoUrl': string;
  'user': IUser;
}
