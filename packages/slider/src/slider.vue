<template>
    <div :class="[
             `${classPrefix}`,
             isDisabled && 'is-disabled',
             vertical && 'is-vertical'
         ]">
        <div :class="[`${classPrefix}__rail`]"
             ref="slider"
             :style="railStyle"
             @click.self="sliderClick">
            <div :class="[`${classPrefix}__bar`]"
                 :style="barStyle"
                 @click.self="sliderClick"></div>
            <div :class="[`${classPrefix}__handle`]"
                 :style="handleStyle"
                 @mousedown="hanldeMousedown($event, 'min')">
                <tooltip ref="minTooltip"
                         :renderHtml="tooltipVisible === 'always' || false"
                         :disabled="tipDisabled"
                         :always="tooltipVisible === 'always'"
                         placement="top">
                    <span slot="content">{{tipFormat(emitValue[0])}}</span>
                    <div :class="[`${classPrefix}__handle-rel`]"
                         @mouseenter="isHover = true"
                         @mouseleave="isHover = false"
                         :style="handleRelStyle"></div>
                </tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Tooltip from 'packages/tooltip'
    import { on, off } from 'main/utils/dom';
    import elementResizeDetectorMaker from 'element-resize-detector';
    import { colorToRgba } from 'main/utils/global';

    export default {
        name: 'Slider',
        props: {
            value: [Array, Number],
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 1
            },
            range: {
                type: Boolean,
                default: false
            },
            disabled: Boolean,
            vertical: Boolean,
            tooltipVisible: {
                type: String,
                default: 'hover',
                validator(value) {
                    return ['hover', 'always', 'never'].includes(value)
                }
            },
            tipFormat: {
                type: Function,
                default: function (val) {
                    return val
                }
            },
            railColor: String,
            barColor: String
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-slider',
                currentValue: [],
                startX: 0,
                startY: 0,
                startPos: 0,
                dragging: false,
                moveType: '',
                sliderLength: 0,
                observer: null,
                isHover: false
            }
        },
        computed: {
            directionType() {
                return this.vertical ? 'Y' : 'X';
            },
            isDisabled() {
                return this.disabled
            },
            minPosition() {
                return (this.currentValue[0] - this.min) / this.rangeValue * 100;
            },
            maxPosition() {
                return (this.currentValue[1] - this.min) / this.rangeValue * 100;
            },
            rangeValue() {
                return this.max - this.min;
            },
            railStyle() {
                return this.railColor ? { 'background-color': this.railColor } : {};
            },
            handleStyle() {
                let style = {
                    left: this.minPosition + '%'
                };
                if (this.vertical) {
                    style = {
                        bottom: this.minPosition + '%'
                    }
                }
                return style;
            },
            barStyle() {
                let style = {
                    width: (this.currentValue[0] - this.min) / this.rangeValue * 100 + '%',
                    'background-color': this.barColor
                };
                if (this.vertical) {
                    style = {
                        ...style,
                        width: '100%',
                        height: (this.currentValue[0] - this.min) / this.rangeValue * 100 + '%'
                    }
                }
                return style;
            },
            tipDisabled() {
                return this.tipFormat(this.currentValue[0]) === null || this.tooltipVisible === 'never'
            },
            emitValue() {
                let fixedLength = 0;
                if (this.step.toString().includes('.')) {
                    fixedLength = this.step.toString().split('.')[1]
                }
                return this.currentValue.map(i => Number(i.toFixed(fixedLength)))
            },
            handleRelStyle() {
                let style = {};
                if (this.barColor) {
                    const color = colorToRgba(this.barColor, 0.2);
                    style = { 'border-color': this.barColor };
                    if (this.isHover) style = { ...style, 'box-shadow': `0 0 0 4px ${color}` }
                }
                return style;
            }
        },
        components: {
            Tooltip
        },
        mounted() {
            this.observer = elementResizeDetectorMaker();
            this.observer.listenTo(this.$refs.slider, this.getSliderLength);
            this.initCurrentValue();
        },
        beforeDestroy() {
            this.observer.removeListener(this.$refs.slider, this.getSliderLength);
        },
        watch: {
            value: function () {
                this.initCurrentValue();
            },
            emitValue(newVal) {
                const value = this.range ? newVal : newVal[0];
                this.$emit('input', value);
            }
        },
        methods: {
            initCurrentValue() {
                const value = Array.isArray(this.value) ? this.value : [this.value];
                this.currentValue = this.checkLimits(value);
            },
            checkLimits([min, max]) {
                min = Math.max(this.min, min);
                min = Math.min(this.max, min);

                max = Math.max(this.min, min, max);
                max = Math.min(this.max, max);
                return [min, max];
            },
            getPoint(event) {
                return event.type.indexOf('touch') !== -1 ? event.touches[0][`client${this.directionType}`] : event[`client${this.directionType}`];
            },
            dragStart(event) {
                this.dragging = false;
                this[`start${this.directionType}`] = this.getPoint(event);
                this.startPos = (this[`${this.moveType}Position`] * this.rangeValue / 100) + this.min;
            },
            dragRuning(event) {
                this.dragging = true;
                const currentPos = this.getPoint(event);
                if (this.tooltipVisible === 'hover') this.$refs[`${this.moveType}Tooltip`].visible = true;
                const diff = (currentPos - this[`start${this.directionType}`]) / this.sliderLength * this.rangeValue;

                if (this.vertical) this.handleChangePosition(this.startPos - diff);
                else this.handleChangePosition(this.startPos + diff);
            },
            dragEnd() {
                if (this.dragging) {
                    this.dragging = false;
                    if (this.tooltipVisible === 'hover') this.$refs[`${this.moveType}Tooltip`].visible = false;
                    this.emitChange();
                }
                this.moveType = '';
                off(window, 'mousemove', this.dragRuning);
                off(window, 'mouseup', this.dragEnd);
            },
            hanldeMousedown(event, type) {
                if (this.disabled) return;
                event.preventDefault();
                this.moveType = type;

                this.dragStart(event);
                on(window, 'mousemove', this.dragRuning);
                on(window, 'mouseup', this.dragEnd);
            },
            handleChangePosition(newPos, type) {
                const index = (type || this.moveType) === 'min' ? 0 : 1;
                newPos = index === 0 ? this.checkLimits([newPos, this.max])[0] : this.checkLimits([this.min, newPos])[1];
                const value = this.currentValue;
                value[index] = newPos - this.stepDecimal(newPos, this.step);

                this.currentValue = [...value];

                if (!this.dragging) {
                    this.emitChange();
                }
            },
            stepDecimal(pos, step) {
                if (step < 1) {
                    const sl = step.toString();
                    let multiple = 1;
                    let m;
                    try {
                        m = sl.split('.')[1].length;
                    } catch (e) {
                        m = 0;
                    }
                    multiple = Math.pow(10, m);
                    return (pos * multiple) % (step * multiple) / multiple;
                }
                return pos % step;
            },
            sliderClick(event) {
                if (this.disabled) return;
                this.dragging = false;
                const currentPos = this.getPoint(event);
                const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
                const newPos = ((currentPos - sliderOffsetLeft) / this.sliderLength * this.rangeValue) + this.min;
                this.handleChangePosition(newPos, 'min');
            },
            emitChange() {
                const value = this.range ? this.emitValue : this.emitValue[0];
                this.$emit('change', value);
            },
            getSliderLength() {
                this.sliderLength = this.vertical ? this.$refs.slider.offsetHeight : this.$refs.slider.offsetWidth
            }
        }
    }
</script>
