import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'
import * as print from './print'
import { DEFAULT_SETTINGS, SETTINGS } from '../constants/configs'

const home = path.join(os.homedir(), '.done')
const storage_file = path.join(home, 'storage.json')

const ensureHome = () => {
  try {
    if (!fs.existsSync(home)) {
      fs.mkdirSync(home)
    }
    if (!fs.existsSync(storage_file)) {
      fs.writeFileSync(storage_file, JSON.stringify(DEFAULT_SETTINGS, null, 2))
    }
  } catch (e) {
    const key = `${home}+${process.platform}+permission+denied`
    console.log `directory '${home}' does not have write permission.`
    console.log `https://stackoverflow.com/search?q=${key}`
    process.exit(1)
  }
}

export const getConfigPath = () => storage_file

export const getConfig = (): SETTINGS => {
  ensureHome()
  try {
    return JSON.parse(fs.readFileSync(storage_file, 'utf-8'))
  } catch (e) {
    print.storageFileBroken(storage_file)
    process.exit(1)
  }
}

// export const setConfig = (key: string, value: string): void => {
//   if (DEFAULT_SETTINGS[key] === undefined) return print.notFoundSettingKey(key)
//
//   const last = getConfig()
//   last[key] = value
//   fs.writeFileSync(storage_file, JSON.stringify(last, null, 2))
// }
