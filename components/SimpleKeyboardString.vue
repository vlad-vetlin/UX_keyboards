<template>
    <div class="simple-keyboard-string">
        <simple-keyboard-button v-for="(name, index) in names"
                                :name="name"
                                :is-focused="isFocused(index)"
                                :key="name"/>
    </div>
</template>

<script>
    import SimpleKeyboardButton from "./SimpleKeyboardButton";

    export default {
        name: "SimpleKeyboardString",
        props: {
            names: {type: Array, required: true},
        },
        data() {
            return {
                focused: -1,
            }
        },
        methods: {
            isFocused(index) {
                return this.focused === index;
            },
            setFocused(value) {
                this.focused = value;
            },
            moveRight() {
                if (this.focused + 1 < this.names.length) {
                    ++this.focused;
                }
            },
            moveLeft() {
                if (this.focused > 0) {
                    --this.focused;
                }
            },
            getFocused() {
                return this.focused;
            }
        },
        components: {SimpleKeyboardButton},
    }
</script>

<style lang="scss" scoped>
    .simple-keyboard-string {
        display: flex;

        justify-content: center;
    }
</style>
