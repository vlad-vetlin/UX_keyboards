<template>
    <div>
        <div class="simple-keyboard-alert">
            <div v-if="showAlert">
                Вы выбрали неверный символ, и он не был набран
            </div>
        </div>
        <div class="simple-keyboard-container">
            <div class="simple-keyboard">
                <simple-keyboard-string v-for="(names, index) in buttons"
                                        :names="names"
                                        :ref="'string_' + index"
                                        :upper-case="upperCase"
                                        :is-one-button="isOneButtons[index]"
                                        :key="index"/>
            </div>
            <div class="simple-keyboard-node">
                <node :symbols="symbols"
                      v-if="!isActive"
                      :true-symbol="trueSymbol"
                      :back-code="backCode"
                      :button-codes="[moveUpCode, moveRightCode, moveDownCode, moveLeftCode]"
                      @clicked="nodeClicked"/>
            </div>
        </div>
    </div>
</template>

<script>
    import SimpleKeyboardButton from "./SimpleKeyboardButton";
    import SimpleKeyboardString from "./SimpleKeyboardString";
    import {getRandomSymbols} from "../../assets/js/helper";
    import Node from "../Node";


    export default {
        name: "SimpleKeyboardComponent",
        components: {Node, SimpleKeyboardButton, SimpleKeyboardString},
        data() {
            return {
                buttons: [
                    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
                    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
                    ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ъ'],
                    ['', '', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '', '']
                ],
                isOneButtons: [false, false, false, false, true],
                curFocused: 0,
                upperCase: false,
                symbols: [],
                isActive: true,
                curFocusedInChild: 0,
                showAlert: false,
                trueSymbol: '',
                lastX: 0,
                lastY: 0,
                mouseRemove: true,

                moveRightCode: 1094,
                moveLeftCode: 1095,
                moveUpCode: 1092,
                moveDownCode: 1074,

                // moveRightCode: 1074,
                // moveLeftCode: 1092,
                // moveUpCode: 1094,
                // moveDownCode: 1099,

                clickCode: 1076,

                // clickCode: 13,

                backCode: 1085, // c

                // backCode: 32 // c
            }
        },
        props: {
            isReady: {type: Boolean, required: true,},
        },
        methods: {
            nodeClicked(symbol) {
                this.pushSymbol(symbol);

                this.isActive = true;

                this.restoreFocused();
            },
            pushSymbol(symbol) {
                if (symbol === '') {

                    this.showAlert = true;

                    return;
                }

                if (symbol === 'back') {
                    return;
                }

                this.$emit('pressSymbol', symbol);
            },
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
                if (!this.isReady) {
                    return;
                }

                if (!this.isActive) {
                    return;
                }

                this.showAlert = false;

                const charCode = key.charCode;
                const keyboardString = this.keyboardString(this.curFocused);

                switch (charCode) {
                    case this.moveRightCode:
                        keyboardString.moveRight();
                        break;
                    case this.moveLeftCode:
                        keyboardString.moveLeft();
                        break;
                    case this.moveDownCode:
                        if (this.curFocused + 1 >= this.buttons.length) {
                            break;
                        }

                        ++this.curFocused;

                        const valueForUp = keyboardString.getFocused();

                        keyboardString.setFocused(-1);

                        const upKeyboardString = this.keyboardString(this.curFocused);

                        upKeyboardString.setFocused(valueForUp);

                        break;
                    case this.moveUpCode:
                        if (this.curFocused === 0) {
                            break;
                        }

                        --this.curFocused;

                        const valueForDown = keyboardString.getFocused();

                        keyboardString.setFocused(-1);

                        const downKeyboardString = this.keyboardString(this.curFocused);

                        downKeyboardString.setFocused(valueForDown);

                        break;
                    case this.clickCode:
                        const name = this.getFocusedName();

                        if (name === 'shift' || name === 'SHIFT') {
                            this.upperCase = !this.upperCase;

                            return;
                        }

                        this.symbols = getRandomSymbols(name, this.upperCase);
                        this.trueSymbol = name;

                        this.saveFocused();
                        this.isActive = false;

                        break;
                    case this.backCode:
                        this.isActive = true;
                        this.restoreFocused();
                        break;
                }
            },
            saveFocused() {
                const keyboard = this.keyboardString(this.curFocused);

                this.curFocusedInChild = keyboard.getFocused();
                keyboard.setFocused(-1);
            },
            restoreFocused() {
                const keyboard = this.keyboardString(this.curFocused);

                keyboard.setFocused(this.curFocusedInChild);
            },
        },
        mounted() {
            document.addEventListener('keypress', this.keyPressed);

            this.restoreFocused();
        },
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/constants";

    .simple-keyboard-alert {
        color: red;

        height: 1em;

        margin: 1em;

        text-align: center;
    }

    %abstract-simple-keyboard-container {
        display: flex;

        flex-direction: column;

        .simple-keyboard {
            display: flex;

            align-items: center;

            flex-direction: column;

            margin-bottom: 2em;
        }

        .simple-keyboard-node {
            display: flex;
            justify-content: center;
        }
    }

    .simple-keyboard-container {
        @extend %abstract-simple-keyboard-container;

        align-items: center;
    }
</style>
