import Elements from '@/services/api/elements'
import Categories from '@/services/api/categories'
import Recipes from '@/services/api/recipes'
import Account from '@/services/api/account'
import Users from '@/services/api/users'
import Stats from '@/services/api/stats'

export default {
  async getElements({ commit }) {
    commit('LOADING_START', 'elements')
    commit('SET_METHOD', { object: 'elements', method: 'GET' })
    await Elements.get()
      .then(response => {
        commit('SET_ELEMENTS', response.data.response)
        this.totalRows = response.data.response.length // Total rows for pagination
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'elemenets', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'elements', method: '' })
        commit('LOADING_END', 'elements')
      })
  },
  async postElement({ commit }, element) {
    commit('LOADING_START', 'elements')
    commit('SET_METHOD', { object: 'elements', method: 'POST' })
    await Elements.add(element.name, element.category._id)
      .then(() => {
        commit('ADD_ELEMENT', {
          _id: element._id,
          name: element.name,
          category: element.category.name
        })
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'elemenets', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'elements', method: '' })
        commit('LOADING_END', 'elements')
      })
  },
  async putElement({ commit }, element) {
    commit('LOADING_START', 'elements')
    commit('SET_METHOD', { object: 'elements', method: 'PUT' })
    await Elements.update(element._id, element.name, element.description, element.category._id)
      .then(() => {
        commit('EDIT_ELEMENT', {
          _id: element._id,
          category: element.category.name,
          name: element.name,
          description: element.description
        })
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'elemenets', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'elements', method: '' })
        commit('LOADING_END', 'elements')
      })
  },
  async deleteElement({ commit }, element) {
    commit('LOADING_START', 'elements')
    commit('SET_METHOD', { object: 'elements', method: 'DELETE' })
    await Elements.delete(element._id)
      .then(() => {
        commit('DELETE_ELEMENT', element)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'elements', error: error })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'elements', method: '' })
        commit('LOADING_END', 'elements')
      })
  },

  async getCategories({ commit }) {
    commit('LOADING_START', 'categories')
    commit('SET_METHOD', { object: 'categories', method: 'GET' })
    await Categories.get()
      .then(response => {
        commit('SET_CATEGORIES', response.data.response)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'categories', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'categories', method: '' })
        commit('LOADING_END', 'categories')
      })
  },
  async postCategory({ commit }, category) {
    commit('LOADING_START', 'categories')
    commit('SET_METHOD', { object: 'categories', method: 'POST' })
    await Categories.add(category.name)
      .then(response => {
        commit('ADD_CATEGORY', {
          _id: response.data.response._id,
          name: response.data.response.name
        })
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'categories', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'categories', method: '' })
        commit('LOADING_END', 'categories')
      })
  },
  async putCategory({ commit }, category) {
    commit('LOADING_START', 'categories')
    commit('SET_METHOD', { object: 'categories', method: 'PUT' })
    await Categories.update(category.name, category._id)
      .then(() => {
        commit('EDIT_CATEGORY', {
          _id: category._id,
          elements: category.elements,
          name: category.name
        })
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'categories', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'categories', method: '' })
        commit('LOADING_END', 'categories')
      })
  },
  async deleteCategory({ commit }, category) {
    commit('LOADING_START', 'categories')
    commit('SET_METHOD', { object: 'categories', method: 'DELETE' })
    await Categories.delete(category)
      .then(() => {
        commit('DELETE_CATEGORY', category)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'categories', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'categories', method: '' })
        commit('LOADING_END', 'categories')
      })
  },

  async getRecipes({ commit }) {
    commit('LOADING_START', 'recipes')
    commit('SET_METHOD', { object: 'recipes', method: 'GET' })
    await Recipes.get()
      .then(response => {
        commit('SET_RECIPES', response.data.response)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'recipes', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'recipes', method: '' })
        commit('LOADING_END', 'recipes')
      })
  },
  async postRecipe({ commit }, recipe) {
    commit('LOADING_START', 'recipes')
    commit('SET_METHOD', { object: 'recipes', method: 'POST' })
    await Recipes.add([recipe.firstElement._id, recipe.secondElement._id], recipe.result._id)
      .then(response => {
        commit('ADD_RECIPE', {
          _id: response.data.response._id,
          recipe: [recipe.firstElement, recipe.secondElement],
          result: recipe.result
        })
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'recipes', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'recipes', method: '' })
        commit('LOADING_END', 'recipes')
      })
  },
  async putRecipe({ commit }, recipe) {
    commit('LOADING_START', 'recipes')
    commit('SET_METHOD', { object: 'recipes', method: 'PUT' })
    await Recipes.update([recipe.firstElement._id, recipe.secondElement._id], recipe.result._id, recipe._id)
      .then(() => {
        commit('EDIT_RECIPE', {
          _id: recipe._id,
          recipe: [recipe.firstElement, recipe.secondElement],
          result: recipe.result
        })
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'recipes', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'recipes', method: '' })
        commit('LOADING_END', 'recipes')
      })
  },
  async deleteRecipe({ commit }, recipe) {
    commit('LOADING_START', 'recipes')
    commit('SET_METHOD', { object: 'recipes', method: 'DELETE' })
    await Recipes.delete(recipe._id)
      .then(() => {
        commit('DELETE_RECIPE', recipe)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'recipes', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'recipes', method: '' })
        commit('LOADING_END', 'recipes')
      })
  },

  async getUsers({ commit }) {
    commit('LOADING_START', 'users')
    commit('SET_METHOD', { object: 'users', method: 'GET' })
    await Users.get()
      .then(response => {
        commit('SET_USERS', response.data.response)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'users', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'users', method: '' })
        commit('LOADING_END', 'users')
      })
  },
  async putUser({ commit }, user) {
    commit('LOADING_START', 'users')
    commit('SET_METHOD', { object: 'users', method: 'PUT' })
    await Account.update(user._id, user.password, user.username, user.role)
      .then(() => {
        commit('EDIT_USER', {
          _id: user._id,
          password: user.password,
          username: user.username,
          role: user.role
        })
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'users', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'users', method: '' })
        commit('LOADING_END', 'users')
      })
  },

  async getStats({ commit }) {
    commit('LOADING_START', 'stats')
    commit('SET_METHOD', { object: 'stats', method: 'GET' })
    await Stats.get()
      .then(response => {
        commit('SET_STATS', response.data)
      })
      .catch(error => {
        commit('SET_ERROR', { object: 'stats', error: error.data })
      })
      .finally(() => {
        commit('SET_METHOD', { object: 'stats', method: '' })
        commit('LOADING_END', 'stats')
      })
  }
}
