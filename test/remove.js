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

    it('aleatory sequence', function(){

        var tree = new AVLTree(),
            values = [23,10,43,2,32,11,78,5,105];

        _.each(values, function(value){
            tree.insert(value);
        });

        tree.remove(78);
        assert.equal(tree.root.countNodes(), 8);
    });

    it('aleatory sequence 2', function(){

        var tree = new AVLTree(),
            values = [40, 30,70, 20,31,60,90,15,25,55,65,80,100],
            ordeneds = [40,20,15,30,25,70,60,55,65,90,80,100],
            i = 0;

        _.each(values, function(value){
            tree.insert(value);
        });
        tree.remove(31);

        tree.preOrder(function(node){
            assert.equal( node.value, ordeneds[i++]);
        });
    });

	it('successor with right child', function(){

        var tree = new AVLTree(),
            values = [30,20,40,10,25,35,50,5,37,55],
			balanceds = [35,20,10,5,25,40,37,50,55],
			i = 0;

        _.each(values, function(value){
            tree.insert(value);
        });

		assert.equal( tree.root.value, 30);
        tree.remove(30);

        tree.preOrder(function(node){
            assert.equal( node.value, balanceds[i++]);
        });

	});

	it('if successor is equal to child left', function(){

        var tree = new AVLTree(),
            values =  [3,2,1,4,5],
			balanceds = [2,1,4,5],
			i = 0;

        _.each(values, function(value){
            tree.insert(value);
        });

        tree.remove(3);

        tree.preOrder(function(node){
            assert.equal( node.value, balanceds[i++]);
        });

	});

});
