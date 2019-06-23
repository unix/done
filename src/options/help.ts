import { Option, RegisterProvider } from 'func'
const pkg = require('../../package.json')

@Option({
  name: 'help',
  alias: 'h',
  description: 'help',
})
export class Help {
  
  constructor(
    regs: RegisterProvider,
  ) {
    const done = pkg.name
    console.log(done.toUpperCase())
    console.log('')
  
    console.log(`  ${done} -- create release and push everything`)
  
    regs.commands.forEach(data => {
      console.log(`  ${done}  ${data.name} \<command\>${this.showDesc(data.description)}`)
    })
  
    console.log('')
  
    regs.options.forEach(data => {
      const alias = data.alias ? ` -${data.alias}` : ''
      console.log(`  ${done}  --${data.name}${alias} \<option\>${this.showDesc(data.description)}`)
    })
  
    console.log('')
  }
  
  private showDesc(desc: string): string {
    return desc ? ` --  ${desc}` : ''
  }
  
}
