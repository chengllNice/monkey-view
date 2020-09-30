<template>
    <div :class="[
             `${classPrefix}`,
              type && `${classPrefix}--${type}`,
              status && `${classPrefix}--${status}`,
              outerInfoShow && `${classPrefix}--show-info`,
         ]"
         role="progressbar"
         :aria-valuenow="percent"
         aria-valuemin="0"
         aria-valuemax="100">
        <div :class="[`${classPrefix}__wrap`]" v-if="type === 'line'">
            <div :class="[`${classPrefix}__rail`]" :style="railStyle">
                <div :class="[`${classPrefix}__bar`]" :style="barStyle">
                    <span :class="[`${classPrefix}__inside`]" :style="valueStyle" v-if="infoInside">
                        <slot>{{valueFormat(percent)}}</slot>
                    </span>
                </div>
            </div>
        </div>

        <div :class="[`${classPrefix}__circle`]" :style="{height: circleWidth + 'px', width: circleWidth + 'px'}" v-else>
            <svg viewBox="0 0 100 100">
                <path :class="[`${classPrefix}__circle-track`]"
                      :d="trackPath"
                      :stroke="railStroke"
                      stroke-linecap="round"
                      :stroke-width="relativeStrokeWidth"
                      fill="none"
                      :style="dashPathStyle"></path>
                <path :class="[`${classPrefix}__circle-path`]"
                      :d="trackPath"
                      :stroke="barStroke"
                      stroke-linecap="round"
                      :stroke-width="percent ? relativeStrokeWidth : 0"
                      fill="none"
                      :style="circlePathStyle"></path>
            </svg>
        </div>

        <span :class="[`${classPrefix}__value`]" v-if="outerInfoShow" :style="valueStyle">
            <slot>
                <span v-if="!iconType">{{valueFormat(percent)}}</span>
                <Icon :class="[`${classPrefix}__icon`]" v-if="iconType" :type="iconType"></Icon>
            </slot>
        </span>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Icon from 'packages/icon'

    export default {
        name: 'Progress',
        props: {
            percent: {
                type: Number,
                default: 0,
                required: true,
                validator(value) {
                    return value >= 0 && value <= 100
                }
            },
            type: {
                type: String,
                default: 'line',
                validator(value) {
                    return ['line', 'circle', 'dashboard'].includes(value)
                }
            },
            strokeWidth: {
                type: [String, Number],
                default: 10,
                validator(value) {
                    return parseFloat(value) > 0
                }
            },
            status: String,
            valueFormat: {
                type: Function,
                default: function (value) {
                    return value + '%'
                }
            },
            showInfo: {
                type: Boolean,
                default: true
            },
            infoInside: Boolean, // 只在line模式下有效
            railColor: String,
            barColor: String,
            width: {
                type: [String, Number],
                default: 126
            }// circle模式下有效
        },
        data() {
            return {
                classPrefix: Config.classPrefix + '-progress'
            }
        },
        computed: {
            railStyle() {
                let style = {
                    'border-radius': parseFloat(this.strokeWidth) + 'px',
                    background: this.railColor
                };
                if (this.vertical) {
                    style = {
                        ...style,
                        width: parseFloat(this.strokeWidth) + 'px'
                    }
                } else {
                    style = {
                        ...style,
                        height: parseFloat(this.strokeWidth) + 'px',
                        'line-height': parseFloat(this.strokeWidth) + 'px'
                    }
                }
                return style
            },
            barStyle() {
                let style = {
                    ...this.railStyle,
                    background: this.barColor
                };
                if (this.vertical) {
                    style = {
                        ...style,
                        height: this.percent + '%'
                    }
                } else {
                    style = {
                        ...style,
                        width: this.percent + '%'
                    }
                }
                return style;
            },
            valueStyle() {
                let style = {};
                let fontSize = Math.max((parseFloat(this.strokeWidth) / 2), 12);
                if (this.type === 'circle' && this.iconType) {
                    fontSize = Math.max((this.circleWidth * 0.1 + 2), 16);
                }
                style = {
                    'line-height': parseFloat(this.strokeWidth) + 'px',
                    'font-size': fontSize + 'px'
                };
                return style;
            },
            outerInfoShow() {
                if (this.type === 'line' && this.infoInside) {
                    return false
                } else {
                    return this.showInfo
                }
            },
            iconType() {
                let className = '';
                switch (this.status) {
                    case 'success':
                        className = 'success-fill';
                        break;
                    case 'error':
                        className = 'error-fill';
                        break;
                    case 'warning':
                        className = 'warning-fill';
                        break;
                }
                return className
            },
            radius() {
                if (this.type === 'circle' || this.type === 'dashboard') {
                    return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
                } else {
                    return 0;
                }
            },
            relativeStrokeWidth() {
                return (this.strokeWidth / this.circleWidth * 100).toFixed(1);
            },
            trackPath() {
                const radius = this.radius;
                const isDashboard = this.type === 'dashboard';
                return `
                    M 50, 50
                    m 0, ${isDashboard ? '' : '-'}${radius}
                    a ${radius} ${radius} 0 1 1 0, ${isDashboard ? '-' : ''}${radius * 2}
                    a ${radius} ${radius} 0 1 1 0, ${isDashboard ? '' : '-'}${radius * 2}`;
            },
            perimeter() {
                return 2 * Math.PI * this.radius;
            },
            rate() {
                return this.type === 'dashboard' ? 0.75 : 1;
            },
            strokeDashoffset() {
                const offset = -1 * this.perimeter * (1 - this.rate) / 2;
                return `${offset}px`;
            },
            dashPathStyle() {
                return {
                    strokeDasharray: `${this.perimeter * this.rate}px, ${this.perimeter}px`,
                    strokeDashoffset: this.strokeDashoffset
                };
            },
            circlePathStyle() {
                return {
                    strokeDasharray: `${this.perimeter * this.rate * (this.percent / 100)}px, ${this.perimeter}px`,
                    strokeDashoffset: this.strokeDashoffset,
                    transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
                };
            },
            railStroke() {
                let ret;
                if (this.railColor) {
                    ret = this.railColor;
                } else {
                    ret = '#f5f7fa'
                }
                return ret;
            },
            barStroke() {
                let ret;
                if (this.barColor) {
                    ret = this.barColor;
                } else {
                    switch (this.status) {
                        case 'success':
                            ret = '#42b983';
                            break;
                        case 'error':
                            ret = '#ed4014';
                            break;
                        case 'warning':
                            ret = '#f8ac59';
                            break;
                        default:
                            ret = '#2d8cf0';
                    }
                }
                return ret;
            },
            circleWidth() {
                return parseFloat(this.width)
            }
        },
        components: {
            Icon
        }
    }
</script>
