import {CATEGORY_ID} from 'constants/CATEGORIES';
import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import REGEX, {
  USELESS_PRE_NEWLINE,
  PRELINE_SPACES,
  EXCESSIVE_NEW_LINES,
} from 'constants/REGEXES';

export const CLEAN_RAW_DELAY = 50;
export const FULL_PARSE_DELAY = 50;

export const DISPLAY_SCRUB_DELAY = 5;
export const FILTER_DELAY = 3;

// -- log level
export const DEFAULT_CATEGORIES_VISIBLE = [
  // CATEGORY_ID.UNCATEGORIZED,
  CATEGORY_ID.ASCENSION_INFO,
  // CATEGORY_ID.SNAPSHOT_INFO,
  CATEGORY_ID.QUEST,
  CATEGORY_ID.IOTM,
  CATEGORY_ID.COMBAT,
  CATEGORY_ID.NONCOMBAT,
  CATEGORY_ID.CHOICEADV,
  CATEGORY_ID.DIET,
  CATEGORY_ID.USE_ITEM,
  // CATEGORY_ID.EFFECTS,
  // CATEGORY_ID.CRAFTING,
  CATEGORY_ID.PULLS,
  // CATEGORY_ID.FAMILIARS,
  // CATEGORY_ID.EQUIPMENT,
  // CATEGORY_ID.VISIT,
  // CATEGORY_ID.TRANSACTIONS,
  // CATEGORY_ID.OTHER,
];
// strings we are going to remove from the ahead of time
export const PREREMOVE_REGEX_LIST = [
  // -- always first
  REGEX.MAFIOSO.LOG_COMMENTS,
  REGEX.KOLMAFIA.STACK_TRACE,
  REGEX.KOLMAFIA.CLI_PRINT,
  REGEX.KOLMAFIA.SEND_A_KMAIL,
  REGEX.KOLMAFIA.EMPTY_CHECKPOINT,
  REGEX.KOLMAFIA.COMBAT_MACRO,
  REGEX.KOLMAFIA.MAFIA_MAXIMIZER,
  REGEX.PREREMOVE.ALWAYS_CATCHALL,
  REGEX.PREREMOVE.SINGLELINE_CATCHALL,
  REGEX.PREREMOVE.NO_FOLLOWUP_CATCHALL,
  REGEX.PREREMOVE.USELESS_LEAFLET_LINE,
  REGEX.PREREMOVE.RAFFLE_TEXT,
  REGEX.PREREMOVE.SWIMMING_POOL,
  REGEX.PREREMOVE.MCD_CHANGE,
  REGEX.PREREMOVE.UNEQUIP,
  REGEX.PREREMOVE.TELESCOPE,
  REGEX.PREREMOVE.FAMILIAR_WEIGHT_GAIN,
  // -- remove because unsupported
  REGEX.ASDON_MARTIN.CONVERTING_LINE,
  REGEX.CONSPIRACY_ISLAND.TEXT,
  REGEX.CONSPIRACY_ISLAND.CONTROL_PANEL_LINE,
  REGEX.KREMLINS_GREATEST_BRIEFCASE.FIDDLING,
  REGEX.SNOJO.VISIT_CONTROL_LINE,
  // -- remove generally
  REGEX.ITEMS.CRAFTING_USED_LINE,
  REGEX.EFFECTS.LOSE_EFFECT_LINE,
  REGEX.EFFECTS.UNMATCHED_EFFECT,
  REGEX.BEACH_COMB.COMB_SQUARE_LINE,
  REGEX.CAT_BURGLAR.USELESS_HEIST_GROUP,
  REGEX.LATTE_LOVERS_MEMBERS_MUG.DO_NOTHING_CHOICE,
  REGEX.PILL_KEEPER.NEVERMIND_LINE,
  REGEX.QUEST.USELESS_DESERT_PYRAMID,
  // -- run again
  REGEX.PREREMOVE.SINGLELINE_CATCHALL,
  REGEX.PREREMOVE.NO_FOLLOWUP_CATCHALL,
  // -- always last clean up
  PRELINE_SPACES,
  EXCESSIVE_NEW_LINES,
];
// strings we are going to group together
export const PREGROUP_REGEX_LIST = [
  REGEX.ASCENSION.VALHALLA_GROUP,
  REGEX.SNAPSHOT.BEGIN_ASCENSION_SNAPSHOT,
  REGEX.SNAPSHOT.PLAYER_SNAPSHOT,
  REGEX.GROUP.MCLUSKY_FILE_AND_USE_BINDER,
  // REGEX.GROUP.SAME_AFTER_BATTLE,
  REGEX.QUEST.STAFF_AND_DESERT_GROUP,
  REGEX.IUNION_CROWN.AFTER_BATTLE_LINEBREAK_GROUP,
  REGEX.SONGBOOM_BOOMBOX.GROUPING,
  // REGEX.GOD_LOBSTER.GROUPING,
  // REGEX.VOTING_BOOTH.GROUPING,
];
// -- individual entry level
// text we will remove from the display text,
//  most likely because we already parsed the data
export const DISPLAY_SCRUB_LIST = [
  REGEX.LINE.LOCATION,
  REGEX.LINE.ENCOUNTER,
  REGEX.LINE.DIET_GAIN_LINE,
  REGEX.LINE.VISITING,
  REGEX.CHARACTER.LEVEL_GAIN,
  REGEX.CHARACTER.SUBSTAT_GAINS,
  REGEX.CHARACTER.ADV_CHANGE_LINE,
  REGEX.CHARACTER.HP_CHANGE,
  REGEX.CHARACTER.MP_CHANGE,
  REGEX.CHARACTER.MUS_EXP_CHANGE,
  REGEX.CHARACTER.MYST_EXP_CHANGE,
  REGEX.CHARACTER.MOX_EXP_CHANGE,
  REGEX.COMBAT.FREE_COMBAT,
  REGEX.COMBAT.INITIATIVE_LINE,
  REGEX.COMBAT.COMBAT_ROUND_LINE,
  REGEX.COMBAT.REPLACED_LINE,
  REGEX.COMBAT.VICTORY_LINE,
  REGEX.TRANSACTIONS.ACQUIRED_SOMETHING,
  REGEX.TRANSACTIONS.MEAT_CHANGED_LINE,
  REGEX.TRANSACTIONS.MEAT_SPENT,
  REGEX.TRANSACTIONS.SHOPPING,
  REGEX.ITEMS.CONSUMPTION_LINE,
  REGEX.ITEMS.HAGNK_PULL_LINE,
  REGEX.ITEMS.USE_ITEM_LINE_FIRST_ONLY,
  REGEX.ITEMS.ZAP_LINE,
  REGEX.EFFECTS.CAST_LINE,
  REGEX.DECK_OF_EVERY_CARD.USELESS_PLAY,
  REGEX.DISTANCE_WOODS_GETAWAY.USELESS_GAZING_LINE,
  REGEX.COMMUNITY_SERVICE.CHOICE_LINE,
  REGEX.KOLMAFIA.CHOICE_PHP_LINE,
  REGEX.DIABOLIC_PIZZA.INGREDIENTS_LINE,
  REGEX.DIABOLIC_PIZZA.EAT_LINE,
  REGEX.DISTANCE_WOODS_GETAWAY.GAZING_LINE,
  REGEX.FOURTH_OF_MAY_COSPLAY_SABER.USE_THE_FORCE_CHOICE_LINE,
  REGEX.POCKET_PROFESSOR.AFTER_COMBAT_TEXT,
  REGEX.QUEST.VISIT_TOOT,  
  REGEX.QUEST.COMBINE_WAND_GROUP,
  REGEX.QUEST.OPEN_DESERT_PYRAMID,
  // cleans up blank lines after text is scrubbed 
  USELESS_PRE_NEWLINE, 
];
// entries that don't need to have any body text
export const COMBINABLE_ENTRIES_LIST = [
  ENTRY_TYPE.TALKING,
  ENTRY_TYPE.TRANSACTION,
  ENTRY_TYPE.IOTM.BASTILLE_BATTALION,
  ENTRY_TYPE.IOTM.BEACH_COMB,
  ENTRY_TYPE.IOTM.CAT_BURGLAR,
  ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY,
  ENTRY_TYPE.IOTM.JANUARYS_GARBAGE_TOTE,
  ENTRY_TYPE.QUEST.TOOT_ORIOLE,
  ENTRY_TYPE.ITEMS.HAGNK_PULL,
  ENTRY_TYPE.ITEMS.EQUIP_PLAYER,
];