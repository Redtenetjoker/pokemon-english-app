// Pokemon data service using PokeAPI + local card images
// Local card images from MiniMax image-01 generation

export const POKEMON_COUNT = 151

// Local card image base path (generated via MiniMax)
const getLocalCardImage = (id: number): string | null => {
  // Map of Pokemon ID -> local card image filename (if generated)
  // Format: pokemon-card-{id}---{uuid}.png
  const generatedCards: Record<number, string> = {
    1: 'pokemon-card-1---b424ee1a-036a-4032-8f8c-f5c9b9e69d90.png',
    2: 'pokemon-card-2---adaa483f-5b9c-4e84-a70b-6bfa43cb806c.png',
    4: 'pokemon-card-4---a7181db2-1f56-4853-be07-851399dca812.png',
    6: 'pokemon-card-6---973a08de-b872-4250-a582-f83cb21646ed.png',
    7: 'pokemon-card-7---b58ee176-5175-4015-be48-3f49489b8ee2.png',
    15: 'pokemon-card-15---172941af-9d92-49fb-b9a4-1c1b623167ed.png',
    18: 'pokemon-card-18---a2ddcc8d-e686-4f69-8613-65f5d556c56b.png',
    21: 'pokemon-card-21---a1880629-717e-4590-bb95-556185f90a95.png',
    25: 'pokemon-card-25---43f1f8bf-08da-4689-8471-7974c37a1928.png',
    26: 'pokemon-card-26---bd82f252-a83b-41c0-94da-9c2d4814ff94.png',
    37: 'pokemon-card-37---8f74d772-19ba-4338-b740-75be758ef42f.png',
    39: 'pokemon-card-39---5cc2ed59-8df0-4032-8584-0cf893e7c371.png',
    41: 'pokemon-card-41---6b83fb55-5de3-4895-ace7-2f98653740fc.png',
    44: 'pokemon-card-44---48dba20e-e511-4990-9d5c-a93870048fa6.png',
    45: 'pokemon-card-45---f51c75fd-d0da-45f0-8fcd-7f268482142a.png',
    46: 'pokemon-card-46---52b23e21-2fbc-425f-9aac-cabc73abc077.png',
    48: 'pokemon-card-48---7047ad8c-068e-459d-a8c2-8b9df224f374.png',
    50: 'pokemon-card-50---48c02046-f145-40c7-bb67-2d64cd9cda01.png',
    54: 'pokemon-card-54---e21ad642-c113-4145-bf20-ca859caf6d6c.png',
    58: 'pokemon-card-58---53d1bfdc-d3ab-44e7-875f-57b66fdd870a.png',
    60: 'pokemon-card-60---fc223ff9-6786-4bdf-88c0-35a730d56276.png',
    61: 'pokemon-card-61---a72238df-4bb2-453e-83ef-d023ff872837.png',
    63: 'pokemon-card-63---61e82686-4de5-4255-bce3-4d0f76785f74.png',
    66: 'pokemon-card-66---d4c4e91a-bc48-4164-aeaa-a638f8d27d87.png',
    69: 'pokemon-card-69---dd2a5857-13a7-47f7-9ddd-a0b4f3f052b1.png',
    79: 'pokemon-card-79---e65538d8-2a28-4315-9aba-b1b0d8112289.png',
    94: 'pokemon-card-94---3fa60c0f-12e7-4723-aaff-4c37d63b64c6.png',
    106: 'pokemon-card-106---626d75c6-470a-4f07-9d2c-84b163277f4b.png',
    113: 'pokemon-card-113---a0bcf4da-4ea0-4c5f-bf2a-59f1ad423c90.png',
    114: 'pokemon-card-114---4a207202-7ea7-4482-9465-8837dfdca226.png',
    115: 'pokemon-card-115---2a60b3b9-4539-48b4-a5cf-5badd4cef6c0.png',
    116: 'pokemon-card-116---346afd96-0e33-43d0-8130-7b6bd18493ae.png',
    120: 'pokemon-card-120---b29ec4b6-3ccf-45c5-a584-222a61c14d89.png',
    123: 'pokemon-card-123---4531227a-774a-4cb8-8317-5c129f704c4a.png',
    125: 'pokemon-card-125---c26e99b2-79f9-42a7-8be1-70a8dbaac447.png',
    126: 'pokemon-card-126---7af9299d-c3e7-448c-85a7-c97e0de75cbb.png',
    128: 'pokemon-card-128---58f71a56-c7db-4671-8229-64c4cff18a20.png',
    129: 'pokemon-card-129---13a6b497-4eb6-48a0-8d85-9af7d31bdc87.png',
    131: 'pokemon-card-131---90fbc400-cf7b-42e7-8c8d-d3fd15e583db.png',
    133: 'pokemon-card-133---dbdfbda2-cdac-4110-ae98-5ea1343f33d1.png',
    135: 'pokemon-card-135---3be12459-02ce-44a2-a49d-14ea9d021dc9.png',
    136: 'pokemon-card-136---caa3804b-8f13-43b6-9121-cffd37060690.png',
    137: 'pokemon-card-137---360d6c57-bce7-4a2c-ac2a-14c8dabd6453.png',
    139: 'pokemon-card-139---8bf979e9-6bd3-478b-9460-a1ee1ec75478.png',
    142: 'pokemon-card-142---bd50755a-75b3-4939-a64e-8580a68c7ae1.png',
    143: 'pokemon-card-143---19279b13-ed26-4c7c-831c-1e1c6f2a9421.png',
    144: 'pokemon-card-144---d5fcdb28-f6e2-49a2-82c1-675471f28995.png',
    149: 'pokemon-card-149---26e07df4-6b74-4f41-960e-8ba0b4787f92.png',
    150: 'pokemon-card-150---c06e883c-4ea6-435d-9b42-c1f6f8d3f362.png',
    151: 'pokemon-card-151---043dbe1f-b7a2-4400-ba2a-70f725d690f5.png',
  }
  return generatedCards[id] || null
}

