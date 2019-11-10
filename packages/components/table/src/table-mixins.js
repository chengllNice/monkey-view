
export default {
    methods: {
        setColWidth(column){
            let width = '';
            if(this.columnsWidth[column.__id]){
                width = this.columnsWidth[column.__id].width;
            }
            return width;
        }
    }
}
