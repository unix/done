import chalk from 'chalk'

const prefix = chalk.red('cannot release')

export const activeColor = (text: string): string => {
  return chalk.hex('#bdbdbd')(text)
}

export const selectVersion = (version: string): void => {
  const text = chalk.hex('#bdbdbd')(version.toLocaleUpperCase())
  console.log(chalk.gray(`> bumping version ${text}.`))
}

export const notGitRepository = () => {
  console.log(`${prefix}: Directory is not a Git repository.`)
}

export const notFoundGitRemote = () => {
  console.log(`${prefix}: not found Git Remote.`)
  console.log('try run [git remote add <url>] fix it.')
}

export const pushFailure = () => {
  const prefix = chalk.red('⬇')
  const message = chalk.yellow('push failure. you can use "npx done push" after error fix.')
  const text = `${prefix} ${message}`
  console.log('')
  console.log(text)
}

export const error = (text: string) => {
  console.log(`${text}`)
  process.exit(1)
}

export const exit = (next: Function) => {
  next()
  process.exit(1)
}

export const notFoundPackage = () => {
  console.log(`${prefix}: [package.json] not found.`)
}

export const cantParsePackage = () => {
  console.log(`${prefix}: couldn\'t parse [package.json].`)
}

export const cantWritePackage = () => {
  console.log(`${prefix}: couldn\'t write to [package.json].`)
}

export const notFoundVerionInPackage = () => {
  console.log(`${prefix}: no "version" field inside [package.json].`)
}

export const cantParseGitConfig = () => {
  console.log(`${prefix}: couldn\'t parse git config.`)
}

// export const notFoundSettingKey = (key: string) => {
//   const text = chalk.red(key)
//   console.log(chalk.gray(`> not found setting key: ${text}`))
// }

export const storageFileBroken = (filePath: string) => {
  console.log(chalk.gray('> storage file syntax error'))
  console.log(chalk.gray(`> remove file and try agian: ${filePath}`))
}

export const showStorageFilePath = (filePath: string) => {
  const done = chalk.green('done')
  const text = chalk.yellow(filePath)
  console.log(chalk.gray(`> ${done} use JSON file to store configs.`))
  console.log(chalk.gray(`> path: ${text}`))
}
