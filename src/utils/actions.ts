import * as print from './print'
import * as spinner from './spinner'
import * as parse from 'parse-git-config'
import { join } from 'path'
import { existsSync, readFileSync } from 'fs'
import { exec } from 'child_process'

export const gitc = (command: string): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    let errLogs = ''
    const child = exec(command)
    child.stderr.on('data', data => (errLogs += data))
    child.on('error', reject)
    child.once('close', (code, signal) => {
      if (code === 0) return resolve()
      reject(new Error(`Exited with ${code || signal}, ${errLogs}`))
    })
  })
}

export const getBranch = (): string | void => {
  const headPath = join(process.cwd(), '.git/HEAD')
  if (!existsSync(headPath)) return print.exit(print.notGitRepository)
  
  const content = readFileSync(headPath, 'utf-8')
  const result = content.toString()
    .match(/ref: refs\/heads\/([^\n]+)/)
  if (!result || !result[1]) return null
  return result[1]
}

export const getOrigin = (config?: parse.Config): string => {
  if (!config) {
    config = parse.sync()
  }
  
  if (config.hasOwnProperty('remote "origin"')) return 'origin'
  
  const key = Object.keys(config)
    .find(name => /^remote /.test(name))
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


export const commitAll = async (
  version: string,
  message?: string,
  push?: boolean,
) => {
  spinner.start('Updated. committing...')
  const config = parse.sync()
  const origin = getOrigin(config)
  const branch = getBranch()
  const tagMessage = message || version
  
  try {
    await gitc(`git add -A && git commit -a -m "${version}"`)
  } catch (err) {
    spinner.fail()
    print.error(err)
  }
  spinner.succeed(true)
  spinner.start(`Updated. ${print.activeColor(version)} released.`)
  spinner.succeed()
  
  try {
    spinner.start('tagging...')
    await gitc(`git tag -a ${version} -m "${tagMessage}"`)
  } catch (err) {
    spinner.fail()
    print.error(err)
  }
  spinner.succeed(true)
  
  if (!push) {
    spinner.start(`${version} ready. not push.`)
    spinner.succeed()
    return process.exit(1)
  }
  
  await pushAll(origin, branch as string, false)
}

export const pushAll = async(
  origin: string,
  branch: string,
  onlyPush: boolean = false,
) => {
  const prefix = onlyPush ? 'Only push,' : 'Tag ready,'
  spinner.start(`${prefix} pushing to "${origin}/${branch}".`)
  try {
    await gitc(`git push ${origin} ${branch} && git push -u ${origin} ${branch} --tags`)
    spinner.succeed(true)
    spinner.start(`Pushed to "${origin}/${branch}". Everything is done.`)
    spinner.succeed()
  } catch (err) {
    print.pushFailure()
    print.error(err)
  }
}

