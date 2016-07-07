import { assert } from 'chai';
import AVLTree from '../src/avl-tree.js';
import _ from 'underscore';

describe('AVL Tree', function() {
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
        assert.equal(tree.root.countNodes(), 3);
    });
  });
});
