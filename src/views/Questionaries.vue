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

            <v-row v-if="questionnaires.length == 0" justify="center">
                <h2 style="color: gray">Você ainda não possui questionários</h2>
            </v-row>

            <v-col lg="8" sm="12">
                <v-list three-line>
                    <template v-for="(questionary, i) in questionnaires">
                        <v-card class="mb-2" width="100%" outlined elevation="2" :key="i">
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="headline text-break">
                                        {{questionary.name}}
                                    </v-list-item-title>

                                    <v-list-item-subtitle>
                                        <v-row class="ml-0"> Tipo: {{ questionary.type }} </v-row>
                                        <v-row class="ml-0"> {{questionary.questions.length}} perguntas</v-row>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn
                                        align="end"
                                        icon
                                        @click="open_edit_questionary_dialog=true, edit_questionary_data=JSON.parse(JSON.stringify(questionary))"
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
                        @click="edit_questionary_data={name:'', type:'Obrigatório', questions:[]}, open_new_questionary_dialog = true"
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
import QuestionaryForm from "../components/QuestionaryForm"
import ConfirmBox from "../components/ConfirmBox"

export default {
    data: () => ({
        questionnaires: [
            {
                name: "Questionário 1",
                type: "Obrigatório",
                link: "https://www.youtube.com/",
                text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                questions: [
                    {
                        id: 1,
                        statement: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                        alternatives: [
                            {
                                id: 1,
                                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                                right_answer: false
                            },
                            {
                                id: 2,
                                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                                right_answer: true
                            },
                            {
                                id: 3,
                                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                                right_answer: true
                            }
                        ]
                    }
                ]
            }
        ],
        open_edit_questionary_dialog: false,
        edit_questionary_data: {},
        open_new_questionary_dialog: false,
        open_delete_questionary_dialog: false,
        delete_questionary_data: {}
    }),
    components: {
        QuestionaryForm,
        ConfirmBox
    }
}
</script>