<template>
  <section class="section-game">
    <section class="section-categories">
      <CategoriesList />
    </section>

    <section class="section-game-board">
      <ActiveElement v-for="element in activeElements" :key="element.gameId" :element-data="element" />
      <div class="control-panel">
        <ActiveElementsHistory v-show="history.last.firstElement" />
        <ClearGameField />
      </div>
    </section>

    <section class="section-opened-elements">
      <OpenedElementsList>
        <OpenedElement v-for="element in filteredByOpenedElements" :key="element._id" :element-data="element" />
      </OpenedElementsList>
    </section>

    <NewElementModal />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ActiveElement from '@/components/game/elements/ActiveElement.vue'
import OpenedElement from '@/components/game/elements/OpenedElement.vue'
import ClearGameField from '@/components/game/ClearGameField.vue'
import CategoriesList from '@/components/game/categories/CategoriesList.vue'
import OpenedElementsList from '@/components/game/elements/OpenedElementsList.vue'
import ActiveElementsHistory from '@/components/game/elements/ActiveElementsHistory.vue'
import NewElementModal from '@/components/game/elements/NewElementModal.vue'

export default {
  name: 'Game',
  components: {
    ActiveElement,
    OpenedElement,
    CategoriesList,
    OpenedElementsList,
    ClearGameField,
    ActiveElementsHistory,
    NewElementModal
  },
  computed: {
    ...mapGetters({
      openedElements: 'elements/openedElements',
      activeElements: 'elements/activeElements',
      openedCategories: 'categories/openedCategories',
      recipes: 'recipes/recipes',
      selectedCategory: 'categories/selectedCategory',
      history: 'game/history'
    }),
    filteredByOpenedElements() {
      return this.openedElements.filter(openedElement => {
        return openedElement.show === true
      })
    }
  },
  mounted() {
    const gameField = document.getElementsByClassName('section-game-board')
    const gameFieldSizeListener = this.setGameFieldSize(gameField)

    window.addEventListener('resize', () => {
      if (gameField.length > 0) {
        this.setGameFieldSize(gameField)
      } else {
        window.removeEventListener('resize', gameFieldSizeListener)
      }
    })

    if (this.openedElements.length === 0) {
      this.getOpenedElements().then(() => {
        this.getOpenedCategories(this.openedElements).then(() => {
          this.setSelectedCategory(this.openedCategories[0])
          this.updateOpenedElementsByCategory(this.openedCategories[0])
          this.updateOpenedElementsPositions()

          this.getRecipes().then(() => {
            this.findOpenedRecipes()
          })
        })
      })
    } else {
      this.getRecipes().then(() => {
        this.findOpenedRecipes()
      })
    }
  },
  methods: {
    ...mapActions({
      setGameFieldSize: 'game/setGameFieldSize',
      getOpenedElements: 'elements/getOpenedElements',
      getOpenedCategories: 'categories/getOpenedCategories',
      setSelectedCategory: 'categories/setSelectedCategory',
      updateOpenedElementsPositions: 'elements/updateOpenedElementsPositions',
      setOpenedRecipes: 'recipes/setOpenedRecipes',
      getRecipes: 'recipes/getRecipes',
      updateOpenedElementsByCategory: 'elements/updateOpenedElementsByCategory',
      updateActiveElementsPositions: 'elements/updateActiveElementsPositions'
    }),
    findOpenedRecipes() {
      let userRecipes = []
      this.recipes.forEach(recipe => {
        const firstElement = this.openedElements.filter(openedElement => {
          return recipe.recipe[0]._id === openedElement._id
        })
        const secondElement = this.openedElements.filter(openedElement => {
          return recipe.recipe[1]._id === openedElement._id
        })
        const resultElement = this.openedElements.filter(openedElement => {
          return recipe.result._id === openedElement._id
        })

        if (firstElement.length > 0 && secondElement.length > 0 && resultElement.length > 0) {
          userRecipes.push(recipe)
        }
      })
      this.setOpenedRecipes(userRecipes)
    }
  }
}
</script>

<style lang="scss">
.section-game {
  display: flex;
  flex: 1;
  padding-top: 10px;
  height: 90vh;
  user-select: none;

  .section-categories {
    display: flex;
    flex: 1 0 0;
    order: 1;
  }

  .section-game-board {
    position: relative;
    flex: 2 0 0;
    order: 2;
    height: 100%;
    padding: 5px;
    box-shadow: 0 0 5px 0 rgb(170, 170, 170);

    .control-panel {
      display: flex;
      height: 100%;
      align-items: flex-end;

      .clear-game-field-button {
        margin-left: auto;
      }
    }
  }

  .section-opened-elements {
    display: flex;
    flex: 1 0 0;
    order: 3;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    max-width: 300px;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 5px 0 rgb(170, 170, 170);
    margin-right: 5px;

    @extend %scrollbar;
  }
}

@media screen and (min-width: map-get($grid-breakpoints, 'md')) {
  .section-game-board {
    margin-left: 20px;
    margin-right: 20px;
  }

  .section-categories {
    height: 100%;
    max-width: 300px;
  }
}

@media screen and (max-width: map-get($grid-breakpoints, 'md')) {
  .section-game {
    flex-wrap: wrap;

    .section-categories {
      flex: 100% 0 0;
      height: 110px;
    }

    .section-game-board {
      height: 80vh;
    }

    .section-opened-elements {
      height: 80vh;
    }
  }
}
</style>
