import { TopicItem } from "../../topic/models/TopicItem"

export interface EstablishmentDetails {
  id: string
  name: string
  description: string
  pricePerHour: number
  maxCapacity: number
  images: Array<{ id: string, imageUrl: string }>
  topics: TopicItem[]
}

