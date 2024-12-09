import { DataState } from '@uncover/js-utils'

export interface AccountData {
  account: string
  date: string
  label1: string
  label2: string
  value: string
}

interface ruleBase {
  not?: boolean
  field: 'account' | 'date' | 'label1' | 'label2' | 'value'
}
interface ruleStartsWith extends ruleBase {
  startsWith: string
}
interface ruleEqual extends ruleBase {
  equal: string
}
interface ruleAnd {
  and: [AccountRule, AccountRule]
}
export type AccountRule = ruleStartsWith | ruleEqual | ruleAnd
export interface AccountRules {
  credit: AccountRule[]
  debit: AccountRule[]
}

export interface AccountLabel {
  name: string
  labels?: string[]
}

export interface DataStoreState {
  data: AccountData[]
  dataLoadStatus: DataState
  dataLoadError: string

  rules: AccountRules
  rulesLoadStatus: DataState
  rulesLoadError: string

  labels: AccountLabel[]
  labelsLoadStatus: DataState
  labelsLoadError: string
}