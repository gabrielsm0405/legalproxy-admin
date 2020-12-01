<template>
    <v-container fluid>
        <v-card flat>
            <!-- Título -->
            <v-col sm="6" cols="12">
                <v-row justify="start" class="ml-5">
                <h1>Questionários</h1>
                </v-row>
                <v-divider></v-divider>
            </v-col>

            <v-row v-if="questionaries.length == 0" justify="center">
                <h2 style="color: gray">Você ainda não possui questionários</h2>
            </v-row>

            <v-col lg="8" sm="12">
                <v-list three-line>
                    <template v-for="(questionary, i) in questionaries">
                        <v-card class="mb-2" width="100%" outlined elevation="2" :key="i">
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="headline text-break">
                                        {{questionary.name}}
                                    </v-list-item-title>

                                    <v-list-item-subtitle>
                                        <v-row class="ml-0"> Tipo: {{ questionary.mandatory==true?'Obrigatório':'Facultativo' }} </v-row>
                                        <v-row class="ml-0"> {{JSON.parse(questionary.questions).length}} perguntas</v-row>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn
                                        align="end"
                                        icon
                                        @click="edit_questionary(questionary)"
                                    >
                                        <v-icon medium color="primary">fa fa-edit</v-icon>
                                    </v-btn>
                                    <v-btn
                                        align="end"
                                        icon
                                        @click="delete_questionary_data=questionary, open_delete_questionary_dialog=true"
                                    >
                                        <v-icon medium color="primary">fa fa-trash-alt</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-card>
                    </template>
                </v-list>
            </v-col>

            <!-- Box de edição de questionário -->
            <v-dialog v-model="open_edit_questionary_dialog" max-width="1000">
                <QuestionaryForm
                    v-if="open_edit_questionary_dialog"
                    v-on:close="open_edit_questionary_dialog = false"
                    title="Editar Questionário"
                    :questionary="edit_questionary_data"
                ></QuestionaryForm>
            </v-dialog>

            <!-- Box de criação de questionário -->
            <v-dialog v-model="open_new_questionary_dialog" max-width="1000">
                <QuestionaryForm
                    v-if="open_new_questionary_dialog"
                    v-on:close="open_new_questionary_dialog = false"
                    title="Criar Questionário"
                    :questionary="edit_questionary_data"
                    v-on:new_questionary="new_questionary($event), open_new_questionary_dialog=false"
                ></QuestionaryForm>
            </v-dialog>

            <!-- Box de exclusão de questionário -->
            <v-dialog v-model="open_delete_questionary_dialog" max-width="500">
                <ConfirmBox
                    :title="'Deletar ' + delete_questionary_data.name + '?'"
                    v-if="open_delete_questionary_dialog"
                    v-on:cancel="open_delete_questionary_dialog = false"
                ></ConfirmBox>
                <!--v-on:yes="erase_company"-->
            </v-dialog>

            <!-- Floating Button para novo questionário -->
            <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        large
                        dark
                        fab
                        bottom
                        right
                        fixed
                        color="primary"
                        @click="edit_questionary_data={name:'', mandatory: true, questions:'[]'}, open_new_questionary_dialog = true"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>fa fa-plus</v-icon>
                    </v-btn>
                </template>
                <span>Adicionar questionário</span>
            </v-tooltip>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import QuestionaryForm from "../components/QuestionaryForm"
import ConfirmBox from "../components/ConfirmBox"
import lodash from "lodash"

export default {
    data: () => ({
        open_edit_questionary_dialog: false,
        edit_questionary_data: {},
        open_new_questionary_dialog: false,
        open_delete_questionary_dialog: false,
        delete_questionary_data: {}
    }),
    components: {
        QuestionaryForm,
        ConfirmBox
    },
    computed: {
        ...mapState('questionaries', ['questionaries', 'questionary_added']),
    },
    methods: {
        ...mapActions("questionaries", ["get_questionaries", "new_questionary"]),
        edit_questionary(questionary){
            this.edit_questionary_data = lodash.cloneDeep(questionary)
            
            this.open_edit_questionary_dialog=true
        }
    },
    watch: {
        questionary_added(){
            this.get_questionaries()
        }
    },
    mounted(){
        this.get_questionaries()
    }
}
</script>