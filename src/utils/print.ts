import chalk from 'chalk'

const abort = chalk.red('> Abort.')
const pkg = `[${chalk.cyan('package.json')}]`

export const activeColor = (text: string): string => {
  return chalk.hex('#bdbdbd')(text)
}

export const dangerColor = (text: string): string => {
  return chalk.redBright(text)
}

export const selectVersion = (version: string): void => {
  const text = chalk.hex('#bdbdbd')(version.toLocaleUpperCase())
  console.log(chalk.gray(`> Bumping version ${text}.`))
}

export const notGitRepository = () => {
  console.log(`${abort} Directory is not a Git repository.`)
}

export const notFoundGitRemote = () => {
  console.log(`${abort} Not found git remote.`)
  const recommand = chalk.cyan('git remote add <url>')
  console.log(`  Try run [${recommand}] fix it.`)
}

export const pushFailure = () => {
  const prefix = chalk.red('⬇')
  const recommand = chalk.cyan('npx done push')
  const message = chalk.yellow(`Push failure. You can use "${recommand}" after error fix.`)
  const text = `${prefix} ${message}`
  console.log('')
  console.log(text)
}

export const error = (text: string) => {
  console.log(`${text}`)
  process.exit(1)
}

export const catchErr = (err: Error): void => {
  const msg = err.message || `${err}`
  console.log(dangerColor(`> ${msg}`))
  process.exit(1)
}

export const exit = (next: Function) => {
  next()
  process.exit(1)
}

export const notFoundPackage = () => {
  console.log(`${abort} ${pkg} not found.`)
}

export const cantParsePackage = () => {
  console.log(`${abort} couldn\'t parse ${pkg}.`)
}

export const cantWritePackage = () => {
  console.log(`${abort} couldn\'t write to ${pkg}.`)
}

export const notFoundVerionInPackage = () => {
  console.log(`${abort} Missing "version" field inside ${pkg}.`)
}

export const cantParseGitConfig = () => {
  console.log(`${abort} couldn\'t parse git config.`)
}
