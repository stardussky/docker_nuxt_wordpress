import ImagesLoaded from 'imagesloaded'

export default () => {
    const loadImage = () => {
        return new Promise((resolve) => {
            new ImagesLoaded('#__nuxt', { background: '[data-background]' }, (instance) => {
                resolve()
            })
        })
    }
    return {
        loadImage,
    }
}
