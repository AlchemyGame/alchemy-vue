export default {
  LOADING_START (state) {
    state.state.isLoading = true
  },
  LOADING_END (state) {
    state.state.isLoading = false
  },
  SET_ERROR (state, error) {
    state.state.error = error
  },

  SET_OPENED_ELEMENTS (state, elements) {
    state.openedElements = elements
  },
  ADD_OPENED_ELEMENT (state, element) {
    state.openedElements.push(element)
  },
  SET_ACTIVE_ELEMENTS (state, elements) {
    state.activeElements = elements
  },
  ADD_ACTIVE_ELEMENT (state, element) {
    state.activeElements.push(element)
  },
  DELETE_ACTIVE_ELEMENT (state, element) {
    state.activeElements.splice(element, 1)
  },
  DELETE_ACTIVE_ELEMENTS (state) {
    state.activeElements = []
  },
  SET_SELECTED_ELEMENT (state, element) {
    state.selectedElement = element
  },
  SET_SELECTED_ELEMENT_COORDINATES (state, { x, y, z }) {
    state.selectedElement.x = x
    state.selectedElement.y = y
    state.selectedElement.z = z
  },
  DELETE_SELECTED_ELEMENT (state) {
    state.selectedElement = {}
  },
  UPDATE_OPENED_ELEMENTS_POSITIONS (state) {
    let j = 0

    state.openedElements.forEach(openedElement => {
      openedElement.x = 0
      if (openedElement.show) {
        openedElement.y = j * 45
        j++
      } else {
        openedElement.y = 0
      }
    })
  },
  UPDATE_OPENED_ELEMENTS_BY_CATEGORY (state, category) {
    state.openedElements.forEach(element => {
      element.show = false
      if (category._id === element.category) {
        element.show = true
      }
    })
  }
}
