import { default as cn } from './cn'
import { default as en } from './en'

export default (local) => {
    if (local === 'cn') {
        return cn
    } else if (local === 'en') {
        return en
    } else {
        return cn
    }
}