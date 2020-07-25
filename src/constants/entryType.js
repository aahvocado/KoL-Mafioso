/**
 * @typedef {String} EntryType
 */
export const ENTRY_TYPE = {
  UNKNOWN: 'ENTRY_TYPE.UNKNOWN',

  IOTM: {
    BASTILLE_BATALLION: 'ENTRY_TYPE.IOTM.BASTILLE_BATALLION',
    BEACH_COMB: 'ENTRY_TYPE.IOTM.BEACH_COMB',
    DIABOLIC_PIZZA: {
      MAKE: 'ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE',
      EAT: 'ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT',
    },
    GARBAGE_TOTE: 'ENTRY_TYPE.IOTM.GARBAGE_TOTE',
    GOD_LOBSTER: {
      COMBAT: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.COMBAT',
      BOON: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.BOON',
      REGALIA: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.REGALIA',
      BLESSING: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.BLESSING',
      EXPERIENCE: 'ENTRY_TYPE.IOTM.GOD_LOBSTER.EXPERIENCE',
    },
    SONGBOOM_BOOMBOX: 'ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX',
    VOTING_BOOTH: 'ENTRY_TYPE.IOTM.VOTING_BOOTH',
  },

  SNAPSHOT: {
    ASCENSION_INFO: 'ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO',
    DAY_INFO: 'ENTRY_TYPE.SNAPSHOT.DAY_INFO',
    SKILL_BREAKDOWN: 'ENTRY_TYPE.SNAPSHOT.SKILL_BREAKDOWN',
  },

  MAFIA: {
    MISC_LOG: 'ENTRY_TYPE.MAFIA.MISC_LOG',
    CLI: 'ENTRY_TYPE.MAFIA.CLI',
  },

  ENCOUNTER_UNKNOWN: 'ENTRY_TYPE.ENCOUNTER_UNKNOWN',
  ENCOUNTER: {
    COMBAT: 'ENTRY_TYPE.ENCOUNTER.COMBAT',
    NONCOMBAT: 'ENTRY_TYPE.ENCOUNTER.NONCOMBAT',
  },

  TALKING: 'ENTRY_TYPE.TALKING',
  VISITING: 'ENTRY_TYPE.VISITING',
  CLAN_VISIT: 'ENTRY_TYPE.CLAN_VISIT',
  TRANSACTION: 'ENTRY_TYPE.TRANSACTION',

  USE_SKILL: {
    COMBAT: 'ENTRY_TYPE.USE_SKILL.COMBAT',
    NONCOMBAT: 'ENTRY_TYPE.USE_SKILL.NONCOMBAT',
    UPKEEP_EFFECT: 'ENTRY_TYPE.USE_SKILL.UPKEEP_EFFECT',
  },

  USE_ITEM: {
    COMBAT: 'ENTRY_TYPE.USE_ITEM.COMBAT',
    NONCOMBAT: 'ENTRY_TYPE.USE_ITEM.NONCOMBAT',
  },

  CONSUMPTION: {
    EAT: 'ENTRY_TYPE.CONSUMPTION.EAT',
    DRINK: 'ENTRY_TYPE.CONSUMPTION.DRINK',
    CHEW: 'ENTRY_TYPE.CONSUMPTION.CHEW',
  },

  ACQUIRE_ITEM: 'ENTRY_TYPE.ACQUIRE_ITEM',
  HAGNK_PULL: 'ENTRY_TYPE.HAGNK_PULL',
  CLOSET_PUT: 'ENTRY_TYPE.CLOSET_PUT',
  CLOSET_TAKE: 'ENTRY_TYPE.CLOSET_TAKE',

  EQUIP: 'ENTRY_TYPE.EQUIP',
  UNEQUIP: 'ENTRY_TYPE.UNEQUIP',

  SPELL_CAST: 'ENTRY_TYPE.SPELL_CAST',

  FAMILIAR: 'ENTRY_TYPE.FAMILIAR',

  PVP: 'ENTRY_TYPE.PVP',
}

export default ENTRY_TYPE;