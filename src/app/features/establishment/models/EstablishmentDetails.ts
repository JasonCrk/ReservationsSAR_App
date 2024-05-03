import { TopicItem } from "../../topic/models/TopicItem"

export interface EstablishmentDetails {
  id: string
  name: string
  description: string
  maxCapacity: number
  images: Array<{ id: string, imageUrl: string }>
  topics: TopicItem[]
}

