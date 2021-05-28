import { onGlobalSetup, globalPlugin, ref, provide, computed, onBeforeUnmount } from '@nuxtjs/composition-api'
import viewport from '@/plugins/functions/viewport'

export default function (context, inject) {
    globalPlugin(context, inject)

    onGlobalSetup((props, context) => {
        const vp = ref(viewport)

        const viewportInfo = computed(() => vp.value.info)

        onBeforeUnmount(() => {
            vp.value.destroy()
        })

        provide('viewportInfo', viewportInfo)
    })
}
