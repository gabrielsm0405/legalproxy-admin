<template>
    <div>
        <v-menu
            v-if="type == 'day month year'"
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="dateFormatted"
                    :label="label"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    :rules="non_empty_rule"
                ></v-text-field>
            </template>
            <v-date-picker locale="PT" v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
        </v-menu>
        
        <v-menu
            v-if="type == 'month year'"
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="dateFormatted"
                    label="Data de vencimento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    :disabled="disabled"
                    :rules="non_empty_rule"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                type="month"
                no-title
                scrollable
                locale="PT"
            >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date)"
                >
                    OK
                </v-btn>
            </v-date-picker>
        </v-menu>
    </div>
</template>

<script>
export default {
    data: () => ({
        date: '',
        dateFormatted: '',
        menu: false,
        non_empty_rule: [
            v => !!v || 'Campo Obrigatório'
        ],
    }),
    props: {
        input_date: String,
        label: String,
        type: String,
        disabled: Boolean
    },
    watch: {
        input_date(){
            this.update_date()
        },
        date(){
            this.format_date()
            this.$emit('change_date', this.date)
        }
    },
    mounted(){
        this.update_date()
    },
    methods: {
        update_date(){
            if(this.input_date != null){
                this.date = this.input_date
            }
        },
        format_date(){
            if(this.date){
                if(this.type == "day month year"){
                    const [year, month, day] = this.date.split('-')
                    this.dateFormatted = `${day}/${month}/${year}`
                }
                else if(this.type == 'month year'){
                    const [year, month] = this.date.split('-')
                    this.dateFormatted = `${month}/${year}`
                }
            }
            else{
                this.dateFormatted = ''
            }
        }
    }
}
</script>