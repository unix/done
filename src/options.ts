import chalk from 'chalk'
const pkg = require('../package.json')

export const help = () => {
  console.log(`${chalk.cyan('configs')} \<command\> -- show config file path`)
  console.log(`${chalk.cyan('push')} \<command\> -- only push`)
  console.log(`${chalk.cyan('-v, --version')} \<option\> -- show version`)
  console.log('')
}

export const version = () => {
  console.log(`v${pkg.version}\n`)
}
