import { AppStoreState } from './app/app.state'
import { DataStoreState } from './data/data.state'

export type RootState = {
  app: AppStoreState,
  data: DataStoreState,
}