<template>
    <div :class="[
            'cl-date-pane-time',
            size && `cl-date-pane-time--${size}`,
            !showSsCol && `cl-date-pane-time--no-show-ss`,
         ]">
        <div class="cl-date-pane-time__hh">
            <ClScroll size="small" ref="hhScroll">
                <div class="cl-date-pane-time__hh-inner">
                    <div class="cl-date-pane-item__col"
                         :class="[
                            !(hhItem.id === selectedHours) && 'cl-date-pane-item__hover',
                            !hhItem.visibility && 'cl-date-pane-time__hide',
                            hhItem.id === selectedHours && 'cl-date-pane-item__selected'
                         ]"
                         v-for="hhItem in hhData"
                         :key="hhItem.id"
                         @click="selectHours(hhItem)"><em>{{hhItem.name}}</em></div>
                </div>
            </ClScroll>
        </div>
        <div class="cl-date-pane-time__mm">
            <ClScroll size="small" ref="mmScroll">
                <div class="cl-date-pane-time__mm-inner">
                    <div class="cl-date-pane-item__col"
                         :class="[
                            !(mmItem.id === selectedMinutes) && 'cl-date-pane-item__hover',
                            !mmItem.visibility && 'cl-date-pane-time__hide',
                            mmItem.id === selectedMinutes && 'cl-date-pane-item__selected'
                         ]"
                         v-for="mmItem in mmData"
                         :key="mmItem.id"
                         @click="selectMinutes(mmItem)"><em>{{mmItem.name}}</em></div>
                </div>
            </ClScroll>
        </div>
        <div class="cl-date-pane-time__ss" v-if="showSsCol">
            <ClScroll size="small" ref="ssScroll">
                <div class="cl-date-pane-time__ss-inner">
                    <div class="cl-date-pane-item__col"
                         :class="[
                            !(ssItem.id === selectedSecond) && 'cl-date-pane-item__hover',
                            !ssItem.visibility && 'cl-date-pane-time__hide',
                            ssItem.id === selectedSecond && 'cl-date-pane-item__selected'
                         ]"
                         v-for="ssItem in ssData"
                         :key="ssItem.id"
                         @click="selectSecond(ssItem)"><em>{{ssItem.name}}</em></div>
                </div>
            </ClScroll>
        </div>
    </div>
</template>

<script>
    import ClScroll from '../../../scroll/src/scroll.vue'
    import {dateFormat, zero} from "../../../../utils/date";

    export default {
        name: "ClDatePaneTime",
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
            return {
                hhData: [],
                mmData: [],
                ssData: [],
                selectedHours: '00',
                selectedMinutes: '00',
                selectedSecond: '00',
                hideNum: 8,
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
            this.getSelected();
        },
        methods: {
            initData(){
                this.hhData = [];
                this.mmData = [];
                this.ssData = [];
                for (let i = 0; i < 24 + this.hideNum; i++){
                    this.hhData.push({
                        id: zero(i.toString()),
                        name: zero(i.toString()),
                        visibility: i <= 24
                    });
                }
                for (let i = 0; i < 60  + this.hideNum; i++){
                    this.mmData.push({
                        id: zero(i.toString()),
                        name: zero(i.toString()),
                        visibility: i <= 60
                    });
                    this.ssData.push({
                        id: zero(i.toString()),
                        name: zero(i.toString()),
                        visibility: i <= 60
                    });
                }
            },
            getSelected(){
                if(this.date && this.date.length){
                    this.selectedHours = dateFormat(this.date[this.index], 'hh');
                    this.selectedMinutes = dateFormat(this.date[this.index], 'mm');
                    this.selectedSecond = dateFormat(this.date[this.index], 'ss');
                }else{
                    let nowDate = new Date();
                    this.selectedHours = dateFormat(nowDate, 'hh');
                    this.selectedMinutes = dateFormat(nowDate, 'mm');
                    this.selectedSecond = dateFormat(nowDate, 'ss');
                }
                console.log(this.date,'this.selectedHours')

                this.scrollToHours();
                this.scrollToMinutes();
                this.scrollToSecond();
            },
            selectHours(hhItem){
                this.selectedHours = hhItem.id;
                this.emitUpdateTime();
            },
            selectMinutes(mmItem){
                this.selectedMinutes = mmItem.id;
                this.emitUpdateTime();
            },
            selectSecond(ssItem){
                this.selectedSecond = ssItem.id;
                this.emitUpdateTime();
            },
            emitUpdateTime(){
                let date = new Date();
                if(this.date && this.date.length){
                    date = new Date(this.date[this.index]);
                }
                date.setHours(this.selectedHours);
                date.setMinutes(this.selectedMinutes);
                date.setSeconds(this.selectedSecond);
                date = dateFormat(date, this.format);
                if(this.date && this.date.length){
                    this.date.splice(this.index, 1, date);
                    this.$emit('update-time', this.date);
                }else{
                    this.$emit('update-time', [date]);
                }
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
        }
    }
</script>