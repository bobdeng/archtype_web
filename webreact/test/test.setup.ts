import '@testing-library/jest-dom'
import {vi} from 'vitest'

const filteredWarnMessages: string[] = [
    'React.createFactory()',
    'async-validator:',
    'componentWillReceiveProps has been renamed',
    'value provided is not in a recognized RFC2822 or ISO format',
]

const filteredWarnVariables: string[] = []
const privateWarnLog = console.warn
vi.spyOn(console, 'warn').mockImplementation((msg: string, ...args: unknown[]) => {
    filteredWarnMessages.some(message => msg.includes(message)) ||
    filteredWarnVariables.some(variable => variable === args[0])
        ? vi.fn()
        : privateWarnLog(msg, ...args)
})

const filteredErrorMessages: string[] = [
    'when doing server-side rendering',
    'If you want to write it to the DOM, pass a string instead',
    'antd-mobile: Global',
]
const filteredErrorVariables: string[] = ['warnKey']
const privateErrorLog = console.error
vi.spyOn(console, 'error').mockImplementation((msg: string, ...args: unknown[]) => {
    filteredErrorMessages.some(message => msg.includes(message)) ||
    filteredErrorVariables.some(variable => variable === args[0])
        ? vi.fn()
        : privateErrorLog(msg, ...args)
})
