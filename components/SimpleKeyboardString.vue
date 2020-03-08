<template>
    <div class="simple-keyboard-string">
        <simple-keyboard-button v-for="(name, index) in names"
                                :name="name"
                                :is-focused="isFocused(index)"
                                :key="index"/>
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
                start: -1,
                finish: -1,
            }
        },
        methods: {
            isFocused(index) {
                return this.focused === index;
            },
            setFocused(value) {
                if (value === -1) {
                    this.focused = -1;
                    return;
                }

                if (value < this.start) {
                    value = this.start;
                }

                if (value > this.finish) {
                    value = this.finish;
                }

                this.focused = value;
            },
            moveRight() {
                if (this.focused < this.finish) {
                    ++this.focused;
                }
            },
            moveLeft() {
                if (this.focused > this.start) {
                    --this.focused;
                }
            },
            getFocused() {
                return this.focused;
            }
        },
        mounted() {
            let index = 0;

            for (name of this.names) {
                if (name !== '' && this.start === -1) {
                    this.start = index;
                }

                if (name !== '') {
                    this.finish = index;
                }

                ++index;
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
