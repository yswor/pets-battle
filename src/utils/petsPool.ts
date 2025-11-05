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

const petsPool = [
  {
    id: 1,
    name: '妙蛙种子',
    icon: new URL('../assets/pets/pet_1.png', import.meta.url).href,
    levelIconMap: {
      0: imgUrl('../assets/original_egg.png'),
      1: imgUrl('../assets/pets/pet_1.png'),
    },
  },
  {
    id: 2,
    name: '地地鼠',
    icon: new URL('../assets/pets/pet_2.png', import.meta.url).href,
    levelIconMap: {
      0: imgUrl('../assets/original_egg.png'),
      1: imgUrl('../assets/pets/pet_2.png'),
    },
  },
  {
    id: 3,
    name: '火狐狸',
    icon: new URL('../assets/pets/pet_3.png', import.meta.url).href,
    levelIconMap: {
      0: imgUrl('../assets/original_egg.png'),
      1: imgUrl('../assets/pets/pet_3.png'),
    },
  },
  {
    id: 4,
    name: '木木枭',
    icon: new URL('../assets/pets/pet_4.png', import.meta.url).href,
    levelIconMap: {
      0: imgUrl('../assets/original_egg.png'),
      1: imgUrl('../assets/pets/pet_4.png'),
    },
  },
  {
    id: 5,
    name: '呆火鳄',
    icon: new URL('../assets/pets/pet_5.png', import.meta.url).href,
    levelIconMap: {
      0: imgUrl('../assets/original_egg.png'),
      1: imgUrl('../assets/pets/pet_5.png'),
    },
  },
  {
    id: 6,
    name: '杰尼龟',
    icon: new URL('../assets/pets/pet_6.png', import.meta.url).href,
    levelIconMap: {
      0: imgUrl('../assets/original_egg.png'),
      1: imgUrl('../assets/pets/pet_6.png'),
    },
  },
  {
    id: 7,
    name: '泪眼蜥',
    icon: new URL('../assets/pets/pet_7.png', import.meta.url).href,
    levelIconMap: {
      0: imgUrl('../assets/original_egg.png'),
      1: imgUrl('../assets/pets/pet_7.png'),
    },
  },
  {
    id: 8,
    name: '胖丁',
    icon: new URL('../assets/pets/pet_8.png', import.meta.url).href,
    levelIconMap: {
      0: imgUrl('../assets/original_egg.png'),
      1: imgUrl('../assets/pets/pet_8.png'),
    },
  },
]

export const getRandomPetFromPool = () => {
  const randomIndex = Math.floor(Math.random() * petsPool.length)
  return petsPool[randomIndex]!
}

export default petsPool
