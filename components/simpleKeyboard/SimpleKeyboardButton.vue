<template>
    <div :class="getClassName" :style="getStyle">
        {{ name }}
    </div>
</template>

<script>
    export default {
        name: "SimpleKeyboardButton",
        props: {
            name: {type: String, required: true, },
            isFocused: {type: Boolean, required: false, default: false},
            width: {type: String, required: false, default: undefined},
        },
        computed: {
            getClassName() {
                if (this.name === '') {
                    return 'simple-keyboard-empty-button';
                }

                if (this.name === ' ') {
                    return 'simple-keyboard-empty-button-with-big-padding';
                }

                if (this.isFocused) {
                    return 'simple-keyboard-focused-button';
                } else {
                    return 'simple-keyboard-button';
                }
            },
            getStyle() {
                if (this.width !== undefined) {
                    return 'width: ' + this.width;
                } else {
                    return '';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/constants";

    .simple-keyboard-button {
        text-align: center;
        padding: 1em;
        border-style: solid;
        border-color: black;
        border-width: .1em;

        width: $simple-keyboard-button-width;
        height: $simple-keyboard-button-height;
    }

    .simple-keyboard-focused-button {
        @extend .simple-keyboard-button;

        border-width: .15em;
        padding: .95em;
        border-color: red;
    }

    .simple-keyboard-empty-button {
        @extend .simple-keyboard-button;

        border-width: 0em;
    }

    .simple-keyboard-empty-button-with-big-padding {
        @extend .simple-keyboard-empty-button;

        padding: 1.1em;
    }
</style>
