const storage = {
  get: (key: string): any | null => {
    try {
      return JSON.parse(localStorage.getItem(key) || 'null')
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error)
      return null
    }
  },
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage`, error)
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage`, error)
    }
  },
  clear: () => {
    localStorage.clear()
  },
}

export default storage

const petNames = [
  '小黑龙',
  '火凤凰',
  '冰龙',
  '雷鸟',
  '幽灵猫',
  '独角兽',
  '石头人',
  '飞马',
  '海豚',
  '闪电鸟',
  '树精',
  '水晶兽',
  '风精灵',
  '地龙',
  '火狐',
  '冰凤凰',
  '雷龙',
  '光精灵',
  '暗影豹',
  '金鹰',
  '银狼',
  '铜虎',
  '岩熊',
  '水獭',
  '火猴',
  '冰熊',
  '雷豹',
  '风鹰',
  '光虎',
  '暗龙',
  '星兽',
  '月魔',
  '雾兽',
  '云龙',
  '霜虎',
  '炎狼',
  '雷凤',
  '影豹',
  '冰鹰',
  '风虎',
  '水龙',
  '火凤',
  '土熊',
  '电豹',
  '光鹰',
  '暗狼',
  '星凤',
  '月虎',
  '雾豹',
  '云鹰',
  '霜龙',
]
