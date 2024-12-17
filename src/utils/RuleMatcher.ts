import { Labels } from 'src/store/app/app.state'
import { AccountData, AccountRule, AccountDataExt, Rule, Category, AccountCategory } from '../model/data'

export function mergeAccountRule(rules: AccountRule[]): AccountRule[] {
  return rules.reduce(
    (acc: AccountRule[], line) => {
      const [name, cat] = line.category.split('/')
      if (cat) {
        const exist = acc.some(rule => {
          const [ruleName, ruleCat] = rule.category.split('/')
          return ruleName === name && ruleCat === cat
        })
        if (!exist) {
          acc.push(line)
        }
      } else {
        const exist = acc.some(rule => {
          const [ruleName] = rule.category.split('/')
          return ruleName === name
        })
        if (!exist) {
          acc.push(line)
        }
      }
      return acc
    }
    , 
    []
  )
}

export function enrichData(data: AccountData[], rules: AccountRule[], categories: Category[]): AccountDataExt[] {
  return data.map(
    (line) => {
      const result = {
        account: line.account,
        file: line.file,
        date: line.date,
        label1: line.label1,
        label2: line.label2,
        value: parseFloat(line.value),
        rules: [],
        categories: []
      }
      const lineRules = rules.filter(
        (rule) => matchRule(result, rule.rule)
      )
      const mergedRules = mergeAccountRule(lineRules)
      const lineCategories = mergedRules.map(rule => {
        const [name, cat] = rule.category.split('/')
        const category = categories.find(c => c.name === name)
        if (!category) {
          console.log(rule)
          console.log(name)
        }
        return {
          credit: category.credit,
          name,
          color: category.color,
          bgcolor: category.bgcolor,
          category: cat
        }
      })
      
      const isCredit = lineCategories.length && lineCategories.every(cat => cat.credit)
      result.value = (isCredit ? 1 : -1) * Math.abs(result.value)
      result.rules = lineRules
      result.categories = lineCategories
      return result
    }
  )
}

export function extractLabels(categories: Category[]): Labels {
  return categories.reduce(
    (acc, category) => {
      const {
        credit,
        name,
        categories
      } = category
      if (credit) {
        acc.credit[name] = categories.map(cat => `${name}/${cat}`)
      } else {
        acc.debit[name] = categories.map(cat => `${name}/${cat}`)
      }
      return acc
    },
    { credit: {}, debit: {} }
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
  switch (rule.operator) {
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
      return data[rule.field].toUpperCase().includes(rule.value.toUpperCase())
    }
    default: {
      // @ts-ignore
      throw new Error(`Unknown operator: ${rule.operator}`)
    }
  }
}