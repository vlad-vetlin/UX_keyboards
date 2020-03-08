<template>
    <div>
        <simple-keyboard-string v-for="(names, index) in buttons"
                                :names="names"
                                :ref="'string_' + index"
                                :key="index"/>
    </div>
</template>

<script>
    const moveRightCode = 100;
    const moveLeftCode = 97;
    const moveUpCode = 119;
    const moveDownCode = 115;
    const clickCode = 13;

    import SimpleKeyboardString from "./SimpleKeyboardString";
    export default {
        name: "SimpleKeyboardComponent",
        components: {SimpleKeyboardString},
        data() {
            return {
                buttons: [
                    ['q', 'w', 'e', 'r', 't', 'y'],
                    ['u', 'i', 'o', 'p', 'a', 's'],
                    ['d', 'f', 'g', 'h', 'j', 'k'],
                    ['l', 'z', 'x', 'c', 'v', 'b'],
                    ['', '', 'n', 'm', '', ''],
                ],
                curFocused: 0,
            }
        },
        methods: {
            getRef(index) {
                return 'string_' + index;
            },
            keyboardString(index) {
                const ref = this.getRef(index);

                return this.$refs[ref][0];
            },
            keyPressed(key) {
                const charCode = key.charCode;
                const keyboardString = this.keyboardString(this.curFocused);

                switch (charCode) {
                    case moveRightCode:
                        keyboardString.moveRight();
                        break;
                    case moveLeftCode:
                        keyboardString.moveLeft();
                        break;
                    case moveDownCode:
                        if (this.curFocused + 1 >= this.buttons.length) {
                            break;
                        }

                        ++this.curFocused;

                        const valueForUp = keyboardString.getFocused();

                        keyboardString.setFocused(-1);

                        const upKeyboardString = this.keyboardString(this.curFocused);

                        upKeyboardString.setFocused(valueForUp);

                        break;
                    case moveUpCode:
                        if (this.curFocused === 0) {
                            break;
                        }

                        --this.curFocused;

                        const valueForDown = keyboardString.getFocused();

                        keyboardString.setFocused(-1);

                        const downKeyboardString = this.keyboardString(this.curFocused);

                        downKeyboardString.setFocused(valueForDown);

                        break;
                    case clickCode:
                        break;
                }
            }
        },
        mounted() {
            document.addEventListener('keypress', this.keyPressed);

            const keyboardString = this.keyboardString(this.curFocused);

            keyboardString.setFocused(0);
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/constants";

    .simple-keyboard {
        display: flex;

        flex-wrap: wrap;
        justify-content: center;

        width: 6 * ($simple-keyboard-button-width + 2.2) + .2em;
    }
</style>
