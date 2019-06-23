import * as print from './print'
import prompts from 'prompts-witt'
import ansiEscapes from 'ansi-escapes'
import { CHANGE_INFOS } from './configs'

const choices = Object.keys(CHANGE_INFOS)
  .reverse()
  .map(key => ({
    title: CHANGE_INFOS[key].prompt,
    value: key,
  }))

export const getType = async (): Promise<string> => {
  const answer = await prompts({
    type: 'select',
    name: 'type',
    message: 'pick semantic versions',
    choices,
    hint: 'J & K to select. Return to submit',
  })
  if (!answer.type) {
    return process.exit(1)
  }
  
  process.stderr.write(ansiEscapes.eraseLines(2))
  print.selectVersion(answer.type)
  
  return answer.type
}
