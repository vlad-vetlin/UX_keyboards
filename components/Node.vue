<template>
    <div :class="nodeContainer">
        <div class="node" v-if="!inLine">
            <div class="node-horizontal-element">{{symbols[0]}}</div>
            <div class="node-center-container">
                <div class="node-vertical-element">{{symbols[1]}}</div>
                <div class="node-center-element"></div>
                <div class="node-vertical-element">{{symbols[2]}}</div>
            </div>
            <div class="node-horizontal-element">{{symbols[3]}}</div>
        </div>
        <div v-else>
            {{symbols[0]}}
            {{symbols[1]}}
            {{symbols[2]}}
            {{symbols[3]}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Node",
        props: {
            symbols: {type: Array, required: true},
            buttonCodes: {type: Array, required: false, default: () => { return []; }},
            trueSymbol: {type: String, required: false, default: ''},
            isActive: {type: Boolean, required: false, default: false},
            inLine: {type: Boolean, required: false, default: false},
            backCode: {type: Number, required: false, default: -1},
        },
        methods: {
            emitClicked(index) {
                if (this.symbols[index] === this.trueSymbol) {
                    this.$emit('clicked', this.symbols[index]);
                } else {
                    this.$emit('clicked', '');
                }
            },
            keyPressed(key) {
                if (!this.buttonCodes.length === 0) {
                    return;
                }

                const charCode = key.charCode;

                if (charCode === this.backCode) {
                    this.$emit('clicked', 'back');
                    return;
                }

                switch (charCode) {
                    case this.buttonCodes[0]:
                        this.emitClicked(0);
                        break;
                    case this.buttonCodes[1]:
                        this.emitClicked(2);
                        break;
                    case this.buttonCodes[2]:
                        this.emitClicked(3);
                        break;
                    case this.buttonCodes[3]:
                        this.emitClicked(1);
                        break;
                }
            },
        },
        computed: {
            nodeContainer() {
                if (!this.isActive) {
                    return 'node-container';
                } else {
                    return 'active-node-container';
                }
            }
        },
        mounted() {
            document.addEventListener('keypress', this.keyPressed);
        }
    }
</script>

<style lang="scss" scoped>
    .node-container {
        $width: 6em;
        $height: 1em;

        width: $width + 6 * $height;
        height: $width + 6 * $height;

        display: flex;

        align-items: center;
        justify-content: center;

        border-width: .1em;
        border-color: black;
        border-style: solid;

        font-weight: bold;

        .node {
            width: $width + 4 * $height;
            height: $width + 4 * $height;

            display: flex;
            flex-direction: column;

            align-items: center;

            %node-element {
                border-width: .1em;
                border-color: black;
                border-style: solid;

                display: flex;
                justify-content: center;
                align-items: center;
            }

            .node-horizontal-element {
                @extend %node-element;

                /*border-color: white;*/

                width: $width;
                height: $height;
            }

            .node-vertical-element {
                @extend %node-element;

                /*border-color: white;*/

                width: $height;
                height: $width;
            }

            .node-center-element {
                @extend %node-element;

                width: $width;
                height: $width;

                border-radius: $width;

                margin: $height;
            }

            .node-center-container {
                display: flex;

                align-items: center;
            }
        }
    }

    .active-node-container {
        @extend .node-container;

        $width: 6em;
        $height: 1em;

        border-width: .3em;
        border-color: red;

        width: $width + 6 * $height - .4em;
        height: $width + 6 * $height - .4em;
    }
</style>
