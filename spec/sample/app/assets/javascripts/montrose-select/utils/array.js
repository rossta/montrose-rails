export default {
  // http://stackoverflow.com/questions/1181575/determine-whether-an-array-contains-a-value
  contains(arr, needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle
    var indexOf

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf
    } else {
        indexOf = (needle) => {
            var i = -1, index = -1

            for(i = 0; i < arr.length; i++) {
                var item = arr[i]

                if((findNaN && item !== item) || item === needle) {
                    index = i
                    break
                }
            }

            return index
        }
    }

    return indexOf.call(arr, needle) > -1
  }
}
