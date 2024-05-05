import { EstablishmentItem } from '../../establishment/models/EstablishmentItem'
import { TopicItem } from '../../topic/models/TopicItem'

export interface ReservationItem {
  id: string
  establishment: EstablishmentItem,
  topic: TopicItem
  realizationDate: string
  finishDate: string
  createdAt: string
  status: string
}
