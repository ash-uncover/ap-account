import { OperatorKey } from './operators'

export type AccountField = 
  | 'account'
  | 'file'
  | 'date'
  | 'label1'
  | 'label2'
  | 'value'

export interface AccountData {
  account: string
  file: string
  date: string
  label1: string
  label2: string
  value: string
}
export interface AccountDataExt {
  account: string
  file: string
  date: string
  label1: string
  label2: string
  value: number
  rules: AccountRule[]
  categories: AccountCategory[]
}

// #region Rules
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
export interface AccountMetaData {
  rules: AccountRule[]
  categories: Category[]
}
export interface AccountChecks {
 checks: Check[]
}
export type AccountRule = {
  rule: Rule
  category: string
}
// #endregion

// #region Categories
export interface Category {
  credit: boolean
  name: string
  color: string
  bgcolor: string
  categories: string[]
}
export interface AccountCategory {
  credit: boolean
  name: string
  color: string
  bgcolor: string
  category: string
}
// #endregion

// #region Checks
export interface Check {
  id: string
  credit: number
  debit: number
}
// #endregion