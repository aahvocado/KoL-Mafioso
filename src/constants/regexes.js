export const NEW_LINE_REGEX = /(\r\n|\n)/g;
export const PRE_LINE_EMPTY_SPACE = /^\s*/g;
export const POST_LINE_EMPTY_SPACE = /(\r\n|\n)*(?!.)/gs;
export const EMPTY_LINES_REGEX = /(\r\n|\n){2,}/g;
export const BACK_NEW_LINE_REGEX = /(?<!.\s)^(\r\n|\n)/gm;
export const REGEX = {
  // -- important
  ASCENSION: {
    REGULAR_COMPLETE: /welcome to valhalla.*?freeing king ralph.*?(\r\n|\n)/is,
    THWAITGOLD_COMPLETE: /welcome to valhalla.*?You acquire an item: Thwaitgold.*?(\r\n|\n)/is,

    // VALHALLA: /welcome to valhalla/is,
    // KING_FREED: /freeing king ralph.*?(?=(\s|))/is,
    // THWAITGOLD: /You acquire an item: Thwaitgold.*/is,
    // ASCEND_PHP: /ascend.php.*/is,
  },
  // -- iotm
  BASTILLE_BATALLION: {
    TEXT: /Bastille Battalion/im,
  },
  BEACH_COMB: {
    COMBING_LINE: /.*Combing.*/i,
    COMBING_ACTION: /Combing.*/i,
  },
  BOXING_DAYCARE: {
    // GROUPING: /visiting the boxing daycare.*?(enter the boxing daycare|Boxing Daydream|Boxing Day Spa)/gis,
    VISIT: /visiting the boxing daycare.*/gi,
    NONCOMBAT: /^encounter:.*(enter the boxing daycare|Boxing Daydream|Boxing Day Spa).*/gim,
  },
  DECK_OF_EVERY_CARD: {
    TEXT: /Deck of Every Card/im,
  },
  DIABOLIC_PIZZA: {
    INGREDIENTS_LINE: /^pizza.*/m,
    INGREDIENTS_ONLY: /(?<=^pizza\s).*/m,
    EAT_LINE: /^eat\s\d+\sdiabolic pizza/m,
  },
  DISTANCE_WOODS_GETAWAY: {
    GAZING_LINE: /(^gazing).*/gi,
    EMPTY_GAZING_LINE: /(^gazing at the stars)(?!(\r\n|\n).)/gmi,
  },
  GOD_LOBSTER: {
    COMBAT: /Encounter: the god lobster/i,
    BOON: /Encounter: Granted a Boon/i,
    GROUPING: /the God Lobster.*?Granted a Boon/gis,
  },
  IUNION_CROWN: {
    GAINED_EFFECT: /(?<=^The crown gains ).*/gmi,
    STONES_TEXT: /(?<=^After battle: ).*iunion stones.*(\r\n|\n)the crown.*/gmi,
  },
  JANUARYS_GARBAGE_TOTE: {
    USE_FOLDABLE: /^use \d January's garbage tote/mi,
    USE_RESULT: /(?<=use \d January's garbage tote).*?acquire.*?:.*?(deceased crimbo tree|broken champagne bottle|tinsel tights|wad of used tape|makeshift garbage shirt)/gis,
    EQUIP_RESULT: /(?<=equip \w+ ).*?(deceased crimbo tree|broken champagne bottle|tinsel tights|wad of used tape|makeshift garbage shirt)/gi,
  },
  PIRATEREALM: {
    // ENTRY_GROUPING: /^\[.*?piraterealm.*?(\r\n|\n){2,}/gmis,
    LOCATION: /(?<=^\[.*\] ).*piraterealm.*/gmi,
  },
  SONGBOOM_BOOMBOX: {
    GROUPING: /^use.*?songboom.*?setting soundtrack.*/gmis,
    RESULT: /(?<=^use.*?songboom.*?setting soundtrack to ).*/gmis,
    SING_ALONG: /(?<=^round\s\d:.*)(SING ALONG)/gmi,
  },
  VOTING_BOOTH: {
    GROUPING: /visiting the voting booth.*?daily loathing ballot/gis,
  },

  // -- common
  FILE: {
    MAFIA_SESSION_DATE: /(?<=_)\d*/,
  },
  LINE: {
    LOCATION: /\[\d*\].*/g,
    ENCOUNTER: /Encounter:.*/g,
    USELESS_VISIT: /^visit.*(\r\n|\n){2,}/gim,
    ACQUIRED_SOMETHING: /.*acquire.*/gi, // this affects items and effects

    COMBAT_FREE_TURN: /.*combat.*did not cost.*/i,
    COMBAT_INIT: /Round.*(loses initiative|wins initiative).*/i,
    COMBAT_WIN_INIT: /Round.*(wins initiative).*/i,
    COMBAT_LOSE_INIT: /Round.*(loses initiative).*/i,
    COMBAT_ACTION_ROUND: /^(?!.*(executes a macro|\slose\s|\sgain\s|initiative|\swins\s))round.*!/gmi,
    COMBAT_ROUND: /^round\s\d:.*/gmi,
    COMBAT_VICTORY: /(?<=\s).*wins the fight.*/i,
    COMBAT_SKILL_USE_THE_FORCE: /.*(USE THE FORCE).*/i,

    AFTER_BATTLE_RESULT: /(?<=^After battle: ).*/gmi,

    MEAT_GAIN: /.*gain.*meat.*/gi,
    MEAT_SPENT: /.*spent.*meat.*/gi,
    AUTOSELL: /^autosell:.*/gmi,
    TRANSACTION: /.*buy.*for.*from.*/gmi,

    HP_CHANGE: /.*(gain|lose).*\d*hit point.*/gi,
    MP_CHANGE: /.*(gain|lose).*\d*(muscularity|mana|mojo) point.*/gi,

    LEVEL_GAIN: /^You gain .* level.*\s+/gmi,
    SUBSTAT_GAINS: /.*gain.*\d*(muscle|mysticality|moxie).*point.*/gi,

    MUS_EXP_CHANGE: /.*gain.*\d*(Beefiness|Fortitude|Muscleboundness|Strengthliness|Strongness).*/gi,
    MUS_GAINS: /.*you gain.*\d*muscle.*point.*/gi,
    MYST_EXP_CHANGE: /.*gain.*\d*(Enchantedness|Magicalness|Mysteriousness|Wizardliness).*/gi,
    MYST_GAINS: /.*you gain.*\d*mysticality.*point.*/gi,
    MOX_EXP_CHANGE: /.*gain.*\d*(Cheek|Chutzpah|Roguishness|Sarcasm|Smarm).*/gi,    
    MOX_GAINS: /.*you gain.*\d*moxie.*point.*/gi,

    MCD_CHANGE: /^mcd.*/gim,
    TELESCOPE: /^telescope.*/gim,
    EQUIP: /^equip.*/gim,
    UNEQUIP: /^unequip.*/gim,
    HAGNK_PULL: /^pull: .*/gim,

    FAMILIAR: /^familiar.*/gim,
    FAMILIAR_WEIGHT_GAIN: /.*(gains a pound).*/gi,

    TALKING: /^talking to.*/gim,
    VISITING: /^visiting.*/gim,
    CLAN_VISIT: /^visiting.*in.*clan.*/gim,
    SWIMMING_POOL: /.*swimming pool.*/gim,
  },

  VALUE: {
    ASCENSION_NUMBER: /(?<=Ascension #)\d+/,

    COMBAT_ROUND: /(?<=Round\s)\d+(?=:)/gmi,
    COMBAT_ATTACKS: /(?<=^Round.*\s)attacks(?=!)/gi,
    COMBAT_SKILL_NAMES: /(?<=^Round.*casts\s).*(?=!)/gmi,

    TURN_NUM: /(?!\[)\d*(?=\])/, // look for `[1]`, ignore url hashes with `[]blah[]`
    LOCATION_NAME: /(?<=\]\s).*/,
    SHOP_LOCATION_NAME: /(?<=each from\s).*/,
    ENCOUNTER_NAME: /(?<=Encounter:\s).*/,
    NONCOMBAT_NAME: /(?<=\[\d+\]\s)(.*)(?!Encounter:)/,
    VISIT_LOCATION_NAME: /(?<=^visiting ).*(?=( in))*/im,
    VISIT_ENCOUNTER_NAME: /(?<=^visiting( the| )).*?(?=( in|(\r\n|\n)))/im,

    SPELL_CAST_AMOUNTS: /(?<=^cast )\d+/gm,
    SPELL_CAST_NAMES: /(?<=^cast \d+ ).*/gm,

    HP_GAINS: /(?<=gain\s)\d+(?=\shit point)/gi,
    HP_LOSSES: /(?<=lose\s)\d+(?=\shit point)/gi,
    MP_GAINS: /(?<=gain\s)\d+(?=\s(muscularity|mana|mojo) point)/gi,
    MP_LOSSES: /(?<=lose\s)\d+(?=\s(muscularity|mana|mojo) point)/gi,

    MUS_EXP_GAINS: /(?<=gain\s)\d+(?=\s(Beefiness|Fortitude|Muscleboundness|Strengthliness|Strongness))/gi,
    MUS_EXP_LOSSES: /(?<=lose\s)\d+(?=\s(Beefiness|Fortitude|Muscleboundness|Strengthliness|Strongness))/gi,

    MYST_EXP_GAINS: /(?<=gain\s)\d+(?=\s(Enchantedness|Magicalness|Mysteriousness|Wizardliness))/gi,
    MYST_EXP_LOSSES: /(?<=lose\s)\d+(?=\s(Enchantedness|Magicalness|Mysteriousness|Wizardliness))/gi,

    MOX_EXP_GAINS: /(?<=gain\s)\d+(?=\s(Cheek|Chutzpah|Roguishness|Sarcasm|Smarm))/gi,
    MOX_EXP_LOSSES: /(?<=lose\s)\d+(?=\s(Cheek|Chutzpah|Roguishness|Sarcasm|Smarm))/gi,
  },
  // -- items
  ITEMS: {
    MEAT_GAIN_AMOUNT: /(?<=You gain )(\d*,*)*(?=\s+meat)/gi,
    MEAT_LOSS_AMOUNT: /(?<=You lose )(\d*,*)*(?=\s+meat)/gi,
    BUY_ITEM_AMOUNT: /(?<=buy\s)\d+/gi,
    BUY_ITEM_COST: /(?<=for\s)\d+(?=\seach)/gi,
    SELL_ITEM_AMOUNT: /(?<=^autosell: )\d+/gmi,
    SELL_ITEM_TARGET: /(?<=^autosell: \d+ ).*/gmi,

    ACQUIRED_ITEM_LINE: /(?!.*effect:.*)You acquire (\d+|an item:) .*/gmi,
    ACQUIRED_ITEM_NAME: /(?!.*effect:.*)(?<=You acquire (\d+|an item:) ).*?(?=( \(|$))/mi,
    ACQUIRED_N_ITEM: /(?!.*effect:.*)(?<=(You acquire ))\d+(?= \w*)/mi,
    ACQUIRED_ITEM_N: /(?!.*effect:.*)(?<=(You acquire.*\())\d+(?=\))/mi,

    CONSUMPTION_AMOUNT: /(?<=^(eat|drink|chew)\s)\d+(?=\s)/gi,
    CONSUMPTION_TARGET: /(?<=^(eat|drink|chew)\s\d+\s).*/gi,
    EAT_AMOUNT: /(?<=^eat\s)\d+(?=\s)/gi,
    EAT_TARGET: /(?<=^eat\s\d+\s).*/gi,
    DRINK_AMOUNT: /(?<=^drink\s)\d+(?=\s)/gi,
    DRINK_TARGET: /(?<=^drink\s\d+\s).*/gi,
    CHEW_AMOUNT: /(?<=^chew\s)\d+(?=\s)/gi,
    CHEW_TARGET: /(?<=^chew\s\d+\s).*/gi,

    EQUIP_TARGETS: /(?<=equip .*?\s).*/g,
    UNEQUIP_TARGETS: /(?<=unequip .*?\s).*/g,

    HAGNK_PULL_LINE: /^pull: \d* .*/gmi,
    HAGNK_PULL_NAME: /(?<=^pull: \d* ).*/gmi,
    HAGNK_PULL_AMOUNTS: /(?<=^pull: )\d*/gmi,

    CLOSET_PUT_TARGETS: /(?<=^add to closet: ).*/gi,
    CLOSET_TAKE_TARGETS: /(?<=^take from closet: ).*/gi,
  },
  // -- effects
  EFFECTS: {
    ACQUIRED_EFFECT_LINE: /.*acquire an effect:.*/gmi,
    EFFECT_NAME: /(?<=acquire an effect: ).*?(?=( \(|$))/mi,
    EFFECT_DURATION: /(?<=acquire an effect: .*\()\d+(?=\))/mi,

    UNAFFECT_LINE: /^uneffect.*/gim,

    CAST_LINE: /^cast .*/gim,
    CAST_NAME: /(?<=^cast \d ).*/mi,
    CAST_AMOUNT: /(?<=^cast )\d+(?=.*)/mi,
  },
  // -- 
  // note: these only work in raw
  GROUP: {
    ASCENSION_SNAPSHOT: /^(Ascension)/m,
    MOON_SNAPSHOT: /(> moon).*?(?=\s\s> status)/gmis,
    STATUS_SNAPSHOT: /(> status).*?(?=\s\s> equipment)/gmis,
    EQUIPMENT_SNAPSHOT: /(> equipment).*?(?=\s\s> skills)/gmis,
    SKILLS_SNAPSHOT: /(> skills).*?(?=\s\s> effects)/gmis,
    EFFECTS_SNAPSHOT: /(> effects).*?(?=\s\s> modifiers)/gmis,
    MODIFIERS_SNAPSHOT: /(> modifiers).*?(?=(\r\n|\n){3,})/gmis,

    SAME_AFTER_BATTLE: /(^After battle:).*(\r\n|\n).*(\r\n|\n){2,}\w(?!\[)/gmi,
    PVP_ATTACK: /(^attack).*?pvp fight/gmis,
  },
  // -- kolmafia snapshot
  SNAPSHOT_CHECK: {
    CHARACTER_NAME: /(?<=^name: ).*/mi,
    CONTAIN_MOON: /(> moon)/i,
    CONTAIN_STATUS: /(> status)/i,
    CONTAIN_EQUIPMENT: /(> equipment)/i,
    CONTAIN_SKILLS: /(> skills)/i,
    CONTAIN_EFFECTS: /(> effects)/i,
    CONTAIN_MODIFIERS: /(> modifiers)/i,
  },
  // -- misc
  MISC: {
    LOG_BORDER: /(=-)+=+(\r\n|\n)/g,
    STACK_TRACE: /^(stack trace).*?at.*\).*?(?=(\s|))/gmis,
    CLI_PRINT: /^>.*(\r\n|\n)/gmi,
    SEND_A_KMAIL: /send a kmail.*(\r\n|\n)/gi,
    COMBAT_MACRO: /.*executes a macro.*(\r\n|\n)/gi,
    MAFIA_MAXIMIZER: /^(Maximizer:|maximize ).*(\r\n|\n)/gmi,
    MAFIA_CHOICE_URL: /.*.php.*(\r\n|\n)/g,
    EMPTY_CHECKPOINT: /Created an empty checkpoint.*(\r\n|\n)/gi,
  },
};

export default REGEX;