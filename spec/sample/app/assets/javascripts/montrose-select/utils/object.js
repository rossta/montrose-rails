import merge from "lodash.merge"

export default {
  merge(...objects) {
    return merge({}, ...objects)
  }
}