export const getPokemonCardImage = (id: number): string => {
  const localCard = getLocalCardImage(id)
  if (localCard) {
    return `/images/pokemon-cards/${localCard}`
  }
  return getPokemonSprite(id) // fallback to sprite
}

// Word illustration images (generated via MiniMax)
// Map of word -> image filename
const generatedWordImages: Record<string, string> = {
  'apple': 'word-apple---5f63656d-4e6d-4754-8562-5c94cf67bbea.png',
  'ball': 'word-ball---d0270384-c8e8-4bf8-be19-754b71d896e9.png',
  'banana': 'word-banana---29337d3c-c032-4278-88fd-dbfdc5834af9.png',
  'big': 'word-big---9ce545ae-be91-4173-94bf-dfdd475e4710.png',
  'bird': 'word-bird---2f78a33f-ebf2-4e65-870f-86d0ca08fd94.png',
  'blue': 'word-blue---b76e85d1-ae75-4fc4-acba-708226fb3371.png',
  'book': 'word-book---f86b032c-e285-4a57-ab5d-4739505d73ef.png',
  'cat': 'word-cat---25f447e4-8209-4705-988e-4c9e3a97296b.png',
  'cookie': 'word-cookie---346615da-bd38-4c10-94a4-77425e1fb925.png',
  'dog': 'word-dog---1723d74d-9431-484d-9656-28fbdd913ca3.png',
  'duck': 'word-duck---b269d881-5422-419f-8804-3b9045bdd4d9.png',
  'face': 'word-face---8b47c4e3-75f3-465f-9a44-1c658cc9a1d4.png',
  'fish': 'word-fish---f45daff2-1b49-42e2-a5f8-8adac36792db.png',
  'flower': 'word-flower---bf8afdb5-94b5-408b-a1a8-987cf02003eb.png',
  'frog': 'word-frog---124f113e-a1ab-4e39-ba4c-b99eae24c973.png',
  'horse': 'word-horse---89e404cb-c86b-49ea-b713-5dbe0dad984f.png',
  'jump': 'word-jump---4286938c-3b92-40af-9f03-9527ab1a25df.png',
  'long': 'word-long---3df07a7c-b75f-45f7-b981-d5a9b27917fc.png',
  'milk': 'word-milk---c8688806-7362-46f2-a456-7eba5645b2bf.png',
  'monkey': 'word-monkey---8491d463-af72-4300-af77-2d76ffca1ca3.png',
  'moon': 'word-moon---c8688806-7362-46f2-a456-7eba5645b2bf.png',
  'pizza': 'word-pizza---f86b032c-e285-4a57-ab5d-4739505d73ef.png',
  'rain': 'word-rain---f45daff2-1b49-42e2-a5f8-8adac36792db.png',
  'red': 'word-red---b76e85d1-ae75-4fc4-acba-708226fb3371.png',
  'run': 'word-run---4286938c-3b92-40af-9f03-9527ab1a25df.png',
  'sheep': 'word-sheep---733bcb15-aee6-4dfc-b759-315e4868362c.png',
  'snow': 'word-snow---124f113e-a1ab-4e39-ba4c-b99eae24c973.png',
  'star': 'word-star---c8688806-7362-46f2-a456-7eba5645b2bf.png',
  'sun': 'word-sun---c8688806-7362-46f2-a456-7eba5645b2bf.png',
  'tree': 'word-tree---bf8afdb5-94b5-408b-a1a8-987cf02003eb.png',
}

