import { CHANGE_TYPES } from '../constants/configs'
import { inc, prerelease, ReleaseType } from 'semver'


export const typeToReleaseType = (type: string): ReleaseType => {
  if (type === CHANGE_TYPES.pre) return 'prerelease'
  return type as ReleaseType
}

export const makeVersion = (type: string, suffix: string | null, lastVersion: string): string => {
  const isPreType = type === CHANGE_TYPES.pre
  const hasPreVersion = prerelease(lastVersion)
  const releaseType = typeToReleaseType(type)

  const nextSuffix = suffix || (!hasPreVersion && isPreType ? 'canary' : null)
  const nextVersion = isPreType && nextSuffix ? inc(lastVersion, releaseType, true, nextSuffix)
    : inc(lastVersion, releaseType)
  
  return nextVersion
}
