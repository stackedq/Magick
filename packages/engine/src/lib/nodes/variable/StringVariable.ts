/* eslint-disable @typescript-eslint/no-unused-vars */
import Rete from 'rete'

import { NodeData, MagickNode } from '../../types'
import { InputControl } from '../../dataControls/InputControl'
import { stringSocket } from '../../sockets'
import { MagickComponent } from '../../magick-component'
import { BooleanControl } from '../../dataControls/BooleanControl'

const info = `String Variable`

type InputReturn = {
  output: string
}

export class StringVariable extends MagickComponent<InputReturn> {
  constructor() {
    super('String Variable')

    this.task = {
      outputs: {
        output: 'output',
      },
    }

    this.category = 'Variable'
    this.info = info
    this.display = true
  }

  builder(node: MagickNode) {
    const out = new Rete.Output('output', 'output', stringSocket)
    const _var = new InputControl({
      dataKey: '_var',
      name: 'Value',
      icon: 'moon',
    })
    const nameControl = new InputControl({
      dataKey: 'name',
      name: 'Name',
      icon: 'moon',
    })

    const _public = new BooleanControl({
      dataKey: 'Public',
      name: 'Public',
    })

    node.inspector.add(nameControl).add(_var).add(_public)

    return node.addOutput(out)
  }

  worker(node: NodeData) {
    const _var = node?.data?._var as string

    this.name =
      (node?.data?.name as string) + '_' + Math.floor(Math.random() * 1000)

    return {
      output: _var,
    }
  }
}
