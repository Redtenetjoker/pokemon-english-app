#!/bin/bash
# Generate Pokemon TCG-style cards for PetDetailPage
# Uses MiniMax image-01 model

export MINIMAX_API_HOST="https://api.minimaxi.com"
export MINIMAX_API_KEY="sk-cp-39Kwgsz3Wf-UfBPoHLeRdip_-V4TfDnxKUOZ2Cao_lXl9-xPAOZmMwpT5GfwmQKwP_INZnLZdIpxpjdF-Q_-u2BnkCTX_gi8uriJDJPV30YH0-BZ8CWhVG8"
export PATH="C:\home\redjoker\.openclaw\workspace\skills\minimax-multimodal-toolkit\scripts;$PATH"

SCRIPT="C:\home\redjoker\.openclaw\workspace\skills\minimax-multimodal-toolkit\scripts\image\generate_image.sh"
OUTPUT="C:\home\redjoker\.openclaw\workspace\english-learning-app\public\images\pokemon-cards"

mkdir -p "$OUTPUT"

# Pokemon data: id, name_en, name_cn
declare -a POKEMON=(
  "25:Pikachu:皮卡丘"
  "26:Raichu:雷丘"
  "58:Growlithe:卡蒂狗"
  "6:Charizard:喷火龙"
  "7:Squirtle:杰尼龟"
  "136:Flareon:火伊布"
  "63:Abra:凯西"
  "129:Magikarp:鲤鱼王"
  "21:Spearow:烈雀"
  "39:Jigglypuff:胖丁"
  "143:Snorlax:卡比兽"
  "66:Machop:腕力"
  "67:Machamp:怪力"
  "133:Eevee:伊布"
  "135:Jolteon:雷伊布"
  "134:Vaporeon:水伊布"
  "1:Bulbasaur:妙蛙种子"
  "44:Oddish:霸王花"
  "45:Vileplume:魔雾花"
  "113:Chansey:吉利蛋"
  "54:Psyduck:可达鸭"
  "144:Articuno:急冻鸟"
  "4:Charmander:小火龙"
  "74:Geodude:小拳石"
  "2:Ivysaur:妙蛙草"
  "15:Beedrill:大针蜂"
  "61:Poliwag:蚊香蛙"
  "128:Tauros:肯泰罗"
  "137:Porygon:百变怪"
  "10:Caterpie:绿毛虫"
  "102:Exeggcute:蛋蛋"
  "83:Farfetch'd:大葱鸭"
  "40:Wigglytuff:肥大"
  "100:Voltorb:霹雳电球"
  "79:Slowpoke:呆呆兽"
  "13:Weedle:独角虫"
  "108:Lickitung:大舌头"
  "18:Pidgeot:大比鸟"
)

for entry in "${POKEMON[@]}"; do
  IFS=':' read -r id name_en name_cn <<< "$entry"
  
  echo "Generating card for $name_en ($id)..."
  
  bash "$SCRIPT" \
    --prompt "Pokemon card, holographic foil treatment, centered chibi $name_en, Chinese name $name_cn below, card has golden yellow border, soft studio lighting, Pokemon TCG collectible card game aesthetic, white background, high detail, vibrant colors, 1:1 aspect ratio" \
    --aspect-ratio 1:1 \
    -n 1 \
    -o "$OUTPUT/card_${id}.png" \
    --no-download
  
  if [ $? -eq 0 ]; then
    echo "✓ Card $id generated"
  else
    echo "✗ Card $id failed"
  fi
  
  sleep 1
done

echo "Done! Files saved to $OUTPUT"
