export const state = () => ({
    loading: {
        minTime: 1000,
        stack: 1
    }
})

export const getters = {
    isLoading (state) {
        return state.loading.stack > 0
    }
}

export const mutations = {
    SET_LOADING (state, num) {
        state.loading.stack += num
    }
}

export const actions = {
    async nuxtServerInit () {

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
    START_LOADING ({ state, commit }, callback) {
        return new Promise((resolve) => {
            const startTime = Date.now()
            commit('SET_LOADING', 1)
            callback.call(this, (num = -1) => {
                const minTime = state.loading.minTime
                const remainderTime = Date.now() - startTime
                setTimeout(() => {
                    commit('SET_LOADING', num)
                    resolve(true)
                }, Math.max(minTime - remainderTime, 0))
            })
        })
    }
}
