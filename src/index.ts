import arg from 'arg'
import * as options from './options'
import * as changes from './inputs/changes'
import * as commander from './utils/commander'
import * as events from './utils/events'
import { getConfig } from './utils/settings'

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '-h': '--help',
  '-v': '--version',
})
const param = args._[0]

;(async() => {
  const configs = getConfig()
  
  // options
  if (args['--help']) return options.help()
  if (args['--version']) return options.version()
  if (param === 'configs') return commander.showConfigPath()
  
  const type = await changes.getType()
  commander.checkGitOrigin()

  const nextVersion = events.updatePackage(type, null) as string
  const tagMessage = await events.updateHooks(nextVersion, type)
  commander.commitAll(nextVersion, configs.remote, tagMessage, configs.autoPush)
})()
