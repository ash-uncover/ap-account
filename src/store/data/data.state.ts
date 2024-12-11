import { DataState } from '@uncover/js-utils'
import { 
  AccountData, 
  AccountCategory, 
  AccountRule
} from '../../model/data'

export interface DataStoreState {
  data: AccountData[]
  dataLoadStatus: DataState
  dataLoadError: string

  rules: AccountRule[]
  rulesLoadStatus: DataState
  rulesLoadError: string

  labels: AccountCategory[]
  labelsLoadStatus: DataState
  labelsLoadError: string
}