export default ({ store, moduleName, module }) => {
    const moduleIsRegistered = store._modules.root._children[moduleName] !== undefined
    const stateExists = store.state[moduleName]

    if (!moduleIsRegistered) {
        store.registerModule(moduleName, module, { preserveState: stateExists })
    }
}
