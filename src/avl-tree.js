
class AVLTree {
  constructor(value){
    if( value )
      this.root = new Node(value);
  }
  insert (value){
    if( this.root )
      this.root.insert(value);
    else
      this.root = new Node(value);

    this.root.update();
    this.balance();

    return this;
  }
  rotateRight(value){
    this.root.get(value).rotateRight(this);
    this.root.update();
  }

  rotateLeft(value){
    this.root.get(value).rotateLeft(this);
    this.root.update();
  }

  balance(){

    var unbalanceds = 0,
        nodeToRotate;

    this.root.posOrder(function(node){
      if( Math.abs(node.balancing) >= 2 ){
        unbalanceds++;
        if( unbalanceds == 1 )
          nodeToRotate = node;
      }
    });

    if(unbalanceds == 0) return;

    if( nodeToRotate.balancing < 0 ){
      if( nodeToRotate.left.balancing < 0 )
        this.rotateRight(nodeToRotate.value);
      else
        this.doubleRotateLeft(nodeToRotate.value);
    } else {
      if( nodeToRotate.right.balancing > 0 )
        this.rotateLeft(nodeToRotate.value);
      else
        this.doubleRotateRight(nodeToRotate.value);
    }

    this.balance();
  }

  doubleRotateLeft(value){
    var node = this.root.get(value);
    node.left.rotateLeft(this);
    node.rotateRight(this);

    this.root.update();
  }

  doubleRotateRight(value){
    var node = this.root.get(value);
    node.right.rotateRight(this);
    node.rotateLeft(this);

    this.root.update();
  }

  preOrder(callback){
    this.root.preOrder(callback);
  }
}

class Node {
  constructor( value, parent ){
    this.value = value;
    this.parent = parent;
    this.height = 0;

    if( parent )
      this.height = parent.height + 1;
  }
  updateHeight(){
    var height = 0;

    if( this.left )
      height = this.left.updateHeight();
    if( this.right && this.right.updateHeight() > height )
      height = this.right.height;

    height += 1;
    this.height = height;
    return height;
  }
  rotateLeft(tree){

    /*
      4             6
        6    =>   4   7
      H   7        H
    */

    var child = this.right,
        hold = child.left;

    child.left = this;

    if (this.parent){
      var orientation = (this.parent.left == this) ? 'left' : 'right';
      this.parent[orientation] = child;
    } else {
      tree.root = child;
      child.parent = null;
    }

    child.parent = this.parent;

    if( this.parent == null )
      tree.root = child;

    this.parent = child;
    this.left = hold;

    if( hold )
      hold.parent = this;
  }

  rotateRight(tree){

    /*
          8         6
        6    =>   5   8
      5   H          H
    */

    var child = this.left;

    if (this.parent){
      var orientation = (this.parent.left == this) ? 'left' : 'right';
      this.parent[orientation] = child;
      child.parent = this.parent;
    } else {
      tree.root = child;
      child.parent = null;
    }

    this.left = child.right;
    if (this.left){
      this.left.parent = this;
    }

    child.right = this;
    this.parent = child;
  }
  isLeaf(){
    return !this.left && !this.right;
  }
  countNodes(){
    if( this.isLeaf() ) return 1;

    var counter = 1;
    if( this.left )
      counter += this.left.countNodes();
    if( this.right )
      counter += this.right.countNodes();
    return counter;
  }
  countChilds(){
    return this.countNodes() - 1;
  }
  posOrder(callback){
    if( this.left )
      this.left.posOrder();
    if( this.right )
      this.right.posOrder();

    callback(this);
  }
  update(){
    this.updateHeight();
    this.updateBalancing();
  }
  updateBalancing(){
    var balancing = 0;

    if( this.right ){
      balancing = this.right.height;
      this.right.updateBalancing();
    }

    if( this.left ){
      balancing -= this.left.height;
      this.left.updateBalancing();
    }

    this.balancing = balancing;
  }
  hasValue( value ){
    if( this.value == value ) return true;

    if( value < this.value )
      if( this.left ) return this.left.hasValue(value);
      else return false;

    if( value > this.value )
      if( this.right ) return this.right.hasValue(value);
      else return false;
  }
  insert(value){
    if( value > this.value )
      if( this.right )
        this.right.insert(value);
      else
        this.right = new Node( value, this);

    if( value < this.value )
      if( this.left )
        this.left.insert( value );
      else
        this.left = new Node( value, this);

    this.update();

    return this;
  }
  get( value ){
    if( !this.hasValue(value) ) return null;

    if( value == this.value ) return this;

    if( value < this.value ) return this.left.get(value);
    if( value > this.value ) return this.right.get(value);
  }
  biggest(){
    if( this.right )
      return this.right.biggest();
    else
      return this;
  }
  smallest(){
    if( this.left )
      return this.left.smallest();
    else
      return this;
  }
  successor(){
    return this.right ? this.right.smallest(): null;
  }
  antecessor(){
    return this.left ? this.left.biggest(): null;
  }
  preOrder(callback){

    callback(this);

    if( this.left )
      this.left.preOrder(callback);

    if( this.right )
      this.right.preOrder(callback);
  }
  posOrder(callback){

    if( this.left )
      this.left.posOrder(callback);

    if( this.right )
      this.right.posOrder(callback);

    callback(this);

  }
  getUnbalancedsfunction(){
    var unbalanceds = [];
    this.update();
    this.preOrder(function(node){
      if( Math.abs(node.balancing) >= 2 )
        unbalanceds.push(node);
    });
    return unbalanceds;
  }
}

module.exports = AVLTree;
