import PathfindingAlgorithm from "./PathfindingAlgorithm";

class Prim extends PathfindingAlgorithm {
    constructor() {
        super();
        this.openList = [];
    }

    start(startNode) {
        this.openList = [startNode];
    }

    nextStep() {
        if (this.openList.length === 0) {
            this.finished = true;
            return [];
        }

        const updatedNodes = [];
        const currentNode = this.openList.shift();
        currentNode.visited = true;
        const refEdge = currentNode.edges.find(e => e.getOtherNode(currentNode) === currentNode.referer);
        if(refEdge) refEdge.visited = true;

        for (const n of currentNode.neighbors) {
            const neighbor = n.node;
            const edge = n.edge;

            // Fill edges that are not marked on the map
            if(neighbor.visited && !edge.visited) {
                edge.visited = true;
                neighbor.referer = currentNode;
                updatedNodes.push(neighbor);
            }

            if (neighbor.visited) continue;

            if (!this.openList.includes(neighbor)) {
                this.openList.push(neighbor);
            }

            neighbor.referer = currentNode;
            neighbor.parent = currentNode;
        }

        return [...updatedNodes, currentNode];
    }
}

export default Prim;