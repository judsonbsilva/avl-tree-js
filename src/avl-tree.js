
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
    remove( value  ){
        if( this.root ){
            this.root.remove(value, this);
            if( this.root )
                this.root.update();
        }

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
            nodeToRotate = null;

        this.root.posOrder(function(node){
            if( Math.abs( node.balancing ) >= 2 ){
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

    updateLevel(){
        this.level = this.parent ? 1 + this.parent.level: 0;
    }

    updateHeight(){
        var height = 0;

        if( this.left != null ){
            this.left.updateHeight();
            height = this.left.height;
        }
        if( this.right != null ){
            this.right.updateHeight();
            if( this.right.height > height )
                height = this.right.height;
        }
        this.height = height + 1;
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
        child.parent = this.parent;

        this.parent = child;
        this.right = hold;

        if( hold )
            hold.parent = this;

        if (child.parent != null){
            var orientation = (child.parent.left == this) ? 'left' : 'right';
            child.parent[orientation] = child;
        } else {
            tree.root = child;
            child.parent = null;
        }

    }

    rotateRight(tree){

            /*
        8         6
        6    =>   4   8
        4   H          H
            */

        var child = this.left,
            hold = child.right;

        child.right = this;
        child.parent = this.parent;

        this.parent = child;
        this.left = hold;

        if( hold )
            hold.parent = this;

        if (child.parent != null){
            var orientation = (child.parent.left == this) ? 'left' : 'right';
            child.parent[orientation] = child;
        } else {
            tree.root = child;
            child.parent = null;
        }

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

    remove(value, tree){
        if( this.value == value ){
            var isRoot = !this.parent ? true: false,
                side;

            if(!isRoot)
                side = (this.parent.left == this) ? 'left' : 'right';

            if( this.isLeaf() ){
                if( isRoot )
                    tree.root = null;
                else
                    this.parent[side] = null;
            }

            if( this.left && this.right ){
                let num1 = this.left.countChilds(),
                    num2 = this.right.countChilds(),
                    substitute;

                if( num1 >= num2 ){
                    if( num1 == 0 ){
                        substitute = this.left;
                        substitute.left = null;
                    } else {
                        substitute = this.antecessor();
                        substitute.parent.right = null;
                        substitute.left = this.left;
                        substitute.left.parent = substitute;
                    }
                    substitute.parent = this.parent;
                    substitute.right = this.right;
                    substitute.right.parent = substitute;
                } else {
                    if( num2 == 0 ){
                        substitute = this.right;
                        substitute.right = null;
                    } else {
                        substitute = this.sucessor();
                        substitute.parent.left = null;
                        substitute.right = this.left;
                        substitute.right.parent = substitute;
                    }
                    substitute.parent = this.parent;
                    substitute.left = this.left;
                    substitute.left.parent = substitute;
                }

                if( isRoot )
                    tree.root = substitute;
                 else
                    substitute.parent[side] = substitute;
            } else if( this.left ){
                let substitute = this.left;
                substitute.left = null;
                substitute.right = this.right;
                substitute.parent = this.parent;
                if( isRoot )
                    tree.root = substitute;
                else
                    substitute.parent[side] = substitute;
            } else if( this.right ){
                let substitute = this.right;
                substitute.right = null;
                substitute.left = this.left;
                substitute.parent = this.parent;
                if( isRoot )
                    tree.root = substitute;
                else
                    substitute.parent[side] = substitute;
            }
        }

        if( value > this.value && this.right )
            this.right.remove(value, tree);

        if( value < this.value && this.left )
            this.left.remove(value, tree);

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
        this.preOrder(function(node){
            node.updateLevel();
        });
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
    inOrder(callback){

        if( this.left )
            this.left.posOrder(callback);

        callback(this);

        if( this.right )
            this.right.posOrder(callback);
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
