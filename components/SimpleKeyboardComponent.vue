<template>
    <div>
        <output-menu :text="curString"></output-menu>
        <div class="simple-keyboard">
            <simple-keyboard-string v-for="(names, index) in buttons"
                                    :names="names"
                                    :ref="'string_' + index"
                                    :is-one-button="isOneButtons[index]"
                                    :key="index"/>
        </div>
    </div>
</template>

<script>
    import SimpleKeyboardButton from "./SimpleKeyboardButton";
    const moveRightCode = 100;
    const moveLeftCode = 97;
    const moveUpCode = 119;
    const moveDownCode = 115;
    const clickCode = 13;

    import SimpleKeyboardString from "./SimpleKeyboardString";
    import {getRandomSymbols} from "../assets/js/helper";
    import OutputMenu from "./OutputMenu";
    export default {
        name: "SimpleKeyboardComponent",
        components: {OutputMenu, SimpleKeyboardButton, SimpleKeyboardString},
        data() {
            return {
                buttons: [
                    ['й', 'ц', 'у', 'к', 'е', 'н', 'г'],
                    ['ш', 'щ', 'p', 'х', 'ъ', 'ф', 'ы'],
                    ['в', 'а', 'п', 'р', 'о', 'л', 'д'],
                    ['ж', 'э', 'я', 'ч', 'с', 'м', 'и'],
                    ['shift', 'т', 'ь', 'б', 'ю', 'ё', 'shift'],
                    ['', ' ', ' ', ' ', ' ', ' ', '']
                ],
                isOneButtons: [false, false, false, false, false, true],
                curFocused: 0,
                curString: '',
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
            getFocusedName() {
                const keyboardString = this.keyboardString(this.curFocused);

                return keyboardString.getActiveName();
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
                        const name = this.getFocusedName();

                        const symbols = getRandomSymbols(name, false);

                        this.curString = this.curString.concat(symbols[0]);

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

        align-items: center;

        flex-direction: column;
    }
</style>
