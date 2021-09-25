import { i18n } from '../../i18n/i18n';

export type FilterItem = {
  type: string;
  category: string;
  title: string;
  iconUrl: string;
  hasName?: boolean;
  hasLevel?: boolean;
  hasLevelRange?: boolean;
  isArea?: boolean;
};

export const mapFilters: FilterItem[] = [
  {
    category: 'locations',
    type: 'expedition',
    title: i18n('Expedition'),
    iconUrl: '/pois/expedition.webp',
    hasName: true,
  },
  {
    category: 'locations',
    type: 'fort',
    title: i18n('Fort'),
    iconUrl: '/pois/fort.webp',
    hasName: true,
  },
  {
    category: 'locations',
    type: 'outpost',
    title: i18n('Outpost'),
    iconUrl: '/pois/outpost.webp',
    hasName: true,
  },
  {
    category: 'locations',
    type: 'settlement',
    title: i18n('Settlement'),
    iconUrl: '/pois/settlement.webp',
    hasName: true,
  },
  {
    category: 'locations',
    type: 'spiritShrine',
    title: i18n('Spirit Shrine'),
    iconUrl: '/pois/spiritShrine.webp',
    hasName: true,
  },
  {
    category: 'chests',
    type: 'chestsElite',
    title: i18n('Chest Elite'),
    iconUrl: '/pois/chest.webp',
    hasName: true,
  },
  {
    category: 'chests',
    type: 'chestsLarge',
    title: i18n('Chest Large'),
    iconUrl: '/pois/chest.webp',
    hasName: true,
  },
  {
    category: 'chests',
    type: 'chestsCommon',
    title: i18n('Chest Common'),
    iconUrl: '/pois/chest.webp',
    hasName: true,
  },
  {
    category: 'enemies',
    type: 'boss',
    title: i18n('Boss'),
    iconUrl: '/pois/boss.webp',
    hasName: true,
    hasLevel: true,
  },
  {
    category: 'enemies',
    type: 'bossElite',
    title: i18n('Elite Boss'),
    iconUrl: '/pois/boss.webp',
    hasName: true,
    hasLevel: true,
  },
  {
    category: 'enemies',
    type: 'enemy_area',
    title: i18n('Enemy Area'),
    iconUrl: '/pois/enemy_area.webp',
    hasName: true,
    hasLevelRange: true,
    isArea: true,
  },
  {
    category: 'skinning',
    type: 'alligator',
    title: i18n('Alligator'),
    iconUrl: '/pois/alligator.webp',
  },
  {
    category: 'skinning',
    type: 'bear',
    title: i18n('Bear'),
    iconUrl: '/pois/bear.webp',
  },
  {
    category: 'skinning',
    type: 'bison',
    title: i18n('Bison'),
    iconUrl: '/pois/bison.webp',
  },
  {
    category: 'skinning',
    type: 'boar',
    title: i18n('Boar'),
    iconUrl: '/pois/boar.webp',
  },
  {
    category: 'skinning',
    type: 'cow',
    title: i18n('Cow'),
    iconUrl: '/pois/cow.webp',
  },
  {
    category: 'skinning',
    type: 'elk',
    title: i18n('Elk'),
    iconUrl: '/pois/elk.webp',
  },
  {
    category: 'skinning',
    type: 'elemential_forest',
    title: i18n('Elemential Forest'),
    iconUrl: '/pois/elk.webp',
  },
  {
    category: 'skinning',
    type: 'elemential_mountain',
    title: i18n('Elemential Mountain'),
    iconUrl: '/pois/bear.webp',
  },
  {
    category: 'skinning',
    type: 'elemential_tundra',
    title: i18n('Elemential Tundra'),
    iconUrl: '/pois/wolf.webp',
  },
  {
    category: 'skinning',
    type: 'goat',
    title: i18n('Goat'),
    iconUrl: '/pois/sheep.webp',
  },
  {
    category: 'skinning',
    type: 'lion',
    title: i18n('Lion'),
    iconUrl: '/pois/puma.webp',
  },
  {
    category: 'skinning',
    type: 'lynx',
    title: i18n('Lynx'),
    iconUrl: '/pois/lynx.webp',
  },
  {
    category: 'skinning',
    type: 'pig',
    title: i18n('Pig'),
    iconUrl: '/pois/pig.webp',
  },
  {
    category: 'skinning',
    type: 'hare',
    title: i18n('Rabbit'),
    iconUrl: '/pois/hare.webp',
  },
  {
    category: 'skinning',
    type: 'sheep',
    title: i18n('Sheep'),
    iconUrl: '/pois/sheep.webp',
  },
  {
    category: 'skinning',
    type: 'turkey',
    title: i18n('Turkey'),
    iconUrl: '/pois/turkey.webp',
  },
  {
    category: 'skinning',
    type: 'wolf',
    title: i18n('Wolf'),
    iconUrl: '/pois/wolf.webp',
  },
  {
    category: 'mining',
    type: 'crystal',
    title: i18n('Crystal'),
    iconUrl: '/pois/crystal.webp',
  },
  {
    category: 'mining',
    type: 'gold',
    title: i18n('Gold'),
    iconUrl: '/pois/gold.webp',
  },
  {
    category: 'mining',
    type: 'iron',
    title: i18n('Iron'),
    iconUrl: '/pois/iron.webp',
  },
  {
    category: 'mining',
    type: 'lodestone',
    title: i18n('Lodestone'),
    iconUrl: '/pois/lodestone.webp',
  },
  {
    category: 'mining',
    type: 'oil',
    title: i18n('Oil'),
    iconUrl: '/pois/oil.webp',
  },
  {
    category: 'mining',
    type: 'orichalcum',
    title: i18n('Orichalcum'),
    iconUrl: '/pois/orichalcum.webp',
  },
  {
    category: 'mining',
    type: 'platinum',
    title: i18n('Platinum'),
    iconUrl: '/pois/platinum.webp',
  },
  {
    category: 'mining',
    type: 'saltpeter',
    title: i18n('Saltpeter'),
    iconUrl: '/pois/saltpeter.webp',
  },

  {
    category: 'mining',
    type: 'silver',
    title: i18n('Silver'),
    iconUrl: '/pois/silver.webp',
  },
  {
    category: 'mining',
    type: 'starmetal',
    title: i18n('Starmetal'),
    iconUrl: '/pois/starmetal.webp',
  },
  {
    category: 'fishing',
    type: 'fish_hotspot1',
    title: i18n('Fish Broad'),
    iconUrl: '/pois/fish_hotspot1.webp',
  },
  {
    category: 'fishing',
    type: 'fish_hotspot2',
    title: i18n('Fish Rare'),
    iconUrl: '/pois/fish_hotspot2.webp',
  },
  {
    category: 'fishing',
    type: 'fish_hotspot3',
    title: i18n('Fish Secret'),
    iconUrl: '/pois/fish_hotspot3.webp',
  },
  {
    category: 'logging',
    type: 'ironwood',
    title: i18n('Ironwood Tree'),
    iconUrl: '/pois/ironwood_compass.webp',
  },
  {
    category: 'logging',
    type: 'wyrdwood',
    title: i18n('Wyrdwood Tree'),
    iconUrl: '/pois/wyrdwood_compass.webp',
  },
  {
    category: 'farming',
    type: 'azoth_spring',
    title: i18n('Azoth Spring'),
    iconUrl: '/pois/azoth_spring.webp',
  },
  {
    category: 'farming',
    type: 'cooking_ingredient',
    title: i18n('Cooking Ingredient'),
    iconUrl: '/pois/broccoli.webp',
  },
  {
    category: 'farming',
    type: 'fungus',
    title: i18n('Fungus'),
    iconUrl: '/pois/fungi.webp',
  },
  {
    category: 'farming',
    type: 'hemp',
    title: i18n('Hemp'),
    iconUrl: '/pois/hemp_compass.webp',
  },
  {
    category: 'farming',
    type: 'herb',
    title: i18n('Herb'),
    iconUrl: '/pois/herbs.webp',
  },
  {
    category: 'farming',
    type: 'silkweed',
    title: i18n('Silkweed'),
    iconUrl: '/pois/silkweed.webp',
  },
  {
    category: 'farming',
    type: 'wirefiber',
    title: i18n('Wirefiber'),
    iconUrl: '/pois/wirefiber.webp',
  },
  {
    category: 'npc',
    type: 'npc_generic',
    title: i18n('Generic'),
    iconUrl: '/pois/npc_generic.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_inn',
    title: i18n('Inn'),
    iconUrl: '/pois/npc_inn.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_convenant',
    title: i18n('Convenant'),
    iconUrl: '/pois/npc_convenant.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_marauder',
    title: i18n('Marauder'),
    iconUrl: '/pois/npc_marauder.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_syndicate',
    title: i18n('Syndicate'),
    iconUrl: '/pois/npc_syndicate.webp',
    hasName: true,
  },
  {
    category: 'lore',
    type: 'lore_note',
    title: i18n('Lore Note'),
    iconUrl: '/pois/lore_note.webp',
    hasName: true,
  },

  {
    category: 'essences',
    type: 'essences_shockbulb',
    title: i18n('Shockbulb'),
    iconUrl: '/pois/wind_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_shockspire',
    title: i18n('Shockspire'),
    iconUrl: '/pois/wind_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_lightning_beetle',
    title: i18n('Ligthning Beetle'),
    iconUrl: '/pois/wind_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_blightroot',
    title: i18n('Blightroot'),
    iconUrl: '/pois/death_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_blightcrag',
    title: i18n('Blightcrag'),
    iconUrl: '/pois/death_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_blightmoth',
    title: i18n('Blightmoth'),
    iconUrl: '/pois/death_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_earthspine',
    title: i18n('Earthspine'),
    iconUrl: '/pois/earth_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_earthcrag',
    title: i18n('Earthcrag'),
    iconUrl: '/pois/earth_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_earthshell_turtle',
    title: i18n('Earthshell Turtle'),
    iconUrl: '/pois/earth_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_dragonglory',
    title: i18n('Dragonglory'),
    iconUrl: '/pois/fire_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_scorchstone',
    title: i18n('Scorchstone'),
    iconUrl: '/pois/fire_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_salamander_snail',
    title: i18n('Salamander Snail'),
    iconUrl: '/pois/fire_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_lifebloom',
    title: i18n('Lifebloom'),
    iconUrl: '/pois/life_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_lifejewel',
    title: i18n('Lifejewel'),
    iconUrl: '/pois/life_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_lifemoth',
    title: i18n('Lifemoth'),
    iconUrl: '/pois/life_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_soulsprout',
    title: i18n('Soulsprout'),
    iconUrl: '/pois/spirit_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_soulspire',
    title: i18n('Soulspire'),
    iconUrl: '/pois/spirit_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_soulwyrm',
    title: i18n('Soulwyrm'),
    iconUrl: '/pois/spirit_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_rivercress',
    title: i18n('Rivercress'),
    iconUrl: '/pois/water_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_springstone',
    title: i18n('Springstone'),
    iconUrl: '/pois/water_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_floating_spinefish',
    title: i18n('Floating Spinefish'),
    iconUrl: '/pois/water_boid.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_black_primsabloom',
    title: i18n('Black Prismabloom'),
    iconUrl: '/pois/pigment_black.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_blue_primsabloom',
    title: i18n('Blue Prismabloom'),
    iconUrl: '/pois/pigment_blue.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_brown_primsabloom',
    title: i18n('Brown Prismabloom'),
    iconUrl: '/pois/pigment_brown.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_green_primsabloom',
    title: i18n('Green Prismabloom'),
    iconUrl: '/pois/pigment_green.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_orange_primsabloom',
    title: i18n('Orange Prismabloom'),
    iconUrl: '/pois/pigment_orange.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_purple_primsabloom',
    title: i18n('Purple Prismabloom'),
    iconUrl: '/pois/pigment_purple.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_red_primsabloom',
    title: i18n('Red Prismabloom'),
    iconUrl: '/pois/pigment_red.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_white_primsabloom',
    title: i18n('White Prismabloom'),
    iconUrl: '/pois/pigment_white.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_yellow_primsabloom',
    title: i18n('Yellow Prismabloom'),
    iconUrl: '/pois/pigment_yellow.webp',
  },
  {
    category: 'other',
    type: 'miscellaneous',
    title: i18n('Miscellaneous'),
    iconUrl: '/pois/other.webp',
  },
];

