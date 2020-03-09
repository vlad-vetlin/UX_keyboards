<template>
    <div class="node-container">
        <div class="node">
            <div class="node-horizontal-element">{{symbols[0]}}</div>
            <div class="node-center-container">
                <div class="node-vertical-element">{{symbols[1]}}</div>
                <div class="node-center-element"></div>
                <div class="node-vertical-element">{{symbols[2]}}</div>
            </div>
            <div class="node-horizontal-element">{{symbols[3]}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Node",
        props: {
            symbols: {type: Array, required: true},
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

                width: $width;
                height: $height;
            }

            .node-vertical-element {
                @extend %node-element;

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
</style>
