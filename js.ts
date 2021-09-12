

class Tree {
  public root: treeNode;
  private label: any[];

  private numberOfElements: number;


  constructor(label: any[], numberOfElements: number) {
    this.numberOfElements = numberOfElements;
    this.label = label;
    this.root = new treeNode("XXX", this.label, null, numberOfElements);
   
  }

  public getAllNodesBFS(rootNode: treeNode): treeNode[]{

      let node: treeNode = rootNode;
      let nodeArray: treeNode[] = [];
      let queue: treeNode[] = [];
      queue.push(node);

      while (queue.length) {
          node = queue.shift();
          nodeArray.push(node);
          node.children.forEach(node => {
              if (node && node) {
                  queue.push(node);
              }
          });
      }

      return nodeArray || [];
  }

  private getLastNodes(): treeNode[]{
    const allNodes: treeNode[] = this.getAllNodesBFS(this.root);
    const filteredNodes: treeNode[] = allNodes.filter((node) => {
      if(node.isLastNode){
        return node;
      }
    });
    return filteredNodes;
  }

  public getNumberOfCombinations(){
    return this.getLastNodes().length;
  }

  public getCombinationOfNodes(){
    const nodeLabelArr: any[][] = [];
    const lastNodes: treeNode[] = this.getLastNodes();
    lastNodes.forEach(el => {
      const chain: treeNode[] = [];
      const nodelabelChain: any[]= this.getChainOfNodes(el, chain);
      nodeLabelArr.push(nodelabelChain);
    })
    return nodeLabelArr;
  }

  private getChainOfNodes(node: treeNode, chain){
   
    while (node.label !== "XXX") {
      chain.push(node.label);
      return this.getChainOfNodes(node.parentNode, chain);
    }
    return chain;
  }

}

class treeNode {
  public parentNode: treeNode | null = null;
  public children: treeNode[] = [];
  public label: string;
  private possibleChildrenLabels: string[];
  private levelsToFirstLayer: number = 0;
  private numberOfElements: number;
  public isLastNode: boolean;

  constructor(
    label: string,
    possibleChildrenLabels: string[],
    parentNode: treeNode | null,
    numberOfElements: number
  ) {
    this.parentNode = parentNode;
    this.label = label;
    this.possibleChildrenLabels = possibleChildrenLabels;
    this.numberOfElements = numberOfElements;
    this.createChildren();
    this.isLastNode = this.isLast();

  }

  private isLast(){
    if(this.children.length) return false;
    return true;
  }

  public pushToChildren(child: treeNode) {
    this.children.push(child);
  }

  private setPossibleChildren(el: string): string[] {
    const labelsCopy: string[] = JSON.parse(
      JSON.stringify(this.possibleChildrenLabels)
    );
    const indexToRemove: number = labelsCopy.indexOf(el);
    if (indexToRemove !== -1) labelsCopy.splice(indexToRemove, 1);
    return labelsCopy;
  }

  private createChildren() {
   const levelsToFirstLayer = this.howManyLayersToTop(this);

    if (levelsToFirstLayer < this.numberOfElements) {
      const possibleChildrenForChildren: string[] = this.setPossibleChildren(
        this.label
      );
      possibleChildrenForChildren.forEach((el) => {
        this.pushToChildren(
          new treeNode(el, possibleChildrenForChildren, this, this.numberOfElements)
        );
      });
    }
  }

  private howManyLayersToTop(parentNode: treeNode): number {
    while (parentNode.label !== "XXX") {
      this.levelsToFirstLayer++;
      return this.howManyLayersToTop(parentNode.parentNode);
    }
    return this.levelsToFirstLayer;
  }
}


function init(elements: any[],numberOfChainedElements?: number) {
  const numberOfElements: number = numberOfChainedElements || elements.length;
  const tree: Tree = new Tree(elements, numberOfElements);  
  const numberOfCombinations: number = tree.getNumberOfCombinations();
  const combinations: any[][] = tree.getCombinationOfNodes();
  console.log(tree);
  console.log(numberOfCombinations);
  console.log(combinations);
  
}


const elements: any[] = [1,2,3];
init(elements, 2);
