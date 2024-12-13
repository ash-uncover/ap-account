import { OperatorKey } from './operators'

export type AccountField = 
  | 'account'
  | 'date'
  | 'label1'
  | 'label2'
  | 'value'

export interface AccountData {
  account: string
  date: string
  label1: string
  label2: string
  value: string
}
export interface AccountDataExt {
  account: string
  date: string
  label1: string
  label2: string
  value: number
  categories: AccountCategory[]
}

interface RuleCondition {
  field: AccountField
  operator: OperatorKey
  value: string
}
interface RuleAnd {
  and: Rule[]
}
interface RuleOr {
  or: Rule[]
}
interface RuleNot {
  not: Rule
}
export type Rule = RuleCondition | RuleAnd | RuleOr | RuleNot 
export type AccountRule = {
  rule: Rule
  category: AccountCategory
}

export interface AccountCategory {
  credit: boolean
  category1: string
  category2: string
}