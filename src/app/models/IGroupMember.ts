import {IUser} from './IUser';
import {IGroup} from './IGroup';

export interface IGroupMember{
  'groupMemberId': number;
  'joinDate': string;
  'roleTypeGroupId': string;
  'user': IUser;
  'group': IGroup;
}
