
var assert = require('assert')

// takes an object, returns a flat object - all nested objects are represented by dot delineated keys

const flattenObj = obj => {
  const keys = Object.keys(obj)
  return keys.reduce((prev, curr) => {
    if (typeof(obj[curr]) === 'object') {
      const innerObj = flattenObj(obj[curr])
      const modObj = Object.keys(innerObj).reduce((accum, innerkey)=>{
        return Object.assign(accum, { [curr + '.' + innerkey]: innerObj[innerkey] })
      }, {})
      return Object.assign(prev, modObj)
    } else {
      return Object.assign(prev, { [curr]: obj[curr] })
    }
  }, {})
}

const testObj = {
  foo: 'bar',
  blah: 'floo',
  zoo: {
    gah: 'aeh'
  },
  a: {
    b: {
      c: 'd'
    }
  }
}

const expected = {
  foo: 'bar',
  blah: 'floo',
  'zoo.gah': 'aeh',
  'a.b.c': 'd'
}

assert.deepEqual(flattenObj(testObj), expected)
