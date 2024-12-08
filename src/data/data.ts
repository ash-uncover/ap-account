export interface AccountLine {
  account: string
  date: Date
  label1: string
  label2: string
  value: number
}

export const DATA: AccountLine[] = [{
  account: 'acc',
  date: new Date('2024/12/25'),
  label1: 'label1',
  label2: 'label2',
  value: 1.00,
}, {
  account: 'acc',
  date: new Date('2024/12/20'),
  label1: 'label11',
  label2: 'label21',
  value: 2.00,
}]