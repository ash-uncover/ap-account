import { 
  AccountDataExt 
} from '../../model/data';

export interface Labels {
  credit: Record<string, string[]>
  debit: Record<string, string[]>
}

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
  labels: Labels

  filterRule: FilterRule
  filterCredit: FilterCredit
  filterSearch: string
  filterAccount: string
  filterFile: string
}
