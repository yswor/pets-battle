export type Pet = {
  id: number
  name: string
  petId: number
  ownerId: number
  icon: string
  level: number
}

export type PetPoolItem = {
  id: number
  name: string
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
  pets: { petId: number; id: number; level: number }[]
  coin: number
  receivedGifts: Gift[]
  sendGifts: Gift[]
  tasks: number[]
}

export type User = {
  id: number
  name: string
  role: 'admin' | 'teacher' | 'student'
}

export type Task = {
  id: number
  content: string
  rewardCoin: number
  executorId: number
  state: string
}
