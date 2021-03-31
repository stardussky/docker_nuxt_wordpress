export const state = () => ({
    loading: {
        minTime: 1000,
        timeStamp: 0,
        stack: 0
    }
})

export const getters = {
    isLoading (state) {
        return state.loading.stack > 0
    }
}

export const mutations = {
    SET_LOADING (state, num = 1) {
        const { stack } = state.loading
        if (num > 0 && stack === 0) {
            state.loading.timeStamp = Date.now()
        }
        state.loading.stack = Math.max(state.loading.stack + num, 0)
    }
}

export const actions = {
    async nuxtServerInit ({ dispatch }) {
        await Promise.all([])
    },
    AJAX (context, options) {
        return new Promise((resolve, reject) => {
            this.$axios({
                ...options
            }).then(({ data, ...res }) => {
                resolve(data)
            }).catch((e) => {
                reject(e)
            })
        })
    },
    DONE_LOADING ({ state, commit }) {
        const { minTime, timeStamp } = state.loading
        window.setTimeout(() => {
            commit('SET_LOADING', -1)
        }, Math.max(minTime - (Date.now() - timeStamp), 0))
    }
}
