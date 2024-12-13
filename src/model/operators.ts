// #region Keys
export type OperatorKey = 
  | 'equal' 
  | 'notEqual' 
  | 'startsWith' 
  | 'notStartsWith' 
  | 'includes'
  | 'notIncludes'
export const OPERATOR_KEYS: {
  EQUAL: OperatorKey
  NOT_EQUAL: OperatorKey
  STARTSWITH: OperatorKey
  NOT_STARTSWITH: OperatorKey
  INCLUDES: OperatorKey
  NOT_INCLUDES: OperatorKey
} = {
  EQUAL:  'equal',
  NOT_EQUAL:  'notEqual',
  STARTSWITH:  'startsWith',
  NOT_STARTSWITH:  'notStartsWith',
  INCLUDES:  'includes',
  NOT_INCLUDES:  'notIncludes'
}
// #endregion

// #region Operators
export interface Operator {
  key: OperatorKey
  text: string
}
export const OPERATORS: {
  EQUAL: Operator
  NOT_EQUAL: Operator
  STARTSWITH: Operator
  NOT_STARTSWITH: Operator
  INCLUDES: Operator
  NOT_INCLUDES: Operator
} = {
  EQUAL: { key: OPERATOR_KEYS.EQUAL, text: 'equal' },
  NOT_EQUAL: { key: OPERATOR_KEYS.NOT_EQUAL, text: 'not equal' },
  STARTSWITH: { key: OPERATOR_KEYS.STARTSWITH, text: 'starts with' },
  NOT_STARTSWITH: { key: OPERATOR_KEYS.NOT_STARTSWITH, text: 'not starts with' },
  INCLUDES: { key: OPERATOR_KEYS.INCLUDES, text: 'includes' },
  NOT_INCLUDES: { key: OPERATOR_KEYS.NOT_INCLUDES, text: 'not includes' },
}
// #endregion
