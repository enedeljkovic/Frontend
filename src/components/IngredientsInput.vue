<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="ingredient"
            label="Unesite sastojak"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" @click="addIngredient">
            Dodaj
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-list>
            <v-list-item
              v-for="(item, index) in ingredients"
              :key="index"
            >
              <v-list-item-content>
                {{ item }}
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  icon
                  @click="removeIngredient(index)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ingredient: "",
        ingredients: [],
      };
    },
    methods: {
      addIngredient() {
        if (this.ingredient.trim() !== "") {
          this.ingredients.push(this.ingredient.trim());
          this.ingredient = "";
        }
      },
      removeIngredient(index) {
        this.ingredients.splice(index, 1);
      },
    },
  };
  </script>
  