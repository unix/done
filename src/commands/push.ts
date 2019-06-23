import { Command } from 'func'
import * as print from '../utils/print'
import * as actions from '../utils/actions'

@Command({
  name: 'push', alias: 'p',
  description: 'push changes only',
})
export class Push {
  constructor() {
    this.onlyPush()
      .catch(print.catchErr)
  }
  
  async onlyPush(): Promise<void> {
    const origin = actions.getOrigin()
    const branch = actions.getBranch()
    await actions.pushAll(origin, branch as string, true)
  }
}
