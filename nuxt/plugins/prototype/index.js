import registerStore from './registerStore'

export default ({ store }, inject) => {
    inject('registerStore', registerStore)
}
