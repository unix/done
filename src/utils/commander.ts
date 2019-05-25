import { join } from 'path'
import { execSync, exec } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import * as parse from 'parse-git-config'
import * as print from './print'
import * as spinner from './spinner'
import chalk from 'chalk'
import { getConfigPath } from './settings'

export const git = (command: string): string | void => {
  try {
    return execSync(command)
      .toString()
  } catch (err) {
    if (err.message.includes('Not a git repository')) {
      return print.exit(print.notGitRepository)
    }
    print.error(err)
  }
}

export const getOrigin = (config: parse.Config): string => {
  if (config.hasOwnProperty('remote "origin"')) return 'origin'
  const key = Object.keys(config).find(name => /^remote /.test(name))
  if (!key || !key.match) print.exit(print.notFoundGitRemote)
  
  const result = key.match(/"(\w+)"/)
  if (!result || !result[1]) print.exit(print.cantParseGitConfig)
  return result[1]
}

export const checkGitOrigin = (): void => {
  try {
    const config = parse.sync()
    getOrigin(config)
  } catch (e) {
    print.exit(print.notFoundGitRemote)
  }
}

const getBranch = (): string | void => {
  const headPath = join(process.cwd(), '.git/HEAD')
  if (!existsSync(headPath)) return print.exit(print.notGitRepository)
  const content = readFileSync(headPath, 'utf-8')
  const result = content.toString().match(/ref: refs\/heads\/([^\n]+)/)
  if (!result || !result[1]) return null
  return result[1]
}

export const commitAll = (
  version: string,
  userRemote: string,
  message?: string,
  push?: boolean,
) => {
  spinner.start('updated. committing...')
  const config = parse.sync()
  const origin = (!userRemote || userRemote === 'auto') ? getOrigin(config) : userRemote
  const branch = getBranch()
  const tagMessage = message || version
  
  try {
    git(`git add -A && git commit -a -m "${version}"`)
  } catch (err) {
    spinner.fail()
    print.error(err)
  }
  spinner.succeed(true)

  try {
    spinner.start('committed. tagging...')
    git(`git tag -a ${version} -m "${tagMessage}"`)
  } catch (err) {
    spinner.fail()
    print.error(err)
  }
  spinner.succeed(true)
  
  if (!push) {
    spinner.start(`${version} released. not push.`)
    spinner.succeed()
    return process.exit(1)
  }
  
  spinner.start(`${version} released. pushing to "${origin}/${branch}".`)
  const over = () => {
    spinner.succeed(true)
    spinner.start(`${chalk.cyan(version)} released. pushed to "${origin}/${branch}".`)
    spinner.succeed()
  }
  const pushCommand = `git push ${origin} ${branch} && git push -u ${origin} ${branch} --tags`
  const child = exec(pushCommand, err => {
    if (!err) return
    let msg = `${err.message}`
    if (err.cmd && msg.includes(err.cmd)) {
      msg = msg.split(err.cmd)[1]
    }
    console.log('')
    print.error(msg)
  })
  child.once('close', over)
}

export const showConfigPath = () => {
  const configPath = getConfigPath()
  print.showStorageFilePath(configPath)
}