export type MapFiltersCategory = {
  value: string;
  title: string;
  filters: FilterItem[];
};

export const mapFiltersCategories: MapFiltersCategory[] = [
  {
    value: 'locations',
    title: i18n('Locations'),
    filters: mapFilters.filter(
      (mapFilter) => mapFilter.category === 'locations'
    ),
  },
  {
    value: 'chests',
    title: i18n('Chests'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'chests'),
  },
  {
    value: 'enemies',
    title: i18n('Enemies'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'enemies'),
  },
  {
    value: 'farming',
    title: i18n('Farming'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'farming'),
  },
  {
    value: 'fishing',
    title: i18n('Fishing'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'fishing'),
  },
  {
    value: 'logging',
    title: i18n('Logging'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'logging'),
  },
  {
    value: 'mining',
    title: i18n('Mining'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'mining'),
  },
  {
    value: 'skinning',
    title: i18n('Skinning'),
    filters: mapFilters.filter(
      (mapFilter) => mapFilter.category === 'skinning'
    ),
  },

  {
    value: 'lore',
    title: i18n('Lore'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'lore'),
  },
  {
    value: 'essences',
    title: i18n('Essences'),
    filters: mapFilters.filter(
      (mapFilter) => mapFilter.category === 'essences'
    ),
  },
  {
    value: 'pigment',
    title: i18n('Pigments'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'pigment'),
  },
  {
    value: 'npc',
    title: i18n('NPC'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'npc'),
  },
  {
    value: 'other',
    title: i18n('Other'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'other'),
  },
];
