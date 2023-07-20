var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""
    /*humanLayout: [
        ["skin", "skel", "circ", "nerv", "rep"],
        ["human"]
    ],

    circLayout: [
        ["heart"],
        ["circN"]
    ],

    heartLayout: [
        ["heart wall", "Latrium", "Ratrium", "Lventricle", "Rventricle"],
        ["heartN"]
    ]*/
    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    symbol: "",
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    symbol: "",
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
})
/*
addLayer("human-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.humanLayout ? layoutInfo.humanLayout : TREE_LAYERS)}]]
})

addLayer("circ-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.circLayout ? layoutInfo.circLayout : TREE_LAYERS)}]]
})

addLayer("heart-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.heartLayout ? layoutInfo.heartLayout : TREE_LAYERS)}]]
})*/