class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    

    getRoot(layer = this.leaves) {  
        if (layer.length === 1)
            return layer[0]

        const nextLayer = [];
        for(let i=0; i<layer.length; i+=2){
            if(i+1 < layer.length)
                nextLayer.push(this.concat(layer[i], layer[i+1]));
            else
                nextLayer.push(layer[i]);
        }

        return this.getRoot(nextLayer);
    }

    
    getProof(index, layer = this.leaves, proof = []){

        if (layer.length === 1)
            return proof;

        const nextLayer = [];
        for (let i = 0; i < layer.length; i += 2) {
            if (i + 1 < layer.length){
                nextLayer.push(this.concat(layer[i], layer[i + 1]));

                if(i === index || i === index - 1){
                    let isLeft = (index%2 === 0);
                    proof.push({
                        data: isLeft ? layer[i+1] : layer[i],
                        left: !isLeft
                    })
                }
            }
            else
                nextLayer.push(layer[i]);
        }

            return this.getProof(Math.floor(index/2), nextLayer, proof);
    }
}

// module.exports = MerkleTree;

export default MerkleTree;