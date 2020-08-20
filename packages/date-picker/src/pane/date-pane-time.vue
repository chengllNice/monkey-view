<template>
    <div :class="[
            `${classPrefix}`,
            !showSsCol && `${classPrefix}--no-show-ss`,
         ]">
        <div :class="[`${classPrefix}__hh`]">
            <scroll size="small" ref="hhScroll">
                <div :class="[`${classPrefix}__hh-inner`]">
                    <template v-for="hhItem in hhData">
                        <div v-if="!(picker.hideDisabledOptions && picker.disabledHours.includes(parseInt(hhItem.id)))"
                             :class="[
                                 `${classPrefixItem}__col`,
                                 !(hhItem.id === selectedHours) && !(picker.disabledHours && picker.disabledHours.includes(parseInt(hhItem.id))) && `${classPrefixItem}__hover`,
                                 !hhItem.visibility && `${classPrefix}__hide`,
                                 hhItem.id === selectedHours && `${classPrefixItem}__selected`,
                                 picker.disabledHours && picker.disabledHours.includes(parseInt(hhItem.id)) && `${classPrefixItem}__disabled`,
                             ]"
                             :key="hhItem.id"
                             @click="selectHours(hhItem)"><em>{{hhItem.name}}</em></div>
                    </template>
                </div>
            </scroll>
        </div>
        <div :class="[`${classPrefix}__mm`]">
            <scroll size="small" ref="mmScroll">
                <div :class="[`${classPrefix}__mm-inner`]">
                    <template v-for="mmItem in mmData">
                        <div v-if="!(picker.hideDisabledOptions && picker.disabledMinutes.includes(parseInt(mmItem.id)))"
                             :class="[
                                 `${classPrefixItem}__col`,
                                 !(mmItem.id === selectedMinutes) && !(picker.disabledMinutes && picker.disabledMinutes.includes(parseInt(mmItem.id))) && `${classPrefixItem}__hover`,
                                 !mmItem.visibility && `${classPrefix}__hide`,
                                 mmItem.id === selectedMinutes && `${classPrefixItem}__selected`,
                                 picker.disabledMinutes && picker.disabledMinutes.includes(parseInt(mmItem.id)) && `${classPrefixItem}__disabled`,
                             ]"
                             :key="mmItem.id"
                             @click="selectMinutes(mmItem)"><em>{{mmItem.name}}</em></div>
                    </template>
                </div>
            </scroll>
        </div>
        <div :class="[`${classPrefix}__ss`]" v-if="showSsCol">
            <scroll size="small" ref="ssScroll">
                <div :class="[`${classPrefix}__ss-inner`]">
                    <template v-for="ssItem in ssData">
                        <div v-if="!(picker.hideDisabledOptions && picker.disabledSeconds.includes(parseInt(ssItem.id)))"
                             :class="[
                                 `${classPrefixItem}__col`,
                                 !(ssItem.id === selectedSecond) && !(picker.disabledSeconds && picker.disabledSeconds.includes(parseInt(ssItem.id))) && `${classPrefixItem}__hover`,
                                 !ssItem.visibility && `${classPrefix}__hide`,
                                 ssItem.id === selectedSecond && `${classPrefixItem}__selected`,
                                 picker.disabledSeconds && picker.disabledSeconds.includes(parseInt(ssItem.id)) && `${classPrefixItem}__disabled`,
                             ]"
                             :key="ssItem.id"
                             @click="selectSecond(ssItem)"><em>{{ssItem.name}}</em></div>
                    </template>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
    import Config from 'main/config/config'
    import Scroll from 'packages/scroll'
    import {zero} from "main/utils/date";

    export default {
        name: "DatePaneTime",
        inject: ['picker'],
        props: {
            type: String,
            year: Number,
            month: Number,
            date: {
                type: Array,
                default() {
                    return []
                }
            },
            currentDate: Object,
            isRange: Boolean,
            hoverDate: Date,
            index: Number,
        },
        data(){
            let nowDate = new Date();
            nowDate.setHours(0);
            nowDate.setMinutes(0);
            nowDate.setSeconds(0);
            return {
                classPrefix: Config.classPrefix + '-date-pane-time',
                classPrefixItem: Config.classPrefix + '-date-pane-item',
                hhData: [],
                mmData: [],
                ssData: [],
                selectedHours: null,
                selectedMinutes: null,
                selectedSecond: null,
                hideNum: 8,
                defaultHours: null,
                defaultMinutes: null,
                defaultSecond: null,
                nowDate: nowDate
            }
        },
        computed: {
            showSsCol(){
                return this.picker.formatType ? this.picker.formatType.includes('ss') : this.picker.valueFormat.includes('ss')
            }
        },
        components: {
            Scroll
        },
        mounted(){
            this.initData();
            this.$nextTick(()=>{
                this.getSelected();
            })
        },
        methods: {
            initData(){
                if(this.hhData.length && this.mmData.length && this.ssData.length) return;
                this.hhData = [];
                this.mmData = [];
                this.ssData = [];
                this.defaultHours = null;
                this.defaultMinutes = null;
                this.defaultSecond = null;
                for (let i = 0; i < 24 + this.hideNum; i++){
                    if(this.picker && this.picker.disabledHours && !this.picker.disabledHours.includes(i) && this.defaultHours === null){
                        this.defaultHours = i;
                    }
                    this.hhData.push({
                        id: i,
                        name: zero(i.toString()),
                        visibility: i < 24,
                    });
                }
                for (let i = 0; i < 60  + this.hideNum; i++){
                    if(this.picker && this.picker.disabledMinutes && !this.picker.disabledMinutes.includes(i) && this.defaultMinutes === null){
                        this.defaultMinutes = i;
                    }
                    if(this.picker && this.picker.disabledSeconds && !this.picker.disabledSeconds.includes(i) && !this.defaultSecond === null){
                        this.defaultSecond = i;
                    }
                    this.mmData.push({
                        id: i,
                        name: zero(i.toString()),
                        visibility: i < 60,
                    });
                    this.ssData.push({
                        id: i,
                        name: zero(i.toString()),
                        visibility: i < 60,
                    });
                }
            },
            setNowDate(){
                this.nowDate.setHours(this.defaultHours || 0);
                this.nowDate.setMinutes(this.defaultMinutes || 0);
                this.nowDate.setSeconds(this.defaultSecond || 0);
            },
            getSelected(){
                this.selectedHours = null;
                this.selectedMinutes = null;
                this.selectedSecond = null;
                this.setNowDate();
                let date = this.nowDate;
                if(this.date[this.index]){
                    date = this.date[this.index];

                    this.selectedHours = date.getHours();
                    this.selectedMinutes = date.getMinutes();
                    this.selectedSecond = date.getSeconds();
                }
                this.scrollToHours();
                this.scrollToMinutes();
                this.scrollToSecond();
            },
            selectHours(hhItem){
                let disabledHours = this.picker.disabledHours;
                disabledHours = disabledHours ? disabledHours.map(item => parseInt(item)) : null;
                if(disabledHours && disabledHours.includes(hhItem.id)) return;
                this.selectedHours = hhItem.id;
                this.emitUpdateTime();
            },
            selectMinutes(mmItem){
                let disabledMinutes = this.picker.disabledMinutes;
                disabledMinutes = disabledMinutes ? disabledMinutes.map(item => parseInt(item)) : null;
                if(disabledMinutes && disabledMinutes.includes(mmItem.id)) return;
                this.selectedMinutes = mmItem.id;
                this.emitUpdateTime();
            },
            selectSecond(ssItem){
                let disabledSeconds = this.picker.disabledSeconds;
                disabledSeconds = disabledSeconds ? disabledSeconds.map(item => parseInt(item)) : null;
                if(disabledSeconds && disabledSeconds.includes(ssItem.id)) return;
                this.selectedSecond = ssItem.id;
                this.emitUpdateTime();
            },
            emitUpdateTime(){
                let date = new Date(this.nowDate);
                if(this.date[this.index]) date = new Date(this.date[this.index]);

                date.setHours(this.selectedHours || this.defaultHours);
                date.setMinutes(this.selectedMinutes || this.defaultMinutes);
                date.setSeconds(this.selectedSecond || this.defaultSecond);
                this.$emit('update-time', [date]);
            },
            scrollToHours(){
                let y = 0;
                let scrollLen = this.selectedHours;
                let totalLen = 23;
                if(this.picker.disabledHours && this.picker.hideDisabledOptions){
                    let filter = this.picker.disabledHours.filter(item => parseInt(item) < this.selectedHours)
                    scrollLen = scrollLen - filter.length;
                    totalLen = totalLen - this.picker.disabledHours.length;
                }
                if(this.selectedHours) y = scrollLen / totalLen * 100 + '%';
                this.$nextTick(()=>{
                    this.$refs.hhScroll && this.$refs.hhScroll.scrollTo({
                        x: 0,
                        y: y
                    }, 200);
                })
            },
            scrollToMinutes(){
                let y = 0;
                let scrollLen = this.selectedMinutes;
                let totalLen = 59;
                if(this.picker.disabledMinutes && this.picker.hideDisabledOptions){
                    let filter = this.picker.disabledMinutes.filter(item => parseInt(item) < this.selectedMinutes)
                    scrollLen = scrollLen - filter.length;
                    totalLen = totalLen - this.picker.disabledMinutes.length;
                }
                if(this.selectedMinutes) y = scrollLen / totalLen * 100 + '%';
                this.$nextTick(()=>{
                    this.$refs.mmScroll && this.$refs.mmScroll.scrollTo({
                        x: 0,
                        y: y
                    }, 200);
                })
            },
            scrollToSecond(){
                let y = 0;
                let scrollLen = this.selectedSecond;
                let totalLen = 59;
                if(this.picker.disabledSeconds && this.picker.hideDisabledOptions){
                    let filter = this.picker.disabledSeconds.filter(item => parseInt(item) < this.selectedSecond)
                    scrollLen = scrollLen - filter.length;
                    totalLen = totalLen - this.picker.disabledSeconds.length;
                }
                if(this.selectedSecond) y = scrollLen / totalLen * 100 + '%';
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
                this.getSelected()
            },
            type(){
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
