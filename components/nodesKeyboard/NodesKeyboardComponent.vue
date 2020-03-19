<template>
    <div class="nodes-keyboard-container">
        <div>
            <div class="nodes-line">
                <node :is-active="isActive(0)" :symbols="buttons[0]" :in-line="!isActive(0)"></node>
                <node :is-active="isActive(1)" :symbols="buttons[1]" :in-line="!isActive(1)"></node>
                <node :is-active="isActive(2)" :symbols="buttons[2]" :in-line="!isActive(2)"></node>
            </div>
            <div class="nodes-line">
                <node :is-active="isActive(3)" :symbols="buttons[3]" :in-line="!isActive(3)"></node>
                <node :is-active="isActive(4)" :symbols="buttons[4]" :in-line="!isActive(4)"></node>
                <node :is-active="isActive(5)" :symbols="buttons[5]" :in-line="!isActive(5)"></node>
                <node :is-active="isActive(6)" :symbols="buttons[6]" :in-line="!isActive(6)"></node>
                <node :is-active="isActive(7)" :symbols="buttons[7]" :in-line="!isActive(7)"></node>
            </div>
            <div class="nodes-line">
                <node :is-active="isActive(8)" :symbols="buttons[8]" :in-line="!isActive(8)"></node>
                <node :is-active="isActive(9)" :symbols="buttons[9]" :in-line="!isActive(9)"></node>
                <node :is-active="isActive(10)" :symbols="buttons[10]" :in-line="!isActive(10)"></node>
            </div>
        </div>
    </div>
</template>

<script>

    import {shuffle, turnCaseRecursive} from "../../assets/js/helper";

    const moveRightCode = 1094;
    const moveLeftCode = 1095;
    const moveUpCode = 1092;
    const moveDownCode = 1074;

    // const moveRightCode = 1074;
    // const moveLeftCode = 1092;
    // const moveUpCode = 1094;
    // const moveDownCode = 1099;

    const moveRightInNodeCode = 1075;
    const moveLeftInNodeCode = 1088;
    const moveUpInNodeCode = 1085;
    const moveDownInNodeCode = 1086;
    const clickCode = 1097;

    const defaultActive = 5;

    import Node from "../Node";
    export default {
        name: "NodesKeyboardComponent",
        components: {Node},
        data() {
            return {
                buttons: [
                    ['0', '1', '2', '3'], // право верх
                    ['и', 'п', 'с', 'я'], // верх
                    ['4', '5', '6', '7'], // лево верх
                    ['б', 'ж', 'ф', 'ю'],  // самый левый
                    ['д', 'з', 'к', 'р'], // лево
                    ['о', 'a', 'e', ' '], // центр
                    ['л', 'м', 'н', 'ы'], // прав
                    ['й', 'х', 'ч', 'щ'], // самый правый
                    ['г', 'ш', 'э', '8'], // право низ
                    ['у', 'ь', 'в', 'т'], // низ
                    ['ё', 'ц', 'ь', '9'], // лево низ
                ],
                curActive: defaultActive,
                isShift: false,
            }
        },
        methods: {
            makeShiftEverywhere() {
                this.isShift = !this.isShift;
                this.buttons = turnCaseRecursive(this.buttons, this.isShift);
            },
            moveRight() {
                switch (this.curActive) {
                    case 2:
                        this.curActive = 0;
                        break;
                    case 7:
                        this.curActive = 3;
                        break;
                    case 10:
                        this.curActive = 8;
                        break;
                    default:
                        ++this.curActive;
                }
            },
            moveLeft() {
                switch (this.curActive) {
                    case 0:
                        this.curActive = 2;
                        break;
                    case 3:
                        this.curActive = 7;
                        break;
                    case 8:
                        this.curActive = 10;
                        break;
                    default:
                        --this.curActive;
                }
            },
            moveDown() {
                switch (this.curActive) {
                    case 0:
                        this.curActive = 4;
                        break;
                    case 1:
                        this.curActive = 5;
                        break;
                    case 2:
                        this.curActive = 6;
                        break;
                    case 3:
                        break;
                    case 4:
                        this.curActive = 8;
                        break;
                    case 5:
                        this.curActive = 9;
                        break;
                    case 6:
                        this.curActive = 10;
                        break;
                    case 7:
                        break;
                    case 8:
                        this.curActive = 0;
                        break;
                    case 9:
                        this.curActive = 1;
                        break;
                    case 10:
                        this.curActive = 2;
                        break;
                }
            },
            moveUp() {
                switch (this.curActive) {
                    case 0:
                        this.curActive = 8;
                        break;
                    case 1:
                        this.curActive = 9;
                        break;
                    case 2:
                        this.curActive = 10;
                        break;
                    case 3:
                        break;
                    case 4:
                        this.curActive = 0;
                        break;
                    case 5:
                        this.curActive = 1;
                        break;
                    case 6:
                        this.curActive = 2;
                        break;
                    case 7:
                        break;
                    case 8:
                        this.curActive = 4;
                        break;
                    case 9:
                        this.curActive = 5;
                        break;
                    case 10:
                        this.curActive = 6;
                        break;
                }
            },
            moveUpInNode() {
                this.$emit('pressSymbol', this.buttons[this.curActive][0]);
                this.curActive = defaultActive;
            },
            moveDownInNode() {
                this.$emit('pressSymbol', this.buttons[this.curActive][3]);
                this.curActive = defaultActive;
            },
            moveLeftInNode() {
                this.$emit('pressSymbol', this.buttons[this.curActive][1]);
                this.curActive = defaultActive;
            },
            moveRightInNode() {
                this.$emit('pressSymbol', this.buttons[this.curActive][2]);
                this.curActive = defaultActive;
            },
            isActive(index) {
                return index === this.curActive;
            },
            keyPressed(key) {
                const charCode = key.charCode;

                switch (charCode) {
                    case moveUpCode:
                        this.moveUp();
                        break;
                    case moveDownCode:
                        this.moveDown();
                        break;
                    case moveLeftCode:
                        this.moveLeft();
                        break;
                    case moveRightCode:
                        this.moveRight();
                        break;
                    case moveUpInNodeCode:
                        this.moveUpInNode();
                        break;
                    case moveDownInNodeCode:
                        this.moveDownInNode();
                        break;
                    case moveLeftInNodeCode:
                        this.moveLeftInNode();
                        break;
                    case moveRightInNodeCode:
                        this.moveRightInNode();
                        break;
                    case clickCode:
                        this.makeShiftEverywhere();
                        break;
                }

                shuffle(this.buttons[this.curActive]);
            }
        },
        mounted() {
            document.addEventListener('keypress', this.keyPressed);
        }
    }
</script>

<style lang="scss" scoped>

    .nodes-keyboard-container {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .nodes-line {
            display: flex;
            justify-content: center;
        }

        .current-node {
            @extend .nodes-line;

            margin-top: 3em;
        }
    }
</style>
