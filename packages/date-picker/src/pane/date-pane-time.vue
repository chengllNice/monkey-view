<template>
    <div :class="[
            'cl-date-pane-time',
            size && `cl-date-pane-time--${size}`,
            !showSsCol && `cl-date-pane-time--no-show-ss`,
         ]">
        <div class="cl-date-pane-time__hh">
            <ClScroll size="small" ref="hhScroll">
                <div class="cl-date-pane-time__hh-inner">
                    <template v-for="hhItem in hhData">
                        <div v-if="!(picker.hideDisabledOptions && picker.disabledHours.includes(parseInt(hhItem.id)))"
                             class="cl-date-pane-item__col"
                             :class="[
                                !(hhItem.id === selectedHours) && !(picker.disabledHours && picker.disabledHours.includes(parseInt(hhItem.id))) && 'cl-date-pane-item__hover',
                                !hhItem.visibility && 'cl-date-pane-time__hide',
                                hhItem.id === selectedHours && 'cl-date-pane-item__selected',
                                picker.disabledHours && picker.disabledHours.includes(parseInt(hhItem.id)) && 'cl-date-pane-item__disabled',
                             ]"

                             :key="hhItem.id"
                             @click="selectHours(hhItem)"><em>{{hhItem.name}}</em></div>
                    </template>
                </div>
            </ClScroll>
        </div>
        <div class="cl-date-pane-time__mm">
            <ClScroll size="small" ref="mmScroll">
                <div class="cl-date-pane-time__mm-inner">
                    <template v-for="mmItem in mmData">
                        <div v-if="!(picker.hideDisabledOptions && picker.disabledMinutes.includes(parseInt(mmItem.id)))"
                             class="cl-date-pane-item__col"
                             :class="[
                                !(mmItem.id === selectedMinutes) && !(picker.disabledMinutes && picker.disabledMinutes.includes(parseInt(mmItem.id))) && 'cl-date-pane-item__hover',
                                !mmItem.visibility && 'cl-date-pane-time__hide',
                                mmItem.id === selectedMinutes && 'cl-date-pane-item__selected',
                                picker.disabledMinutes && picker.disabledMinutes.includes(parseInt(mmItem.id)) && 'cl-date-pane-item__disabled',
                             ]"
                             :key="mmItem.id"
                             @click="selectMinutes(mmItem)"><em>{{mmItem.name}}</em></div>
                    </template>
                </div>
            </ClScroll>
        </div>
        <div class="cl-date-pane-time__ss" v-if="showSsCol">
            <ClScroll size="small" ref="ssScroll">
                <div class="cl-date-pane-time__ss-inner">
                    <template v-for="ssItem in ssData">
                        <div v-if="!(picker.hideDisabledOptions && picker.disabledSeconds.includes(parseInt(ssItem.id)))"
                             class="cl-date-pane-item__col"
                             :class="[
                                !(ssItem.id === selectedSecond) && !(picker.disabledSeconds && picker.disabledSeconds.includes(parseInt(ssItem.id))) && 'cl-date-pane-item__hover',
                                !ssItem.visibility && 'cl-date-pane-time__hide',
                                ssItem.id === selectedSecond && 'cl-date-pane-item__selected',
                                picker.disabledSeconds && picker.disabledSeconds.includes(parseInt(ssItem.id)) && 'cl-date-pane-item__disabled',
                             ]"
                             :key="ssItem.id"
                             @click="selectSecond(ssItem)"><em>{{ssItem.name}}</em></div>
                    </template>
                </div>
            </ClScroll>
        </div>
    </div>
</template>

