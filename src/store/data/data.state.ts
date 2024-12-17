import { DataState } from '@uncover/js-utils'
import { 
  AccountData, 
  AccountRule,
  Category
} from '../../model/data'

export interface DataStoreState {
  data: AccountData[]
  dataLoadStatus: DataState
  dataLoadError: string

  rules: AccountRule[]
  categories: Category[] 
  metaDataLoadStatus: DataState
  metaDataLoadError: string
}