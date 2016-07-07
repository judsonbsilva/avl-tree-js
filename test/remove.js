import { assert } from 'chai';
import AVLTree from '../src/avl-tree.js';
import _ from 'underscore';

describe("#remove", function(){

    it('remove leaf', function(){

        var tree = new AVLTree(),
            values = [1,2,3];

        _.each(values, function(value){
            tree.insert(value);
        });

        tree.remove(3);
        tree.remove(1);

        assert.equal(tree.root.countNodes(), 1);

    });

    it('remove root leaf', function(){

        var tree = new AVLTree(),
            values = [2];

        _.each(values, function(value){
            tree.insert(value);
        });

        tree.remove(2);

        assert.equal(tree.root, null);

    });

    it('remove nodes with childs',function(){

        var tree = new AVLTree(),
            values = [1,2,3,4,5];

        _.each(values, function(value){
            tree.insert(value);
        });

        tree.remove(3);
        assert.equal(tree.root.countNodes(), 4);
    });

    it('remove root node when has childs', function(){

        var tree = new AVLTree(),
            values = [3,8,12,5];

        _.each(values, function(value){
            tree.insert(value);
        });

        tree.remove(8);
        assert.equal(tree.root.value, 5);
        assert.equal(tree.root.left.value, 3);
        assert.equal(tree.root.right.value, 12);
    });
});
