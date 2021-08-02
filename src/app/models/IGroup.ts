import {IGroupTypes} from './IGroupTypes';

export interface IGroup{
  'groupId': number;
  'userId': number;
  'groupTypeId': number;
  'name': string;
  'private': boolean;
  'description': string;
  'coverPhotoUrl': string;
   groupType: IGroupTypes;
}
