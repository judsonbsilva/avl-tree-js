import { assert } from 'chai';
import AVLTree from '../src/avl-tree.js';
import _ from 'underscore';

describe('#others', function () {

    it('aleatory sequence', function(){

        var tree = new AVLTree(),
            values = [300,400,350,325,315,320],
            balancedValues = [325,315,300,320,350,400],
            i = 0;

        _.each(values,function(value){
            tree.insert(value);
        });

        tree.preOrder(function( node ){
            assert.equal(node.value, balancedValues[i++]);
        });

    });

    it('get level', function(){

        var tree = new AVLTree(),
            values = [1,2,3,4];

        _.each(values, function(value){
            tree.insert(value);
        });

        assert.equal(tree.root.level, 0);
        assert.equal(tree.root.get(1).level, 1);
        assert.equal(tree.root.get(4).level, 2);

    });

    it('test empty tree', function(){
       var tree = new AVLTree();

      assert.equal(tree.isEmpty(), true);
    });
});
