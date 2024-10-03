function verifyProof(proof, node, root, concat) {
    let hash = node;

    for (let i = 0; i < proof.length; i++){
       let provingElement = proof[i];
       if(provingElement.left){
           hash = concat(provingElement.data, hash);
       }
       else{
           hash = concat(hash, provingElement.data)
       }
    }
    
    return hash === root;
}

// module.exports = verifyProof;
export default verifyProof;
