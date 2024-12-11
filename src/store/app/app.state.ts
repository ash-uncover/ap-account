import { 
  AccountDataExt 
} from '../../model/data';

export type FilterRule =
  | 'ALL'
  | 'NONE'
  | 'MORE'

export interface AppStoreState {
  data: AccountDataExt[]

  filterRule: FilterRule
}
