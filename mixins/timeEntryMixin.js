import {texts} from "../assets/js/texts";
import {levenshteinDistance} from "../assets/js/helper";

let timeForPrepare = 10000;

export const timeEntryMixin = {
    data() {
        return {
            timeLeft: timeForPrepare,
            interval: undefined,
            curTime: undefined,

            timeMetric: 0,
            mistakeMetric: 0,
            symbolCount: 0,
        }
    },
    methods: {
        timeToReady() {
            this.timeLeft -= 5000;

            if (this.timeLeft === 0) {
                this.start();
            } else {
                this.$message({
                    message: 'Осталось ' + this.timeLeft / 1000 + " секунд",
                    type: 'message'
                });
            }
        },
        start() {
            window.clearInterval(this.interval);
            this.interval = undefined;

            this.curTime = new Date();

            this.$message({
                message: "Начало",
                type: 'success'
            });
        },
        init() {
            this.interval = window.setInterval(this.timeToReady, 5000);
        },
        nextText() {
            const currentTime = new Date();

            this.$message({
                message: 'Ввод окончен',
                type: 'success',
            });

            const time = currentTime - this.curTime;
            const mistakes = levenshteinDistance(this.curString, this.texts[this.curTextCount]);

            alert("Время: " + Math.floor(time / 1000) + " секунд, " + time % 1000 + " миллисекунд. " + mistakes + " ошибок.");
            alert("Длина строки: " + this.texts[this.curTextCount].length + " символов");

            this.timeMetric += Math.floor(time / 1000);
            this.mistakeMetric += mistakes;
            this.symbolCount += this.texts[this.curTextCount].length;

            if (this.texts.length === this.curTextCount + 1) {
                this.getFinalMetric();
                return;
            }

            this.curString = '';

            this.timeLeft = timeForPrepare;
            this.interval = window.setInterval(this.timeToReady, 5000);

            ++this.curTextCount;
        },
        getFinalMetric() {
            const speedMetric = this.symbolCount / this.timeMetric;

            alert("Тестирование окончено. Ваши метрики: \n 1) Метрика ошибок: " + this.mistakeMetric + "\n 2) Метрика скорости: " + speedMetric + " символов в секунду");
        },
    },
    watch: {
        curString: {
            handler(value) {
                if (value.length === this.currentActiveText.length) {
                    this.nextText();
                }
            }
        }
    },
    computed: {
        isReady() {
            return this.timeLeft === 0;
        }
    },
};
