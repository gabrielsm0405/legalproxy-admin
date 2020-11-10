<template>
  <v-card height="650">
    <CloseButton v-on:close="$emit('close')"></CloseButton>

    <v-card-title>{{title}}</v-card-title>

    <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation @keyup.native.enter="save_term">
            <v-row>
                <v-col sm="6" cols="12">
                    <v-text-field v-model="name" label="Nome" outlined required :rules="regraNaoVazio"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="author"
                        label="Autor"
                        outlined
                        required
                        :rules="regraNaoVazio"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row class="ml-1 mr-1">
                <v-textarea
                    outlined
                    v-model="content"
                    :rules="regraNaoVazio"
                    height="375"
                ></v-textarea>
            </v-row>

            <v-row justify="center">
                <v-btn color="primary" @click="save_term">Salvar</v-btn>
            </v-row>
        </v-form>

    </v-card-text>
  </v-card>
</template>

<script>
import CloseButton from './CloseButton'

export default {
  data: () => ({
    regraNaoVazio: [(v) => !!v || "Campo Obrigatório"],
    valid: true,
    name: "",
    author: "",
    content: ""
  }),
  components: {
    CloseButton
  },
  props: {
    term: Object,
    title: String,
    editing: Boolean
  },
  mounted() {
    if (this.editing) {
      this.name = this.term.name;
      this.author = this.term.author;
      this.content = this.term.content;
    }
  },
  methods: {
    save_term() {
      if (this.$refs.form.validate()) {
        /*var term_data = {
          'name': this.name,
          'author': this.author,
          'content': this.content
        }
        if(!this.editing){
          this.create_focal_point(focal_point_data)
        }
        else{
          this.update_focal_point({"focal_point_data": focal_point_data, "id": this.focal_point.id})
          this.$emit("close");
        }*/
      }
    },
  },
};
</script>