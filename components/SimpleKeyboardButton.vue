<template>
    <div :class="getClassName">
        {{ name }}
    </div>
</template>

<script>
    export default {
        name: "SimpleKeyboardButton",
        props: {
            name: {type: String, required: true, },
            isFocused: {type: Boolean, required: false, default: false},
        },
        computed: {
            getClassName() {
                if (this.isFocused) {
                    return 'simple-keyboard-focused-button';
                } else {
                    return 'simple-keyboard-button';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .simple-keyboard-button {
        text-align: center;
        padding: 1em;
        border-style: solid;
        border-color: black;
        border-width: 1px;

        width: 4em;
        height: 1.5em;
    }

    .simple-keyboard-focused-button {
        @extend .simple-keyboard-button;

        border-width: 2px;
        border-color: red;
    }
</style>
