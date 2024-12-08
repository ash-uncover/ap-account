import { Logger } from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

// Default hard-coded values
export const CONFIG: {
  AP_ACCOUNT_PUBLIC: string
  AP_ACCOUNT_ENVIRONMENT: string
} = {
  AP_ACCOUNT_PUBLIC: '',
  AP_ACCOUNT_ENVIRONMENT: 'local',
}

// Load config from env
try {
  // This cannot be factorized since webpack simply replace the full process.env.[property] strings
  if (process.env.AP_ACCOUNT_PUBLIC) {
    CONFIG.AP_ACCOUNT_PUBLIC = process.env.AP_ACCOUNT_PUBLIC
  }
  if (process.env.AP_ACCOUNT_ENVIRONMENT) {
    CONFIG.AP_ACCOUNT_ENVIRONMENT = process.env.AP_ACCOUNT_ENVIRONMENT
  }
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

console.log('CONFIG')
Object.keys(CONFIG).forEach((confKey) => {
  // @ts-ignore
  console.log(` - ${confKey}: '${CONFIG[confKey]}'`)
})
