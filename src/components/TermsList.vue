<template>
    <v-card class="scroll" height="500">
        <v-col sm="3" cols="12">
            <v-row justify="start" class="ml-5">
                <h5>{{title}}</h5>
            </v-row>
            <v-divider></v-divider>
        </v-col>

        <v-btn absolute top right color="primary" :style="{zIndex:5}">
            APLICAR
        </v-btn>

        <v-list>
            <v-list-item-group v-model="selected">
                <template v-for="(term, i) in terms">
                    <div :key="i">
                        <v-row align="center" class="mr-1">
                            <v-card class="mb-2 pa-2" width="90%" flat>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>{{term.name}}</v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-row>
                                            <v-icon v-if="term.selected">
                                                fas fa-check-circle
                                            </v-icon>
                                        </v-row>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-card>
                            <v-btn icon @click="edit_term=term, open_edit_term_box=true">
                                <v-icon>fas fa-edit</v-icon>
                            </v-btn>
                            <v-btn icon @click="edit_term=term, open_confirm_delete_dialog=true">
                                <v-icon>fas fa-trash-alt</v-icon>
                            </v-btn>
                        </v-row>
                        <v-divider></v-divider>
                    </div>
                </template>
            </v-list-item-group>
        </v-list>

        <v-row justify="center">
            <v-btn fab dark small color="primary" @click="open_create_term_box=true">
                <v-icon>fa fa-plus</v-icon>
            </v-btn>
        </v-row>

        <!-- Box de criação de termo -->
        <v-dialog v-model="open_create_term_box" max-width="800">
            <TermForm
                v-if="open_create_term_box"
                v-on:close="open_create_term_box=false"
                :editing="false"
                title="Novo termo"
            ></TermForm>
        </v-dialog>

        <!-- Box de edição de termo -->
        <v-dialog v-model="open_edit_term_box" max-width="800">
            <TermForm
                v-if="open_edit_term_box"
                v-on:close="open_edit_term_box=false"
                :editing="true"
                title="Editar termo"
                :term="edit_term"
            ></TermForm>
        </v-dialog>

        <!-- Box de confirmação de exclusão do termo -->
        <v-dialog v-model="open_confirm_delete_dialog" max-width="500">
            <ConfirmBox
                :title="'Excluir '+edit_term.name+'?'"
                v-if="open_confirm_delete_dialog"
                v-on:cancel="open_confirm_delete_dialog = false"
            ></ConfirmBox>
            <!--v-on:yes="erase_company"-->
        </v-dialog>
    </v-card>
</template>

<script>
import TermForm from './TermForm'
import ConfirmBox from './ConfirmBox'

export default {
    data: () => ({
        selected: [],
        open_create_term_box: false,
        open_edit_term_box: false,
        edit_term: {},
        open_confirm_delete_dialog: false
    }),
    props: {
        terms: Array,
        title: String
    },
    components: {
        TermForm,
        ConfirmBox
    },
    watch: {
        selected(){
            this.terms.forEach(term => {
                term.selected = false
            })

            if(this.selected >= 0){
                this.terms[this.selected].selected = true
            }
        }
    }
}
</script>