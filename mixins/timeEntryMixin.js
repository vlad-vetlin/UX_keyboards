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
            alert("Вы ввели " + this.curString + ". А правильный ввод " + this.currentActiveText);

            this.timeMetric += time;
            this.mistakeMetric += mistakes;

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
            alert("Тестирование окончено. Ваши метрики: \n 1) Метрика ошибок: " + this.mistakeMetric + "\n 2) Метрика времени: " + this.timeMetric);
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
