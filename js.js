var Tree = /** @class */ (function () {
    function Tree(label, numberOfElements) {
        this.numberOfElements = numberOfElements;
        this.label = label;
        this.root = new treeNode("XXX", this.label, null, numberOfElements);
    }
    Tree.prototype.getAllNodesBFS = function (rootNode) {
        var node = rootNode;
        var nodeArray = [];
        var queue = [];
        queue.push(node);
        while (queue.length) {
            node = queue.shift();
            nodeArray.push(node);
            node.children.forEach(function (node) {
                if (node && node) {
                    queue.push(node);
                }
            });
        }
        return nodeArray || [];
    };
    Tree.prototype.getLastNodes = function () {
        var allNodes = this.getAllNodesBFS(this.root);
        var filteredNodes = allNodes.filter(function (node) {
            if (node.isLastNode) {
                return node;
            }
        });
        return filteredNodes;
    };
    Tree.prototype.getNumberOfCombinations = function () {
        return this.getLastNodes().length;
    };
    Tree.prototype.getCombinationOfNodes = function () {
        var _this = this;
        var nodeLabelArr = [];
        var lastNodes = this.getLastNodes();
        lastNodes.forEach(function (el) {
            var chain = [];
            var nodelabelChain = _this.getChainOfNodes(el, chain);
            nodeLabelArr.push(nodelabelChain);
        });
        return nodeLabelArr;
    };
    Tree.prototype.getChainOfNodes = function (node, chain) {
        while (node.label !== "XXX") {
            chain.push(node.label);
            return this.getChainOfNodes(node.parentNode, chain);
        }
        return chain;
    };
    return Tree;
}());
var treeNode = /** @class */ (function () {
    function treeNode(label, possibleChildrenLabels, parentNode, numberOfElements) {
        this.parentNode = null;
        this.children = [];
        this.levelsToFirstLayer = 0;
        this.parentNode = parentNode;
        this.label = label;
        this.possibleChildrenLabels = possibleChildrenLabels;
        this.numberOfElements = numberOfElements;
        this.createChildren();
        this.isLastNode = this.isLast();
    }
    treeNode.prototype.isLast = function () {
        if (this.children.length)
            return false;
        return true;
    };
    treeNode.prototype.pushToChildren = function (child) {
        this.children.push(child);
    };
    treeNode.prototype.setPossibleChildren = function (el) {
        var labelsCopy = JSON.parse(JSON.stringify(this.possibleChildrenLabels));
        var indexToRemove = labelsCopy.indexOf(el);
        if (indexToRemove !== -1)
            labelsCopy.splice(indexToRemove, 1);
        return labelsCopy;
    };
    treeNode.prototype.createChildren = function () {
        var _this = this;
        var levelsToFirstLayer = this.howManyLayersToTop(this);
        if (levelsToFirstLayer < this.numberOfElements) {
            var possibleChildrenForChildren_1 = this.setPossibleChildren(this.label);
            possibleChildrenForChildren_1.forEach(function (el) {
                _this.pushToChildren(new treeNode(el, possibleChildrenForChildren_1, _this, _this.numberOfElements));
            });
        }
    };
    treeNode.prototype.howManyLayersToTop = function (parentNode) {
        while (parentNode.label !== "XXX") {
            this.levelsToFirstLayer++;
            return this.howManyLayersToTop(parentNode.parentNode);
        }
        return this.levelsToFirstLayer;
    };
    return treeNode;
}());
function init(elements, numberOfChainedElements) {
    var numberOfElements = numberOfChainedElements || elements.length;
    var tree = new Tree(elements, numberOfElements);
    var numberOfCombinations = tree.getNumberOfCombinations();
    var combinations = tree.getCombinationOfNodes();
    console.log(tree);
    console.log(numberOfCombinations);
    console.log(combinations);
}
var elements = [1, 2, 3];
init(elements, 2);
