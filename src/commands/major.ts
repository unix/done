import { CommandMajor } from 'func'
import { actions, changes, events, print} from '../utils'

@CommandMajor()
export class Major {
  constructor() {
    this.init()
      .catch(print.catchErr)
  }
  
  async init(): Promise<void> {
    const type = await changes.getType()
    actions.checkGitOrigin()
  
    const nextVersion = events.updatePackage(type, null) as string
    const tagMessage = await events.updateHooks(nextVersion, type)
    await actions.commitAll(nextVersion, tagMessage, true)
  }
}
