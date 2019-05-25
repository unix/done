import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import * as print from './print'
import * as updater from './updater'
import * as spinner from './spinner'
import { CHANGE_INFOS, ChangeInfo } from '../constants/configs'


export const updatePackage = (type: string, suffix: string | null): string | void => {
  spinner.start(`release: ${type}, updating "package.json"...`)
  const pkgPath = join(process.cwd(), 'package.json')
  if (!existsSync(pkgPath)) return print.exit(print.notFoundPackage)
  
  let content: {
    version?: string,
  }
  try {
    content = JSON.parse(readFileSync(pkgPath, 'utf-8'))
  } catch (err) {
    spinner.fail()
    return print.exit(print.cantParsePackage)
  }
  
  if (!content.version) return print.exit(print.notFoundVerionInPackage)
  const nextVersion = updater.makeVersion(type, suffix, content.version)
  
  try {
    content.version = nextVersion
    writeFileSync(pkgPath, JSON.stringify(content, null, 2))
  } catch (err) {
    spinner.fail()
    return print.exit(print.cantWritePackage)
  }
  spinner.succeed(true)
  return nextVersion
}

export interface HookMetas {
  infos: ChangeInfo,
  type: string,
  version: string,
}

export const updateHooks = async(version: string, type: string): Promise<string> => {
  const hookPath = join(process.cwd(), 'release.js')
  if (!existsSync(hookPath)) return ''
  spinner.start(`running custom hook...`)
  
  const params: HookMetas = {
    infos: CHANGE_INFOS[type],
    type, version,
  }
  
  let result = ''
  try {
    result = await require(`${hookPath}`)(params)
  } catch (err) {
    result = ''
    spinner.fail(err)
  }
  spinner.succeed(true)
  return result
}

