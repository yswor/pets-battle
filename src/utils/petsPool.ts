import type { PetPoolItem } from '@/type'
import orginalEgg from '@/assets/original_egg.png'
import petA from '@/assets/pets/pet_1.png'
import petB from '@/assets/pets/pet_2.png'
import petC from '@/assets/pets/pet_3.png'
import petD from '@/assets/pets/pet_4.png'
import petE from '@/assets/pets/pet_5.png'
import petF from '@/assets/pets/pet_6.png'
import petG from '@/assets/pets/pet_7.png'
import petH from '@/assets/pets/pet_8.png'

// 1. 前缀数组 (表示属性、特征、基础概念)
const pokemonNamePrefixes = [
  '妙',
  '怪',
  '超',
  '魔',
  '皮',
  '雷',
  '火',
  '水',
  '草',
  '伊',
  '卡',
  '喷',
  '杰',
  '豪',
  '快',
  '大',
  '小',
  '多',
  '巴',
  '阿',
  '拉',
  '喵',
  '汪',
  '胖',
  '瘦',
  '长',
  '短',
  '电',
  '冰',
  '风',
  '云',
  '沙',
  '石',
  '土',
  '钢',
  '虫',
  '恶',
  '妖',
  '鬼',
  '龙',
  '勇',
  '懒',
  '聪',
  '呆',
  '甜',
  '苦',
  '酸',
  '仙',
  '星',
  '月',
  '太',
  '尼',
  '烈',
  '巨',
  '迷',
  '梦',
  '幻',
  '胡',
  '沙',
  '班',
  '金属',
  '黑暗',
  '光明',
  '闪光',
  '冰冻',
  '火焰',
  '雷电',
  '绿叶',
  '深海',
  '天空',
]

// 2. 后缀数组 (表示形态、动作或风格化结尾)
const pokemonNameSuffixes = [
  '娃',
  '怪',
  '兽',
  '龙',
  '鸟',
  '龟',
  '虫',
  '鱼',
  '花',
  '草',
  '树',
  '石',
  '星',
  '儿',
  '郎',
  '爷',
  '仙',
  '灵',
  '王',
  '后',
  '子',
  '斯',
  '特',
  '克',
  '顿',
  '多',
  '拉',
  '鲁',
  '利',
  '欧',
  '郎',
  '蝠',
  '狮',
  '虎',
  '熊',
  '狼',
  '鹰',
  '鸦',
  '蛇',
  '蝶',
  '蛾',
  '牛',
  '马',
  '羊',
  '猪',
  '猫',
  '狗',
  '鼠',
  '鼬',
  '猴',
  '拳',
  '掌',
  '尾',
  '爪',
  '牙',
  '角',
  '翅',
  '鳞',
  '壳',
  '衣',
  '梦',
  '影',
  '光',
  '波',
  '气',
  '弹',
  '旋风',
  '火焰',
  '水流',
  '闪电',
  '食梦',
  '种子',
  '叶子',
  '花瓣',
  '岩石',
  '雪人',
  '巨人',
  '骑士',
]

// 3. 组合函数示例
function pokemonNameGenerator() {
  const prefix = pokemonNamePrefixes[Math.floor(Math.random() * pokemonNamePrefixes.length)]
  const suffix = pokemonNameSuffixes[Math.floor(Math.random() * pokemonNameSuffixes.length)]
  return prefix + suffix!
}

export const generatePokemonName = () => {
  const list = []
  for (let i = 0; i < 30; i++) {
    list.push({
      id: i + 1,
      name: pokemonNameGenerator(),
      icon: '',
      level: 0,
    })
  }
  return list
}

const imgUrl = (path: string) => new URL(path, import.meta.url).href

const petsPool: PetPoolItem[] = [
  {
    id: 1,
    name: '妙蛙种子',
    levelIconMap: {
      1: imgUrl('../assets/original_egg.png'),
      2: imgUrl('../assets/pets/pet_1.png'),
    },
  },
  {
    id: 2,
    name: '地地鼠',
    levelIconMap: {
      1: imgUrl('../assets/original_egg.png'),
      2: imgUrl('../assets/pets/pet_2.png'),
    },
  },
  {
    id: 3,
    name: '火狐狸',
    levelIconMap: {
      1: imgUrl('../assets/original_egg.png'),
      2: imgUrl('../assets/pets/pet_3.png'),
    },
  },
  {
    id: 4,
    name: '木木枭',
    levelIconMap: {
      1: imgUrl('../assets/original_egg.png'),
      2: imgUrl('../assets/pets/pet_4.png'),
    },
  },
  {
    id: 5,
    name: '呆火鳄',
    levelIconMap: {
      1: imgUrl('../assets/original_egg.png'),
      2: imgUrl('../assets/pets/pet_5.png'),
    },
  },
  {
    id: 6,
    name: '杰尼龟',
    levelIconMap: {
      1: imgUrl('../assets/original_egg.png'),
      2: imgUrl('../assets/pets/pet_6.png'),
    },
  },
  {
    id: 7,
    name: '泪眼蜥',
    levelIconMap: {
      1: imgUrl('../assets/original_egg.png'),
      2: imgUrl('../assets/pets/pet_7.png'),
    },
  },
  {
    id: 8,
    name: '胖丁',
    levelIconMap: {
      1: imgUrl('../assets/original_egg.png'),
      2: imgUrl('../assets/pets/pet_8.png'),
    },
  },
]

export const getRandomPetFromPool = () => {
  const randomIndex = Math.floor(Math.random() * petsPool.length)
  return petsPool[randomIndex]!
}

export const getPetItem = (id: number | undefined) => {
  if (id) {
    return petsPool.find((pet) => pet.id === id)
  }
}

export const getPetItemName = (params: { id: number | undefined; level: number | undefined }) => {
  if (params.id && params.level) {
    const petItem = petsPool.find((pet) => pet.id === params.id)
    return params.level === 1 ? '宠物蛋' : petItem?.name
  }
}

export const getIconByPetLevel = (params: {
  id: number | undefined
  level: number | undefined
}) => {
  if (params.id && params.level) {
    const petItem = petsPool.find((pet) => pet.id === params.id)

    if (petItem) {
      return petItem.levelIconMap[params.level]
    }
  }
}

export const petLevelByCoin = (coin: number) => {
  if (coin < 30) {
    return 1
  }
  return 2
}

export default petsPool
