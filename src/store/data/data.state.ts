import { DataState } from '@uncover/js-utils'
import { 
  AccountData, 
  AccountRule,
  Category,
  Check
} from '../../model/data'

export interface DataStoreState {
  data: AccountData[]
  dataLoadStatus: DataState
  dataLoadError: string

  rules: AccountRule[]
  categories: Category[] 
  metaDataLoadStatus: DataState
  metaDataLoadError: string

  checks: Check[] 
  checksLoadStatus: DataState
  checksLoadError: string
}