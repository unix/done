export enum CHANGE_TYPES {
  major = 'major',
  minor = 'minor',
  patch = 'patch',
  pre = 'pre',
  fix = 'patch',
}

export interface ChangeInfo {
  name: string,
  prompt: string,
}

export const CHANGE_INFOS: { [key: string]: ChangeInfo } = {
  [CHANGE_TYPES.major]: {
    name: 'Major Change',
    prompt: 'major --  incompatible API changes',
  },
  [CHANGE_TYPES.minor]: {
    name: 'Minor Change',
    prompt: 'minor --  backwards-compatible functionality',
  },
  [CHANGE_TYPES.patch]: {
    name: 'Patch',
    prompt: 'patch --  backwards-compatible bug fix',
  },
  [CHANGE_TYPES.pre]: {
    name: 'Pre Release',
    prompt: 'pre   --  pre release version',
  },
}

export interface SETTINGS {
  autoPush: boolean,
  remote: string,
}

export const DEFAULT_SETTINGS: SETTINGS = {
  autoPush: true,
  remote: 'auto',
}

export const STORE_NAME = 'done'
