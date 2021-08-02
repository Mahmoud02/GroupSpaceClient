import {IUser} from './IUser';

export interface IJoinRequest{
  'joinRequestId': number;
  'date': string;
  'user': IUser;
}
