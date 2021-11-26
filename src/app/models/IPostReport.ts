import {IUser} from './IUser';
import {IPost} from './IPost';

export interface IPostReport {
  'reportPostId': number;
  'numOfTimes': number;
  'user': IUser;
  'post': IPost;
}
