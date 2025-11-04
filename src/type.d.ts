export type Pet = {
  id: number
  name: string
  ownerId: number
  icon: string
  coin: number
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
  pets: number[]
  coin: number
  receivedGifts: Gift[]
  sendGifts: Gift[]
}
