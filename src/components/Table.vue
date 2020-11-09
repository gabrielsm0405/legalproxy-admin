<template>
    <v-card flat>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :show-select="!demonstrating"
            item-key="id"
            :footer-props="{
                'items-per-page-text': 'Linhas por página',
                'items-per-page-all-text': 'Todos'
            }"
        >
            <template v-slot:top v-if="!demonstrating">
                <v-row justify="end" class="mr-5 mt-2">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on">
                                Ações
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                                :disabled="selected.length == 0"
                                @click="confirm_box_title='Desativar selecionados?', open_confirm_action_dialog=true"
                            >
                                <v-list-item-title>Desativar</v-list-item-title>
                            </v-list-item>
                            <v-list-item
                                :disabled="selected.length == 0"
                                @click="confirm_box_title='Excluir selecionados?', open_confirm_action_dialog=true"
                            >
                                <v-list-item-title>Excluir</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-row>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="go_to_item(item)" v-if="type=='user'">
                    fas fa-user
                </v-icon>
                <v-icon small class="mr-2" @click="go_to_item(item)" v-if="type=='company'">
                    fas fa-building
                </v-icon>
                <v-icon small class="mr-2" @click="go_to_item(item)" v-if="type=='hearing'">
                    fas fa-balance-scale
                </v-icon>
            </template>
        </v-data-table>

        <!--Box de confirmação de ação-->
        <v-dialog v-model="open_confirm_action_dialog" max-width="500">
            <ConfirmBox
                :title="confirm_box_title"
                v-if="open_confirm_action_dialog"
                v-on:cancel="open_confirm_action_dialog = false"
            ></ConfirmBox>
            <!--v-on:yes="erase_company"-->
        </v-dialog>
    </v-card>
</template>

<script>
import ConfirmBox from './ConfirmBox'

export default {
    name: 'AdminTable',
    data: () => ({
        open_confirm_action_dialog: false,
        confirm_box_title: String,
        selected: [],
        headers: [],
        items: []
    }),
    props: {
        type: String,
        demonstrating: Boolean
    },
    components: {
        ConfirmBox
    },
    mounted(){
        if(this.type == 'user'){
            this.headers = [
                { text: 'ID', value: 'id', sortable: false },
                { text: 'Nome', value: 'name', sortable: false },
                { text: 'CPF', value: 'cpf', sortable: false },
                { text: 'Email', value: 'email', sortable: false },
                { text: 'Quantidade de audiências', value: 'qtd_hearings' },
                { text: 'Quantidade de empresas', value: 'qtd_companies' }
            ]
            if(!this.demonstrating){
                this.headers.push({ text: 'Ponto Focal', value: 'focal_point', sortable: false })
            }
            this.headers.push({ text: '', value: 'actions', sortable: false })

            this.items = [
                {
                    id: 1,
                    name: 'Gabriel Souza Marques',
                    cpf: '061.590.555-26',
                    email: 'gabriel3@email.com',
                    focal_point: true,
                    qtd_hearings: 20,
                    qtd_companies: 5,
                },
                {
                    id: 2,
                    name: 'Allan Rivalles',
                    cpf: '999.999.999-99',
                    email: 'allan@email.com',
                    focal_point: false,
                    qtd_hearings: 40,
                    qtd_companies: 6,
                },
                {
                    id: 3,
                    name: 'Felipe Garcia',
                    cpf: '888.888.888-88',
                    email: 'felipe@email.com',
                    focal_point: false,
                    qtd_hearings: 35,
                    qtd_companies: 6,
                },
            ]
        }
        else if(this.type == 'company'){
            this.headers = [
                { text: 'ID', value: 'id', sortable: false },
                { text: 'Nome', value: 'name', sortable: false },
                { text: 'CNPJ', value: 'cnpj', sortable: false },
                { text: 'Quantidade de Clientes', value: 'qtd_clients' },
                { text: '', value: 'actions', sortable: false }
            ]

            this.items = [
                {
                    id: 1,
                    name: 'Dell',
                    cnpj: '72.381.189/0010-01',
                    qtd_clients: 2
                },
                {
                    id: 2,
                    name: 'Ifood',
                    cnpj: '72.381.189/0010-01',
                    qtd_clients: 2
                },
                {
                    id: 3,
                    name: 'Nubank',
                    cnpj: '72.381.189/0010-01',
                    qtd_clients: 2
                }
            ]
        }
        else if(this.type == 'hearing'){
            this.headers = [
                { text: 'ID', value: 'id', sortable: false },
                { text: 'Tipo', value: 'type', sortable: false },
                { text: 'Empresa', value: 'company', sortable: false },
                { text: 'Esfera', value: 'esfera', sortable: false },
                { text: 'Tribunal', value: 'tribunal', sortable: false },
                { text: 'Comarca', value: 'comarca', sortable: false },
                { text: 'Foro', value: 'foro', sortable: false },
                { text: 'Vara', value: 'vara', sortable: false },
                { text: 'Online', value: 'online', sortable: false },
                { text: 'Data', value: 'date' },
                { text: 'Status', value: 'status', sortable: false },
                { text: '', value: 'actions', sortable: false }
            ]

            this.items = [
                {
                    id: 1,
                    type: 'Conciliação',
                    company: 'AMD',
                    esfera: 'Cível',
                    tribunal: 'TJSP',
                    comarca: 'São Paulo',
                    foro: 'Default',
                    vara: '1 VARA DO JUIZADO ESPECIAL CÍVEL CENTRAL',
                    online: true,
                    date: '30/11/2020',
                    status: 0
                },
                {
                    id: 2,
                    type: 'Conciliação',
                    company: 'Ifood',
                    esfera: 'Cível',
                    tribunal: 'TJSP',
                    comarca: 'São Paulo',
                    foro: 'Default',
                    vara: '1 VARA DO JUIZADO ESPECIAL CÍVEL CENTRAL',
                    online: false,
                    date: '21/10/2020',
                    status: 5
                },
                {
                    id: 3,
                    type: 'Conciliação',
                    company: 'Intel',
                    esfera: 'Cível',
                    tribunal: 'TJSP',
                    comarca: 'São Paulo',
                    foro: 'Default',
                    vara: '1 VARA DO JUIZADO ESPECIAL CÍVEL CENTRAL',
                    online: false,
                    date: '02/10/2020',
                    status: 5
                }
            ]
        }
    },
    methods: {
        go_to_item(item){
            if(this.type=='user'){
                this.$router.push({ name: 'UserDetails', params:{id: item.id} })
            }
            else if(this.type=='company'){
                this.$router.push({ name: 'CompanyDetails', params:{id: item.id} })
            }
            else if(this.type=='hearing'){
                this.$router.push({ name: 'HearingDetails', params:{id: item.id} })
            }
        }
    }
}
</script>