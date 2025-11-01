export type Pet = {
  id: number
  name: string
  owner: string
  icon: string
}

export type Gift = {
  id: number
  senderId: number
  receiverId: number
  type: string
  value: number
}

export type Student = {
  id: number
  name: string
  pets: Pet[]
  coin: number
  receivedGifts: Gift[]
  sendGifts: Gift[]
}
