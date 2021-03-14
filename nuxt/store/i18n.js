import Vue from 'vue'

export const state = () => ({
    messages: {}
})

export const mutations = {
    SET_MESSAGE (state, { locale, key, payload }) {
        if (!state.messages[locale]) {
            Vue.set(state.messages, locale, {})
        }
        state.messages[locale][key] = payload
    }
}
