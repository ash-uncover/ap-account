import { AccountData, AccountCategory, AccountRule, AccountDataExt, Rule } from '../model/data'

export function enrichData(data: AccountData[], rules: AccountRule[]): AccountDataExt[] {
  return data.map(
    (line) => {
      const result = {
        account: line.account,
        date: line.date,
        label1: line.label1, 
        label2: line.label2,
        value: parseFloat(line.value),
        categories: []
      }
      const lineRules = rules.filter((rule) => matchRule(result, rule.rule))
      result.categories = lineRules.map(line => line.category)
      return result
    }
  )
}

export function matchRule(data: AccountDataExt, rule: Rule) {
  // @ts-ignore
  if (rule.and) {
    // @ts-ignore
    return rule.and.every((r: Rule) => matchRule(data, r))
  }
  // @ts-ignore
  if (rule.or) {
    // @ts-ignore
    return rule.or.some((r: Rule) => matchRule(data, r)) 
  }
  // @ts-ignore
  if (rule.not) {
    // @ts-ignore
    return !matchRule(data, rule.not)
  }
  // @ts-ignore
  switch(rule.operator) {
    case 'equal': {
      // @ts-ignore
      return data[rule.field].toUpperCase() === rule.value.toUpperCase()
    }
    case 'startsWith': {
      // @ts-ignore
      return data[rule.field].toUpperCase().startsWith(rule.value.toUpperCase())
    }
    case 'includes': {
      // @ts-ignore
      return data[rule.field.toUpperCase()].includes(rule.value.toUpperCase())
    }
    default: {
      // @ts-ignore
      throw new Error(`Unknown operator: ${rule.operator}`)
    }
  }
}