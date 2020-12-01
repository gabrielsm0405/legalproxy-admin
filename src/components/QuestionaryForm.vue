<template>
    <v-card>
        <CloseButton v-on:close="$emit('close')"></CloseButton>

        <v-card-title>{{title}}</v-card-title>

        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                    <v-col sm="8" cols="12">
                        <v-text-field
                            v-model="questionary.name"
                            label="Nome"
                            outlined
                            required
                            :rules="regraNaoVazio"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-radio-group v-model="questionary_type" row>
                            <v-radio value="Obrigatório">
                                <template v-slot:label>
                                    <small>Obrigatório</small>
                                </template>
                            </v-radio>

                            <v-radio value="Facultativo">
                                <template v-slot:label>
                                    <small>Facultativo</small>
                                </template>
                            </v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <v-row class="ml-1 mr-1">
                    <v-text-field
                        v-model="questionary.video"
                        label="Link para o video"
                        outlined
                    ></v-text-field>
                </v-row>

                <v-row class="ml-1 mr-1">
                    <v-textarea
                        v-model="questionary.text"
                        label="Texto"
                        outlined
                    ></v-textarea>
                </v-row>

                <v-toolbar flat>
                    <v-toolbar-title>Questões</v-toolbar-title>
                </v-toolbar>
                <v-list>
                    <template v-for="(question, i) in questionary.questions">
                        <v-card class="mb-2 pa-2" width="100%" outlined :key="i">
                            <v-list-item>
                                <v-list-item-content>
                                    <v-toolbar flat>
                                        <v-toolbar-title>Questão {{i+1}}</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-btn align="end" icon @click="delete_question_data={...question}, delete_question_number=i+1, open_delete_question_dialog=true">
                                            <v-icon medium color="primary">fa fa-trash-alt</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                    <v-row class="ma-0">
                                        <v-textarea
                                            outlined
                                            label="Enunciado"
                                            v-model="question.statement"
                                            :rules="regraNaoVazio"
                                        ></v-textarea>
                                    </v-row>
                                    <v-simple-table>
                                        <template v-slot:top>
                                            <v-toolbar flat>
                                                <v-toolbar-title>Alternativas</v-toolbar-title>
                                                <v-spacer></v-spacer>
                                                <v-btn 
                                                    color="primary" 
                                                    @click="question.alternatives.push({id: 1+(question.alternatives.length>0 ? Math.max.apply(Math, question.alternatives.map(function(o) { return o.id; })) : 0), content: '', right_answer: false})"
                                                >
                                                    Add Alternativa
                                                </v-btn>
                                            </v-toolbar>
                                        </template>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-left">
                                                        Alternativa
                                                    </th>
                                                    <th class="text-left">
                                                        Resposta correta
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr
                                                    v-for="(alternative, j) in question.alternatives"
                                                    :key="j"
                                                >
                                                    <td>
                                                        <v-text-field
                                                            v-model="alternative.content"
                                                            label="Alternativa"
                                                            outlined
                                                            required
                                                            :rules="regraNaoVazio"
                                                            class="mt-5"
                                                        ></v-text-field>
                                                    </td>

                                                    <td>
                                                        <v-checkbox
                                                            v-model="alternative.right_answer"
                                                        ></v-checkbox>
                                                    </td>

                                                    <td>
                                                        <v-btn
                                                            align="end"
                                                            icon
                                                            @click="delete_alternative_data={...alternative}, delete_question_data={...question}, delete_alternative_number=j+1, open_delete_alternative_dialog=true"
                                                        >
                                                            <v-icon medium color="primary">fa fa-trash-alt</v-icon>
                                                        </v-btn>                    
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </template>
                </v-list>
                <v-row justify="center">
                    <v-btn
                        color="primary" 
                        @click="questionary.questions.push({id: 1+(questionary.questions.length>0 ? Math.max.apply(Math, questionary.questions.map(function(o) { return o.id; })) : 0), statement: '', alternatives: []})"
                    >Add Questão</v-btn>
                </v-row>
            </v-form>
        </v-card-text>

        <!-- Box de exclusão de questão -->
        <v-dialog v-model="open_delete_question_dialog" max-width="500">
            <ConfirmBox
                :title="'Deletar questão ' + delete_question_number + '?'"
                v-if="open_delete_question_dialog"
                v-on:yes="questionary.questions.splice(questionary.questions.map(function(item) {return item.id;}).indexOf(delete_question_data.id), 1), open_delete_question_dialog = false"
                v-on:cancel="open_delete_question_dialog = false"
            ></ConfirmBox>
        </v-dialog>

        <!-- Box de exclusão de alternativa -->
        <v-dialog v-model="open_delete_alternative_dialog" max-width="500">
            <ConfirmBox
                :title="'Deletar alternativa ' + delete_alternative_number + '?'"
                v-if="open_delete_alternative_dialog"
                v-on:yes="delete_alternative"
                v-on:cancel="open_delete_alternative_dialog = false"
            ></ConfirmBox>
        </v-dialog>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
                color="primary" 
                @click="questionary.mandatory = questionary_type=='Obrigatório', questionary.questions = JSON.stringify(questionary.questions), $emit('new_questionary', questionary)"
            >Salvar</v-btn>
            <v-btn color="red white--text" @click="$emit('close')">Cancelar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import CloseButton from "./CloseButton";
import ConfirmBox from "./ConfirmBox"

export default {
    data: () => ({
        valid: true,
        regraNaoVazio: [(v) => !!v || "Campo Obrigatório"],
        open_delete_question_dialog: false,
        delete_question_number: null,
        delete_question_data: {},
        delete_alternative_data: {},
        delete_alternative_number: null,
        open_delete_alternative_dialog: false,
        questionary_type: 'Obrigatório'
    }),
    props: {
        title: String,
        questionary: Object
    },
    components: {
        CloseButton,
        ConfirmBox
    },
    mounted(){
        this.questionary.questions = JSON.parse(this.questionary.questions)
    },
    methods: {
        delete_alternative(){
            var question = this.questionary.questions.find(element => element.id == this.delete_question_data.id)
            question.alternatives.splice(question.alternatives.map(function(item) {return item.id;}).indexOf(this.delete_alternative_data.id), 1)

            this.open_delete_alternative_dialog = false
        }
    }
}
</script>