<script>
    import ClScroll from '../../../scroll/src/scroll.vue'
    import {dateFormat, zero} from "main/utils/date";

    export default {
        name: "DatePaneTime",
        inject: ['picker'],
        props: {
            size: String,
            type: String,
            format: String,
            year: String,
            month: String,
            date: {
                type: Array,
                default() {
                    return []
                }
            },
            currentDate: Object,
            isRange: Boolean,
            hoverDate: String,
            index: String,
        },
        data(){
            let nowDate = new Date();
            nowDate.setHours(0);
            nowDate.setMinutes(0);
            nowDate.setSeconds(0);
            return {
                hhData: [],
                mmData: [],
                ssData: [],
                selectedHours: '',
                selectedMinutes: '',
                selectedSecond: '',
                hideNum: 8,
                defaultHours: '',
                defaultMinutes: '',
                defaultSecond: '',
                nowDate: nowDate
            }
        },
        computed: {
            showSsCol(){
                return this.format.includes('ss')
            }
        },
        components: {
            ClScroll
        },
        mounted(){
            this.initData();
            this.$nextTick(()=>{
                this.getSelected();
            })
        },
        methods: {
            initData(){
                this.hhData = [];
                this.mmData = [];
                this.ssData = [];
                this.defaultHours = '';
                this.defaultMinutes = '';
                this.defaultSecond = '';
                for (let i = 0; i < 24 + this.hideNum; i++){
                    if(this.picker && this.picker.disabledHours && !this.picker.disabledHours.includes(i) && !this.defaultHours){
                        this.defaultHours = zero(i.toString());
                    }
                    this.hhData.push({
                        id: zero(i.toString()),
                        name: zero(i.toString()),
                        visibility: i <= 24,
                    });
                }
                for (let i = 0; i < 60  + this.hideNum; i++){
                    if(this.picker && this.picker.disabledMinutes && !this.picker.disabledMinutes.includes(i) && !this.defaultMinutes){
                        this.defaultMinutes = zero(i.toString());
                    }
                    if(this.picker && this.picker.disabledSeconds && !this.picker.disabledSeconds.includes(i) && !this.defaultSecond){
                        this.defaultSecond = zero(i.toString());
                    }
                    this.mmData.push({
                        id: zero(i.toString()),
                        name: zero(i.toString()),
                        visibility: i <= 60,
                    });
                    this.ssData.push({
                        id: zero(i.toString()),
                        name: zero(i.toString()),
                        visibility: i <= 60,
                    });
                }
                this.nowDate.setHours(parseInt(this.defaultHours || 0));
                this.nowDate.setMinutes(parseInt(this.defaultMinutes || 0));
                this.nowDate.setSeconds(parseInt(this.defaultSecond || 0));
            },
            getSelected(){
                this.selectedHours = '';
                this.selectedMinutes = '';
                this.selectedSecond = '';
                let date = this.nowDate;
                if(this.date[this.index]){
                    date = new Date(this.date[this.index]);
                    this.selectedHours = dateFormat(date, 'hh');
                    this.selectedMinutes = dateFormat(date, 'mm');
                    this.selectedSecond = dateFormat(date, 'ss');
                }
                this.scrollToHours();
                this.scrollToMinutes();
                this.scrollToSecond();
            },
            selectHours(hhItem){
                if(this.picker.disabledHours && this.picker.disabledHours.includes(parseInt(hhItem.id))) return;
                this.selectedHours = hhItem.id;
                this.emitUpdateTime();
            },
            selectMinutes(mmItem){
                if(this.picker.disabledMinutes && this.picker.disabledMinutes.includes(parseInt(mmItem.id))) return;
                this.selectedMinutes = mmItem.id;
                this.emitUpdateTime();
            },
            selectSecond(ssItem){
                if(this.picker.disabledSeconds && this.picker.disabledSeconds.includes(parseInt(ssItem.id))) return;
                this.selectedSecond = ssItem.id;
                this.emitUpdateTime();
            },
            emitUpdateTime(){
                let date = this.nowDate;
                if(this.date[this.index]){
                    date = new Date(this.date[this.index]);
                }

                date.setHours(this.selectedHours || this.defaultHours);
                date.setMinutes(this.selectedMinutes || this.defaultMinutes);
                date.setSeconds(this.selectedSecond || this.defaultSecond);
                date = dateFormat(date, this.format);
                this.$emit('update-time', [date]);
            },
            scrollToHours(){
                let y = 0;
                if(this.selectedHours) y = this.selectedHours / 24 * 100 + '%';
                this.$nextTick(()=>{
                    this.$refs.hhScroll && this.$refs.hhScroll.scrollTo({
                        x: 0,
                        y: y
                    }, 200);
                })
            },
            scrollToMinutes(){
                let y = 0;
                if(this.selectedMinutes) y = this.selectedMinutes / 60 * 100 + '%';
                this.$nextTick(()=>{
                    this.$refs.mmScroll && this.$refs.mmScroll.scrollTo({
                        x: 0,
                        y: y
                    }, 200);
                })
            },
            scrollToSecond(){
                let y = 0;
                if(this.selectedSecond) y = this.selectedSecond / 60 * 100 + '%';
                this.$nextTick(()=>{
                    this.$refs.ssScroll && this.$refs.ssScroll.scrollTo({
                        x: 0,
                        y: y
                    }, 200);
                })
            }
        },
        watch: {
            date() {
                this.getSelected();
            },
            'picker.visible': function (newVal) {
                if(newVal){
                    this.getSelected();
                }
            }
        }
    }
</script>
