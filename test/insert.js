import { assert } from 'chai';
import AVLTree from '../src/avl-tree.js';
import _ from 'underscore';

describe('#insert', function () {

    it('rotate to left', function () {

        var tree = new AVLTree(),
            values = [1,2,3],
            balancedValues = [2,1,3],
            i = 0;

        _.each(values, function(value){
            tree.insert(value);
        });

        tree.preOrder(function( node ){
            assert.equal(node.value, balancedValues[i++]);
        });
    });

    it('rotate to right', function () {

        var tree = new AVLTree(),
            values = [3,2,1],
            balancedValues = [2,1,3],
            i = 0;

        _.each(values,function(value){
            tree.insert(value);
        });

        tree.preOrder(function( node ){
            assert.equal(node.value, balancedValues[i++]);
        });
    });

    it('double rotate to left', function () {

        var tree = new AVLTree(),
            values = [3,1,2],
            balancedValues = [2,1,3],
            i = 0;

        _.each(values,function(value){
            tree.insert(value)
        });

        tree.preOrder(function( node ){
            assert.equal(node.value, balancedValues[i++]);
        });
    });

    it('double rotate to right', function () {

        var tree = new AVLTree(),
            values = [1,3,2],
            balancedValues = [2,1,3],
            i = 0;

        _.each(values,function(value){
            tree.insert(value)
        });

        tree.preOrder(function( node ){
            assert.equal(node.value, balancedValues[i++]);
        });
    });
});
