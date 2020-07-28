import ENTRY_TYPE from 'constants/entryType';
import REGEX, {
  BACK_NEW_LINE_REGEX, 
  PRE_LINE_EMPTY_SPACE,
  POST_LINE_EMPTY_SPACE,
} from 'constants/regexes';

export const CLEAN_RAW_DELAY = 50;
export const FULL_PARSE_DELAY = 50;

export const DISPLAY_SCRUB_DELAY = 5;
export const FILTER_DELAY = 3;

// -- log level
// some data that is always filtered out
export const ALWAYS_HIDDEN_ENTRIES = [
  ENTRY_TYPE.IOTM.GARBAGE_TOTE,
  ENTRY_TYPE.UNKNOWN,
  ENTRY_TYPE.SPELL_CAST,
  ENTRY_TYPE.CLOSET_PUT,
  ENTRY_TYPE.CLOSET_TAKE,
  ENTRY_TYPE.FAMILIAR,
  // ENTRY_TYPE.IOTM.PIRATEREALM,
  // ENTRY_TYPE.CLAN_VISIT,
  ENTRY_TYPE.PVP,
];
// strings we are going to remove from the ahead of time
export const PREREMOVE_REGEX_LIST = [
  REGEX.BOXING_DAYCARE.VISIT,
  REGEX.MISC.STACK_TRACE,
  REGEX.MISC.CLI_PRINT,
  REGEX.MISC.SEND_A_KMAIL,
  REGEX.MISC.EMPTY_CHECKPOINT,
  REGEX.MISC.COMBAT_MACRO,
  REGEX.MISC.MAFIA_CHOICE_URL,
  REGEX.MISC.MAFIA_MAXIMIZER,
  REGEX.MISC.LOG_BORDER,
  REGEX.LINE.MCD_CHANGE,
  REGEX.LINE.UNAFFECT,
  REGEX.LINE.UNEQUIP,
  REGEX.LINE.USELESS_VISIT,
  REGEX.LINE.TELESCOPE,
  REGEX.LINE.SWIMMING_POOL,
  REGEX.DISTANCE_WOODS_GETAWAY.EMPTY_GAZING_LINE,
  PRE_LINE_EMPTY_SPACE,
  POST_LINE_EMPTY_SPACE,
];
// strings we are going to group together
export const PREGROUP_REGEX_LIST = [
  REGEX.GROUP.MOON_SNAPSHOT,
  REGEX.GROUP.STATUS_SNAPSHOT,
  REGEX.GROUP.EQUIPMENT_SNAPSHOT,
  REGEX.GROUP.SKILLS_SNAPSHOT,
  REGEX.GROUP.EFFECTS_SNAPSHOT,
  REGEX.GROUP.MODIFIERS_SNAPSHOT,
  REGEX.GROUP.SAME_AFTER_BATTLE,
  REGEX.VOTING_BOOTH.GROUPING,
  REGEX.GOD_LOBSTER.GROUPING,
];
// -- individual entry level
// text we will remove from the display text,
//  most likely because we already parsed the data
export const DISPLAY_SCRUB_LIST = [
  REGEX.LINE.LOCATION,
  REGEX.LINE.ENCOUNTER,
  REGEX.LINE.LEVEL_GAIN,
  REGEX.LINE.SUBSTAT_GAINS,
  REGEX.LINE.HP_CHANGE,
  REGEX.LINE.MP_CHANGE,
  REGEX.LINE.MUS_EXP_CHANGE,
  REGEX.LINE.MYST_EXP_CHANGE,
  REGEX.LINE.MOX_EXP_CHANGE,
  REGEX.LINE.COMBAT_FREE_TURN,
  REGEX.LINE.COMBAT_INIT,
  REGEX.LINE.COMBAT_ROUND,
  REGEX.LINE.COMBAT_VICTORY,
  REGEX.LINE.TRANSACTION,
  REGEX.LINE.MEAT_GAIN,
  REGEX.LINE.MEAT_SPENT,
  REGEX.LINE.FAMILIAR_WEIGHT_GAIN,
  REGEX.LINE.ACQUIRED_SOMETHING,
  REGEX.LINE.VISITING,
  // REGEX.LINE.EQUIP,
  // REGEX.LINE.UNEQUIP,
  REGEX.LINE.HAGNK_PULL,
  REGEX.DIABOLIC_PIZZA.INGREDIENTS_LINE,
  REGEX.DIABOLIC_PIZZA.EAT_LINE,
  REGEX.DISTANCE_WOODS_GETAWAY.GAZING_LINE,
  BACK_NEW_LINE_REGEX,
  PRE_LINE_EMPTY_SPACE,
  POST_LINE_EMPTY_SPACE,
];