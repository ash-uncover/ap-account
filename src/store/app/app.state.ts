import { 
  AccountDataExt 
} from '../../model/data';

export type FilterRule =
  | 'ALL'
  | 'NONE'
  | 'MORE'

export type FilterCredit =
  | 'ALL'
  | 'CREDIT'
  | 'DEBIT'

export interface AppStoreState {
  data: AccountDataExt[]

  filterRule: FilterRule
  filterCredit: FilterCredit
  filterSearch: string
}
