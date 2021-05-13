const { default: axios } = require("axios")

module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                @import "@/assets/scss/variable.scss";
                @import "@/assets/scss/mixin.scss";
                `
            },
        },
    }
}