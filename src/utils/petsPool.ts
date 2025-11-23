import type { PetPoolItem } from '@/type'
import { computed } from 'vue'

const petIconMap = {
  orginalEgg: new URL('../assets/original_egg.png', import.meta.url).href,
  petA: new URL('../assets/pets/pet_1.png', import.meta.url).href,
  petB: new URL('../assets/pets/pet_2.png', import.meta.url).href,
  petC: new URL('../assets/pets/pet_3.png', import.meta.url).href,
  petD: new URL('../assets/pets/pet_4.png', import.meta.url).href,
  petE: new URL('../assets/pets/pet_5.png', import.meta.url).href,
  petF: new URL('../assets/pets/pet_6.png', import.meta.url).href,
  petG: new URL('../assets/pets/pet_7.png', import.meta.url).href,
  petH: new URL('../assets/pets/pet_8.png', import.meta.url).href,
}

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

const petsPool: PetPoolItem[] = [
  {
    id: 1,
    name: '妙蛙种子',
    levelIconMap: {
      1: petIconMap.orginalEgg,
      2: petIconMap.petA,
      3: petIconMap.petA,
      4: petIconMap.petA,
      5: petIconMap.petA,
    },
  },
  {
    id: 2,
    name: '地地鼠',
    levelIconMap: {
      1: petIconMap.orginalEgg,
      2: petIconMap.petB,
      3: petIconMap.petB,
      4: petIconMap.petB,
      5: petIconMap.petB,
    },
  },
  {
    id: 3,
    name: '火狐狸',
    levelIconMap: {
      1: petIconMap.orginalEgg,
      2: petIconMap.petC,
      3: petIconMap.petC,
      4: petIconMap.petC,
      5: petIconMap.petC,
    },
  },
  {
    id: 4,
    name: '木木枭',
    levelIconMap: {
      1: petIconMap.orginalEgg,
      2: petIconMap.petD,
      3: petIconMap.petD,
      4: petIconMap.petD,
      5: petIconMap.petD,
    },
  },
  {
    id: 5,
    name: '呆火鳄',
    levelIconMap: {
      1: petIconMap.orginalEgg,
      2: petIconMap.petE,
      3: petIconMap.petE,
      4: petIconMap.petE,
      5: petIconMap.petE,
    },
  },
  {
    id: 6,
    name: '杰尼龟',
    levelIconMap: {
      1: petIconMap.orginalEgg,
      2: petIconMap.petF,
      3: petIconMap.petF,
      4: petIconMap.petF,
      5: petIconMap.petF,
    },
  },
  {
    id: 7,
    name: '泪眼蜥',
    levelIconMap: {
      1: petIconMap.orginalEgg,
      2: petIconMap.petG,
      3: petIconMap.petG,
      4: petIconMap.petG,
      5: petIconMap.petG,
    },
  },
  {
    id: 8,
    name: '胖丁',
    levelIconMap: {
      1: petIconMap.orginalEgg,
      2: petIconMap.petH,
      3: petIconMap.petH,
      4: petIconMap.petH,
      5: petIconMap.petH,
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

export const getPetName = (level: number, name: string) => {
  return level === 1 ? '宠物蛋' : name
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

export const getLevel = (curLevel: number, exp: number) => {
  const nextLevelTotalExp = new Array(curLevel + 1)
    .fill(0)
    .reduce((prev, _, index) => prev + petEachLevelExpMap[index + 1], 0)

  return nextLevelTotalExp > exp ? curLevel : curLevel + 1
}

export const petEachLevelExpMap: Record<number, number> = {
  1: 0,
  2: 30,
  3: 90,
  4: 180,
  5: 400,
}

export default petsPool
