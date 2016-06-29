var assert = require('chai').assert;
var AVLTree = require('../src/avl-tree.js');

describe('AVL Tree', function() {
  describe('#insert', function () {
    it('should return list of balanced values', function () {

      var tree = new AVLTree(),
          values = [5,3,2,1,9,4,8,7],
          balancedValues = [3,2,1,5,4,8,7,9],
          i = 0;

      values.forEach(function(value){
        tree.insert(value)
      });

      tree.preOrder(function( node ){
        assert.equal(node.value, balancedValues[i++]);
      });
    });
  });
});
