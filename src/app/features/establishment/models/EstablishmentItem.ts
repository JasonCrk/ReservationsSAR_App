import { TopicItem } from '../../topic/models/TopicItem'

export interface EstablishmentItem {
  id: string
  name: string
  maxCapacity: number
  topics: TopicItem[]
  firstImage: string
}
