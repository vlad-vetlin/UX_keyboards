<template>
    <div class="simple-keyboard-string">
        <simple-keyboard-button v-for="(name, index) in names"
                                :name="name"
                                :is-focused="isFocused(index)"
                                :class="getClass(index)"
                                :key="index"/>
    </div>
</template>

<script>
    import SimpleKeyboardButton from "./SimpleKeyboardButton";

    export default {
        name: "SimpleKeyboardString",
        props: {
            names: {type: Array, required: true},
            isOneButton: {type: Boolean, required: false, default: false},
        },
        data() {
            return {
                focused: -1,
                start: -1,
                finish: -1,
            }
        },
        methods: {
            getClass(index) {
                if (!this.isOneButton) {
                    return '';
                }

                if (index === this.start) {
                    if (this.isFocused(index)) {
                        return 'simple-keyboard-string-left-active-element';
                    }

                    return 'simple-keyboard-string-left-element';
                } else if (index === this.finish) {
                    if (this.isFocused(index)) {
                        return 'simple-keyboard-string-right-active-element';
                    }

                    return 'simple-keyboard-string-right-element';
                } else if (index > this.start && index < this.finish) {
                    if (this.isFocused(index)) {
                        return 'simple-keyboard-string-active-element';
                    }

                    return 'simple-keyboard-string-element';
                }
            },
            isFocused(index) {
                if (this.isOneButton) {
                    return this.focused !== -1;
                }

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

        %not-active-button {
            border-color: black;
        }

        %active-button {
            border-color: red;

            border-top-style: solid;
        }

        %simple-keyboard-string-abstract-element {
            border-top-style: solid;
            border-top-width: .1em;

            border-bottom-width: .15em;
            border-bottom-style: solid;
        }

        .simple-keyboard-string-element {
            @extend %not-active-button;
            @extend %simple-keyboard-string-abstract-element;
        }

        .simple-keyboard-string-active-element {
            @extend %active-button;
            @extend %simple-keyboard-string-abstract-element;

            border-bottom-width: .15em;
            border-bottom-style: solid;
        }

        %simple-keyboard-string-left-abstract-element {
            @extend %simple-keyboard-string-abstract-element;

            padding-right: .85em;
            border-left-width: .15em;
            border-left-style: solid;
        }

        .simple-keyboard-string-left-element {
            @extend %simple-keyboard-string-left-abstract-element;
            @extend %not-active-button;
        }

        .simple-keyboard-string-left-active-element {
            @extend %simple-keyboard-string-left-abstract-element;
            @extend %active-button;
        }

        %simple-keyboard-string-right-abstract-element {
            @extend %simple-keyboard-string-abstract-element;

            padding-left: .85em;

            border-right-width: .15em;
            border-right-style: solid;
        }

        .simple-keyboard-string-right-element {
            @extend %simple-keyboard-string-right-abstract-element;
            @extend %not-active-button;
        }

        .simple-keyboard-string-right-active-element {
            @extend %simple-keyboard-string-right-abstract-element;
            @extend %active-button;
        }
    }
</style>