export const getWordImageUrl = (word: string): string | null => {
  const lowerWord = word.toLowerCase()
  const filename = generatedWordImages[lowerWord]
  if (filename) {
    return `/images/${filename}`
  }
  return null
}

export const getPokemonSprite = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

export const getPokemonShinySprite = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`

// Chinese names for Gen 1 Pokemon (hardcoded for MVP)
const pokemonNames: Record<number, string> = {
  1: '妙蛙种子', 2: '妙蛙草', 3: '妙蛙花',
  4: '小火龙', 5: '火恐龙', 6: '喷火龙',
  7: '杰尼龟', 8: '卡咪龟', 9: '水箭龟',
  10: '绿毛虫', 11: '铁甲蛹', 12: '巴大蝶',
  13: '独角虫', 14: '铁壳蛹', 15: '大针蜂',
  16: '波波', 17: '比比鸟', 18: '大比鸟',
  19: '小拉达', 20: '拉达', 21: '烈雀',
  22: '大嘴雀', 23: '阿柏蛇', 24: '阿柏怪',
  25: '皮卡丘', 26: '雷丘', 27: '穿山鼠',
  28: '穿山王', 29: '尼多兰', 30: '尼多娜',
  31: '尼多后', 32: '尼多朗', 33: '尼多力诺',
  34: '尼多王', 35: '皮皮', 36: '皮可西',
  37: '六尾', 38: '九尾', 39: '胖丁',
  40: '胖可丁', 41: '超音蝠', 42: '大嘴蝠',
  43: '走路草', 44: '臭臭花', 45: '霸王花',
  46: '派拉斯', 47: '派拉斯特', 48: '毛球',
  49: '摩鲁蛾', 50: '地鼠', 51: '三地鼠',
  52: '喵喵', 53: '猫老大', 54: '可达鸭',
  55: '哥达鸭', 56: '猴怪', 57: '火暴猴',
  58: '卡蒂狗', 59: '风速狗', 60: '蚊香蝌蚪',
  61: '蚊香蛙', 62: '快泳蛙', 63: '凯西',
  64: '勇基拉', 65: '胡地', 66: '腕力',
  67: '豪力', 68: '怪力', 69: '喇叭芽',
  70: '口呆花', 71: '大食花', 72: '玛瑙水母',
  73: '毒刺水母', 74: '小拳石', 75: '隆隆石',
  76: '隆隆岩', 77: '小火马', 78: '烈焰马',
  79: '呆呆兽', 80: '呆壳兽', 81: '小磁怪',
  82: '三合一磁怪', 83: '大葱鸭', 84: '嘟嘟',
  85: '嘟嘟利', 86: '小海狮', 87: '白海狮',
  88: '臭泥', 89: '臭臭泥', 90: '大舌贝',
  91: '刺甲贝', 92: '鬼斯', 93: '鬼斯通',
  94: '耿鬼', 95: '大岩蛇', 96: '催眠貘',
  97: '引梦貘人', 98: '大钳蟹', 99: '巨钳蟹',
  100: '霹雳电球', 101: '顽皮雷弹', 102: '蛋蛋',
  103: '椰蛋树', 104: '卡拉卡拉', 105: '嘎啦嘎啦',
  106: '飞腿郎', 107: '快拳郎', 108: '大舌头',
  109: '瓦斯弹', 110: '双弹瓦斯', 111: '独角犀牛',
  112: '钻角犀兽', 113: '吉利蛋', 114: '蔓藤怪',
  115: '袋兽', 116: '墨海马', 117: '海刺龙',
  118: '角金鱼', 119: '金鱼王', 120: '角伊',
  121: '伊布', 122: '水伊布', 123: '雷伊布',
  124: '火伊布', 125: '多边兽', 126: '菊石兽',
  127: '化石翼龙', 128: '卡比兽', 129: '百变怪',
  130: '迷你龙', 131: '哈古龙', 132: '快龙',
  133: '伊布', 134: '水伊布', 135: '雷伊布',
  136: '火伊布', 137: '多边兽', 138: '菊石兽',
  139: '化石翼龙', 140: '卡比兽', 141: '百变怪',
  142: '迷你龙', 143: '哈古龙', 144: '快龙',
  145: '化石翼龙', 146: '梦火焰', 147: '迷你龙',
  148: '哈古龙', 149: '快龙', 150: '超梦',
  151: '梦幻',
}

export const getPokemonName = (id: number): string =>
  pokemonNames[id] || `Pokemon #${id}`

export const getRandomPokemonId = (): number =>
  Math.floor(Math.random() * POKEMON_COUNT) + 1

export const getPokemonData = (id: number) => ({
  id,
  name: `pokemon_${id}`,
  nameCn: getPokemonName(id),
  image: getPokemonSprite(id),
})
