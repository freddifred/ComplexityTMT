addLayer("subatomic", {
    symbol: "subatomic particles",
    
    layerShown: true,
    row: 0,
    tooltip: "",
    nodeStyle: {
        'font-size': '18px',
    },
    startData() {return {
        proton: 0,
        neutron: 0
    }},
    clickables: {
        11: {
            title: "Proton",
            display: "",
            canClick: true,
            onClick() {player.subatomic.proton +=1},
            style() {return {"background-color": "green"}}
        },
        12: {
            title: "neutron",
            display: "",
            canClick: true,
            onClick() {player.subatomic.neutron += 1},
            
        }},

        tabFormat: [            
            ["display-text",
            function() {return "Protons: " + player.subatomic.proton + "<br>Neutrons: " + player.subatomic.neutron}],
            "clickables",

        ]
    
})

addLayer("atomic", {
    symbol: "Atoms",
    previousTab: "Hydrogen",
    row: 1,
    branches: ["subatomic"],
    startData() {return {
        unlock: false,
        protium: 0,
        deuterium: 0,
        He3: 0,
        
        tritium: 0,
        He4: 0,
        mode: "nucleosynthesis",
        
        accessElems: [101, 119, 202, 215, 217, 219, 315, 317, 319, 402, 405, 407, 409, 411]
        
    }},
    layerShown() {if (player.subatomic.proton >= 1 || player.subatomic.neutron >= 1||player.atomic.unlock == true) {
        player.atomic.unlock = true
        return true
    }
else {return false}},
tooltip: "",
nodeStyle: {
    'font-size': '18px',
},
clickables: {
    11: {
        title: "Protium",
        display: "Requires 1 proton",
        canClick() {if (player.subatomic.proton >= 1||hasUpgrade("Stars",11)) {
            
            return true
        }
    else {return false}},
    onClick() {if (!hasUpgrade("Stars",11)) {
        player.subatomic.proton -= 1}
    player.atomic.protium += 1

}
    },
    12: {
        title: "Deuterium",
        display: "Requires 1 proton and 1 neutron",
        canClick() {if ((player.subatomic.proton >= 1 && player.subatomic.neutron >= 1)||hasUpgrade("Stars",11)) {
            
            return true
        }
    else {return false}},
    onClick() {if (!hasUpgrade("Stars",11)) {
        player.subatomic.proton -= 1
        player.subatomic.neutron -= 1}
    player.atomic.deuterium += 1

}
    },
    13: {
        unlocked() {return hasMilestone("Progression", 0)},
        title: "Helium-3",
        display() {
        return "Requires 2 deuterium but gives a bonus neutron"
    
    },
        canClick () {return player.atomic.deuterium >= 2},
    
    onClick() {
         
    player.atomic.deuterium -= 2
    player.subatomic.neutron += 1
    player.atomic.He3 += 1
    
}},
14: {
    unlocked() {return hasMilestone("Progression", 0)},
    title: "Tritium",
    display: "Requires 2 deuterium but get a bonus proton",
    canClick() {if (player.atomic.deuterium >= 2) {
        
        return true
    }
else {return false}},
onClick() {player.subatomic.proton += 1
    player.atomic.deuterium -= 2
player.atomic.tritium += 1},
},

15: {
    unlocked() {return hasMilestone("Progression", 0)},
    title: "Helium-4",
    display() {
    return "Requires 1 Helium-3 and 1 deuterium but gives a bonus proton"

},
    canClick () {return player.atomic.He3 >= 1 && player.atomic.deuterium >= 1},

onClick() {
    
        
    player.atomic.He3 -= 1
player.atomic.deuterium -= 1
player.atomic.He4 += 1
player.subatomic.proton += 1
}
},

21: {
    unlocked() {return hasMilestone("Progression", 5)},
    title: "Toggle mode",
    canClick: true,
    display() {
        if (player.atomic.mode == "nucleosynthesis") {return "Mode: nucleosynthesis"}
        else {return "Mode: Stars<br>" + player.Stars.timer.toFixed(2) + "s"}},
    onClick() {if (player.atomic.mode == "nucleosynthesis") {player.atomic.mode = "Stars"}
else {player.atomic.mode = "nucleosynthesis"}},


    }
},



grid: {
    rows: 10,
    cols: 19,
    getStartData(id) {
        return 0
    },

    onClick(data, id) {
        if ((player.tab != "Stars"||player.subtabs.Stars.mainTabs != "Stars")&&player.atomic.accessElems.includes(id)&&player.atomic.mode == "nucleosynthesis") {
            player.tab = player.Stars.dictionary[id]
        }
        if (player.Stars.canGen.includes(id) && ((player.tab == "Stars"&&player.subtabs.Stars.mainTabs == "Stars")||player.atomic.mode == "Stars")) {player.Stars.selected = id}
        if (player.Stars.canGen.includes(id) && player.atomic.mode == "Stars") {player.Stars.toGen = player.Stars.dictionary[player.Stars.selected]
            player.Stars.starGeneration = true
            options['autosave'] = false 
            
            if (player.Stars.canGen.includes (player.Stars.selected)){
                player.Stars.timer = player.Stars.time
                if (player.Stars.selected == 101) {player.Stars.timer = 0}} }
        
        if (player.tab != "Stars"&&player.atomic.mode == "nucleosynthsis") {player.Stars.selected = 0}

        
    },
    getStyle(data, id) {
        let elems =  [102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 404, 504, 604, 704, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 901, 902, 903, 904, 919, 1001, 1002, 1003, 1004, 1019]
        
        if (elems.includes(id)){ return {
            "background-color":"black",
            "width": "25px",
            "height": "25px"
        }}
        else if (id == player.Stars.selected) {
            return {
                "background-color": "green",
                "width": "25px",
            "height": "25px"
            }
        }

        else if ((!player.Stars.canGen.includes(id) && ((player.tab == "Stars"&&player.subtabs.Stars.mainTabs == "Stars")||player.atomic.mode == "Stars"))||((player.subtabs.Stars.mainTab != "Stars"||player.tab != "Stars") && !player.atomic.accessElems.includes(id))) {
            return {
                "background-color": "red",
                "width": "25px",
            "height": "25px"
            }
        }
        else {
            return {
                "width": "25px",
            "height": "25px"
            }
        }
    },

    getUnlocked(id) {
        let elems =  [102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 404, 504, 604, 704, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 901, 902, 903, 904, 919, 1001, 1002, 1003, 1004, 1019]
        
        if (!player.Stars.starGeneration) {
        if (elems.includes(id)) {
            return "blank"
        }
        else {return true}}
        else {return false}
    },

    
    getTitle(data, id) {
        if (id == 101) {return "H"}
        if (id == 119) {return "He"}
        if (id == 201) {return "Li"}
        if (id == 202) {return "Be"}
        if (id == 214) {return "B"}
        if (id == 215) {return "C"}
        if (id == 216) {return "N"}
        if (id == 217) {return "O"}
        if (id == 218) {return "F"}
        if (id == 219) {return "Ne"}
        if (id == 301) {return "Na"}
        if (id == 302) {return "Mg"}
        if (id == 314) {return "Al"}
        if (id == 315) {return "Si"}
        if (id == 316) {return "P"}
        if (id == 317) {return "S"}
        if (id == 318) {return "Cl"}
        if (id == 319) {return "Ar"}
        if (id == 401) {return "K"}
        if (id == 402) {return "Ca"}
        if (id == 403) {return "Sc"}
        if (id == 405) {return "Ti"}
        if (id == 406) {return "V"}
        if (id == 407) {return "Cr"}
        if (id == 408) {return "Mn"}
        if (id == 409) {return "Fe"}
        if (id == 410) {return "Co"}
        if (id == 411) {return "Ni"}
        if (id == 412) {return "Cu"}
        if (id == 413) {return "Zn"}
        if (id == 414) {return "Ga"}
        if (id == 415) {return "Ge"}
        if (id == 416) {return "As"}
        if (id == 417) {return "Se"}
        if (id == 418) {return "Br"}
        if (id == 419) {return "Kr"}
        if (id == 501) {return "Rb"}
        if (id == 502) {return "Sr"}
        if (id == 503) {return "Y"}
        if (id == 505) {return "Zr"}
        if (id == 506) {return "Nb"}
        if (id == 507) {return "Mo"}
        if (id == 508) {return "Tc"}
        if (id == 509) {return "Ru"}
        if (id == 510) {return "Rh"}
        if (id == 511) {return "Pd"}
        if (id == 512) {return "Ag"}
        if (id == 513) {return "Cd"}
        if (id == 514) {return "In"}
        if (id == 515) {return "Sn"}
        if (id == 516) {return "Sb"}
        if (id == 517) {return "Te"}
        if (id == 518) {return "I"}
        if (id == 519) {return "Xe"}
        if (id == 601) {return "Cs"}
        if (id == 602) {return "Ba"}
        if (id == 603) {return "La"}
        if (id == 605) {return "Hf"}
        if (id == 606) {return "Ta"}
        if (id == 607) {return "W"}
        if (id == 608) {return "Re"}
        if (id == 609) {return "Os"}
        if (id == 610) {return "Ir"}
        if (id == 611) {return "Pt"}
        if (id == 612) {return "Au"}
        if (id == 613) {return "Hg"}
        if (id == 614) {return "Tl"}
        if (id == 615) {return "Pb"}
        if (id == 616) {return "Bi"}
        if (id == 617) {return "Po"}
        if (id == 618) {return "At"}
        if (id == 619) {return "Rn"}
        if (id == 701) {return "Fr"}
        if (id == 702) {return "Ra"}
        if (id == 703) {return "Ac"}
        if (id == 705) {return "Rf"}
        if (id == 706) {return "Db"}
        if (id == 707) {return "Sg"}
        if (id == 708) {return "Bh"}
        if (id == 709) {return "Hs"}
        if (id == 710) {return "Mt"}
        if (id == 711) {return "Ds"}
        if (id == 712) {return "Rg"}
        if (id == 713) {return "Cn"}
        if (id == 714) {return "Nh"}
        if (id == 715) {return "Fl"}
        if (id == 716) {return "Mc"}
        if (id == 717) {return "Lv"}
        if (id == 718) {return "Ts"}
        if (id == 719) {return "Og"}
        if (id == 905) {return "Ce"}
        if (id == 906) {return "Pr"}
        if (id == 907) {return "Nd"}
        if (id == 908) {return "Pm"}
        if (id == 909) {return "Sm"}
        if (id == 910) {return "Eu"}
        if (id == 911) {return "Gd"}
        if (id == 912) {return "Tb"}
        if (id == 913) {return "Dy"}
        if (id == 914) {return "Ho"}
        if (id == 915) {return "Er"}
        if (id == 916) {return "Tm"}
        if (id == 917) {return "Yb"}
        if (id == 918) {return "Lu"}
        if (id == 1005) {return "Th"}
        if (id == 1006) {return "Pa"}
        if (id == 1007) {return "U"}
        if (id == 1008) {return "Np"}
        if (id == 1009) {return "Pu"}
        if (id == 1010) {return "Am"}
        if (id == 1011) {return "Cm"}
        if (id == 1012) {return "Bk"}
        if (id == 1013) {return "Cf"}
        if (id == 1014) {return "Es"}
        if (id == 1015) {return "Fm"}
        if (id == 1016) {return "Md"}
        if (id == 1017) {return "No"}
        if (id == 1018) {return "Lr"}
        
        

    }
},

automate() {
    
    player.Hydrogen.Hydrogen = player.atomic.protium + player.atomic.deuterium + player.atomic.tritium+player.Hydrogen.spare
    player.Helium.Helium = player.atomic.He3+player.atomic.He4+player.Helium.spare
    player.Beryllium.Beryllium = player.Beryllium.Be8+player.Beryllium.spare
    player.Carbon.Carbon = player.Carbon.C12+player.Carbon.spare
    player.Oxygen.Oxygen = player.Oxygen.O16+player.Oxygen.spare
    player.Phosphorus.Phosphorus = player.Phosphorus.P31 + player.Phosphorus.spare
    player.Nitrogen.Nitrogen = player.Nitrogen.N13+player.Nitrogen.spare
    player.Neon.Neon = player.Neon.Ne20+player.Neon.spare
    player.Sodium.Sodium = player.Sodium.Na23+player.Sodium.spare
    player.Magnesium.Magnesium = player.Magnesium.Mg24+player.Magnesium.Mg25+player.Magnesium.Mg26+player.Magnesium.spare
    player.Aluminium.Aluminium = player.Aluminium.Al27+player.Aluminium.spare
    player.Silicon.Silicon = player.Silicon.Si28+player.Silicon.spare
    player.Sulfur.Sulfur = player.Sulfur.S32+player.Sulfur.spare
    player.Argon.Argon = player.Argon.Ar36+player.Argon.spare
    player.Calcium.Calcium = player.Calcium.Ca40+player.Calcium.spare
    player.Titanium.Titanium = player.Titanium.Ti44+player.Titanium.spare
    player.Chromium.Chromium = player.Chromium.Cr48+player.Chromium.spare
    player.Iron.Iron = player.Iron.Fe52+player.Iron.spare
    player.Nickel.Nickel = player.Nickel.Ni56+player.Nickel.spare

    

    if (player.tab != "Stars") {player.Stars.selected = 0}
    if (player.subtabs.atomic.mainTabs == "Stars" && (player.navTab == "atomic"||player.tab == "atomic")) {
        player.subtabs.atomic.mainTabs = "Periodic table"
        player.navTab = "atomic"
        player.subtabs.Stars.mainTabs = "Stars"
        player.tab = "Stars"
    }
    if (player.subtabs.atomic.mainTabs == "Periodic table"&&(player.navTab == "atomic"||player.tab=="atomic")){
        player.navTab = "atomic"
    }

    else if (player.subtabs.atomic.mainTabs == "Upgrades"&&player.navTab == "atomic") {
        player.subtabs.atomic.mainTabs = "Periodic table"
        player.subtabs.Stars.mainTabs = "Upgrades"
        player.tab = "Stars"
    }

    else if (player.subtabs.Stars.mainTabs == "Stars" && player.subtabs.atomic.mainTabs == "Periodic table ") {
        player.tab = "none"
        player.subtabs.atomic.mainTabs = "Periodic table"
    }
    else {
        if (player.subtabs.atomic.mainTabs != "Periodic table"&&player.navTab=="atomic") {
            player.tab="atomic"
        }
        if (player.subtabs.atomic.mainTabs != "Stars"&&player.tab=="atomic")
        {player.navTab = "tree-tab"}
    }

    
    

    if (player.navTab == "atomic"&&player.tab=="atomic"&&player.subtabs.atomic.mainTabs == "Periodic table") {
        player.tab="none"
    }

    
},


tabFormat: {      
    "Reactions": {  
        content: [
    ["display-text",
    function() { if (hasMilestone("Progression", 0)) {return "Protium: " + player.atomic.protium + "<br>Deuterium: " + player.atomic.deuterium + "<br>Helium-3: " + player.atomic.He3+ "<br>Tritium: " + player.atomic.tritium + "<br>Helium-4: " + player.atomic.He4}
else { return "Protium: " + player.atomic.protium + "<br>Deuterium: " + player.atomic.deuterium}}],
    ["clickables", [1]],
    
],

unlocked() {
    return !hasMilestone("Progression",1)}},

"Periodic table": {
    content: [
        ["clickables", [2]],
        "grid"
    ],
    unlocked() {return hasMilestone("Progression", 1)&& (player.tab != "Stars" || player.subtabs.Stars.mainTabs != "Stars")}
    
},

"Periodic table ": {
    unlocked() {return player.tab == "Stars" && player.subtabs.Stars.mainTabs == "Stars"}
},

"Upgrades": {
    content: [
        "upgrades"
    ],
    unlocked() {return hasMilestone("Progression", 1) && !hasMilestone("Progression", 5)}
},

"Stars": {
    unlocked() {return hasMilestone("Progression", 2)&&!hasMilestone("Progression", 5)}
}

}

})

addLayer("Progression", {
    row: "side",
    color: "green",
    layerShown() {return player.atomic.unlock},
    tooltip: "",
    symbol: "Progress",
    nodeStyle: {
        'font-size': '11px',
    },
    milestones: {
        0: {
            requirementDescription: "Get both isotopes of hydrogen currently available",
            effectDescription: "Unlocks nucleosynthesis",
            done() {if (player.atomic.protium >= 1 && player.atomic.deuterium >= 1) {
                return true
            }
            else {return false}
        },
        onComplete() {player.mainDisplay = "The first atoms are beginning to form. Big bang nucleosynthesis is beginning to occur."},
    },
    1: {
        requirementDescription: "Have at least 1 of each isotope",
        effectDescription: "Unlocks stellar formation and radioactivity.",
        done() {if (player.atomic.protium >= 1 && player.atomic.deuterium >= 1 && player.atomic.tritium >= 1 && player.atomic.He3 >= 1 && player.atomic.He4 >= 1) {return true}
    
    else {return false}},
    onComplete() {player.mainDisplay = "The void is becoming not so dark..."}
        
    },
    2: {
        requirementDescription: "Get an isotope of nickel.",
        effectDescription: "Unlocks main sequence stars",
        done() {return player.Nickel.Ni56 >= 1},
        onComplete() {player.mainDisplay = "The life cycle of stars is now in full swing."
        player.atomic.accessElems.push(301, 302, 314)},
        
    },
    3: {
        requirementDescription: "Get Kamacite",
        effectDescription: "Stars waiting time is halved.",
        done() {return hasUpgrade("Stars",14)},
        onComplete() {player.Stars.time = player.Stars.time / 2
    player.mainDisplay = "Asteroids are slowly colliding with each other"}
    },
    4: {
        requirementDescription: "Get Forsterite",
        effectDescription: "Stars can get magnesium and oxgyen",
        done() {return hasUpgrade("Stars",17)},
        onComplete() {player.Stars.canGen.push(217,302)
            player.mainDisplay = "Asteroids are slowly colliding with each other"}
        
    },
    5: {
        requirementDescription: "Get all available upgrades and 10 water",
        effectDescription: "Unlock the life phase, can generate nitrogen via stars once got 1 by nucleosynthesis, can get hydrogen by stars instantly, can generate carbon via stars and halves normal star timer.",
        done() {return hasUpgrade("Stars",11) && hasUpgrade("Stars",12) && hasUpgrade("Stars",13) && hasUpgrade("Stars",14) && hasUpgrade("Stars",15) && hasUpgrade("Stars",16) && hasUpgrade("Stars",17) && hasUpgrade("Stars",18) && player.Molecules.water >= 10},
        onComplete() {player.mainDisplay = "With an atmosphere and ocean slowly forming on earth, complex reactions are taking place."
    player.Molecules.water -= 10
player.Stars.time = player.Stars.time / 2
player.Stars.canGen.push(215)
player.atomic.accessElems.push(216, 316)}
    },

    6: {
        requirementDescription: "Get RNA",
        effectDescription: "Unlock the emergence phase",
        done() {return player.Molecules.RNA},
        onComplete() {player.mainDisplay = "Life has finally arived."}
    }

}
})

addLayer("Hydrogen", {
    symbol: "H",
    startData() {return {
        hydrogen: 0,
        spare: 0,

    }},
    row: 0,
    automate() {
        if (hasMilestone("Progression", 5)&&!player.Stars.canGen.includes(101)) {player.Stars.canGen.push(101)}
    },
    layerShown: false,
    clickables: {
        11: {
            title: "Protium",
            display: "Requires 1 proton",
            canClick() {if (player.subatomic.proton >= 1||hasUpgrade("Stars",11)) {
                
                return true
            }
        else {return false}},
        onClick() {if (!hasUpgrade("Stars",11)) {
            player.subatomic.proton -= 1}
        player.atomic.protium += 1
    
    }},
12: {
    title: "Deuterium",
    display: "Requires 1 proton and 1 neutron",
    canClick() {if ((player.subatomic.proton >= 1 && player.subatomic.neutron >= 1)||hasUpgrade("Stars",11)) {
        
        return true
    }
else {return false}},
onClick() {if (!hasUpgrade("Stars",11)) {
    player.subatomic.proton -= 1
    player.subatomic.neutron -= 1}
player.atomic.deuterium += 1

}
},
13: {
    unlocked() {return hasMilestone("Progression", 0)},
    title: "Tritium",
    display: "Requires 2 deuterium but get a bonus proton",
    canClick() {if (player.atomic.deuterium >= 2) {
        
        return true
    }
else {return false}},
onClick() {player.subatomic.proton += 1
    player.atomic.deuterium -= 2
player.atomic.tritium += 1},
}},

tabFormat: [
    ["display-text",
            function() {return "Hydrogen: " + player.Hydrogen.Hydrogen + "<br>Protium: " + player.atomic.protium + "<br>Deuterium: " + player.atomic.deuterium + "<br>Tritium: " + player.atomic.tritium}],

            "clickables"
]
    
})

addNode("Exit", {
    symbol: "Exit",
    tooltip: "",
    row: "side",
    layerShown() {return player.navTab == "atomic"},
    canClick: true,
    color: "red",
    onClick() {
        player.navTab = "tree-tab"
        player.tab = "none"
    },
    nodeStyle: {
        'font-size': '18px',
    },
})

addLayer("Helium", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Helium: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            unlocked() {return hasMilestone("Progression", 0)},
            title: "Helium-3",
            display() {
            return "Requires 2 deuterium but gives a bonus neutron"
        
        },
            canClick () {return player.atomic.deuterium >= 2},
        
        onClick() {
             
        player.atomic.deuterium -= 2
        player.subatomic.neutron += 1
        player.atomic.He3 += 1
        
    }},

    12: {
        unlocked() {return hasMilestone("Progression", 0)},
        title: "Helium-4",
        display() {
        return "Requires 1 Helium-3 and 1 deuterium but gives a bonus proton"
    
    },
        canClick () {return player.atomic.He3 >= 1 && player.atomic.deuterium >= 1},
    
    onClick() {
        
            
        player.atomic.He3 -= 1
    player.atomic.deuterium -= 1
    player.atomic.He4 += 1
    player.subatomic.proton += 1
    }
    }},
    tabFormat: [
        ["display-text",
                function() {return "Helium: " + player.Helium.Helium + "<br>Helium-3: " + player.atomic.He3 + "<br>Helium-4: " + player.atomic.He4}],
    
                "clickables"
    ]
        
   

})

addLayer("Beryllium", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Be8: 0,
        Beryllium: 0,
        spare: 0,
        
    }
    },
    clickables: {
        11: {
           title: "Beryllium-8",
           display: "Requires 2 helium-4",
           canClick() {if (player.atomic.He4 >= 2) {return true}
        else {return false}},
        onClick() {player.atomic.He4 -= 2
        player.Beryllium.Be8+= 1}



        },

        
    },
    tabFormat: [
        ["display-text",
                function() {return "Beryllium: " + player.Beryllium.Beryllium + "<br>Beryllium-8: " + player.Beryllium.Be8}],
    
                "clickables"
    ]
})

addLayer("Carbon", {
    symbol: "",
    layerShown: false,
    startData() {return {
        C12: 0,
        Carbon: 0,
        spare: 0,
        subtact: 0
    }},
    clickables: {
        11: {
            title: "Carbon-12",
            display: "Requires 1 Beryllium-8 and 1 helium-4",
            canClick() {return player.Beryllium.Be8 >= 1 &&player.atomic.He4 >= 1},
            onClick() {
                player.Beryllium.Be8 -= 1
                player.atomic.He4 -= 1
                player.Carbon.C12 += 1
            }
        }

    },
    tabFormat: [
        ["display-text",
                function() {return "Carbon: " + player.Carbon.Carbon + "<br>Carbon-12: " + player.Carbon.C12}],
    
                "clickables"
    ]
})

addLayer("Neon", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Ne20: 0,
        Neon: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Neon-20",
            display: "Requires 2 carbon-12 but produces 1 Helium-4",
            canClick() {return player.Carbon.C12 >= 2},
            onClick() {
                player.Carbon.C12 -= 2
                player.Neon.Ne20 += 1
                player.atomic.He4 += 1
            }
        }
    },

    tabFormat: [
        ["display-text",
                function() {return "Neon: " + player.Neon.Neon + "<br>Neon-20: " + player.Neon.Ne20}],
                "clickables"
    ]
})

addLayer("Oxygen", {
    symbol: "",
    layerShown: false,
    startData() { return {
        O16: 0,
        oxygen: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Oxygen-16",
            display: "Requires 1 neon-20 but produces 1 helium-4",
            canClick() {return player.Neon.Ne20 >= 1},
            onClick() {
                player.Neon.Ne20 -= 1
                player.Oxygen.O16 += 1
                player.atomic.He4 += 1
            }
        }
    },

    tabFormat: [
        ["display-text",
        function() {return "Oxygen: " + player.Oxygen.Oxygen + "<br>Oxygen-16: " + player.Oxygen.O16}
    ],
    "clickables"
    ]
})

addLayer("Silicon", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Si28: 0,
        Silicon: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Silicon-28",
            display: "Requires 2 Oxygen-16 but gives 1 helium-4",
            canClick() {return player.Oxygen.O16 >= 2},
            onClick() {
                player.Oxygen.O16 -= 2
                player.Silicon.Si28 += 1
                player.atomic.He4 += 1
            }
        }
    },
    
    tabFormat: [
        ["display-text", function() {return "Silicon: " + player.Silicon.Silicon + "<br>Silicon-28: " + player.Silicon.Si28}],
        "clickables"
    ]
}),

addLayer("Sulfur", {
    symbol: "",
    layerShown: false,
    startData() {return {
        S32: 0,
        Sulfur: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Sulfur-32",
            display: "Requires 1 silicon-28 and 1 helium-4",
            canClick() {return player.Silicon.Si28 >= 1 && player.atomic.He4 >= 1},
            onClick() {
                player.Silicon.Si28 -= 1
                player.atomic.He4 -= 1
                player.Sulfur.S32 += 1
            }
        }
        
    },
    tabFormat: [
        ["display-text", function() {return "Sulfur: " + player.Sulfur.Sulfur + "<br>Sulfur-32: " + player.Sulfur.S32}],
        "clickables"
    ]
})

addLayer("Argon", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Ar36: 0,
        Argon: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Argon-36",
            display: "Requires 1 sulfur-32 and 1 helium-4",
            canClick() {return player.Sulfur.S32 >= 1 && player.atomic.He4 >= 1},
            onClick() {
                player.Sulfur.S32 -= 1
                player.atomic.He4 -= 1
                player.Argon.Ar36 += 1
            }
        }
    },
    tabFormat: [
        ["display-text", function() {return "Argon: " + player.Argon.Argon + "<br>Argon-36: " + player.Argon.Ar36}],
        "clickables"
    ]  
})

addLayer("Calcium", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Ca40: 0,
        Calcium: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Calcium-40",
            display: "Requires 1 argon-36 and 1 helium-4",
            canClick() {return player.Argon.Ar36 >= 1 && player.atomic.He4 >= 1},
            onClick() {
                player.Argon.Ar36 -= 1
                player.atomic.He4 -= 1
                player.Calcium.Ca40 += 1
            }
        }
    },
    tabFormat: [
        ["display-text", function() {return "Calcium: " + player.Calcium.Calcium + "<br>Calcium-40: " + player.Calcium.Ca40}],
        "clickables"
    ]
})

addLayer("Titanium", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Ti44: 0,
        Titanium: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Titanium-44",
            display: "Requires 1 calcium-40 and 1 helium-4",
            canClick() {return player.Calcium.Ca40 >= 1 && player.atomic.He4 >= 1},
            onClick() {
                player.Calcium.Ca40 -= 1
                player.atomic.He4 -= 1
                player.Titanium.Ti44 += 1
            }
        }
    },
    tabFormat: [
        ["display-text", function() {return "Titanium: " + player.Titanium.Titanium + "<br>Titanium-44: " + player.Titanium.Ti44}],
        "clickables"
    ]
})

addLayer("Chromium", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Cr48: 0,
        Chromium: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Chromium-48",
            display: "Requires 1 titanium-44 and 1 helium-4",
            canClick() {return player.Titanium.Ti44 >= 1 && player.atomic.He4 >= 1},
            onClick() {
                player.Titanium.Ti44 -= 1
                player.atomic.He4 -= 1
                player.Chromium.Cr48 += 1
            }
        }
    },

    tabFormat: [
        ["display-text", function() {return "Chromium: " + player.Chromium.Chromium + "<br>Chromium-48: " + player.Chromium.Cr48}],
        "clickables"
    ]
})

addLayer("Iron", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Fe52: 0,
        Iron: 0,
        spare: 0,
    }},
    clickables: {
        11: {
            title: "Iron-52",
            display: "Requires 1 chromium-48 and 1 helium-4",
            canClick() {return player.Chromium.Cr48 >= 1 && player.atomic.He4 >= 1},
            onClick() {
                player.Chromium.Cr48 -= 1
                player.atomic.He4 -= 1
                player.Iron.Fe52 += 1
            }
        }
    },
    tabFormat: [
        ["display-text", function() {return "Iron: " + player.Iron.Iron + "<br>Iron-52: " + player.Iron.Fe52}],
        "clickables"
    ]
})

addLayer("Nickel", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Ni56: 0,
        Nickel: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Nickel-56",
            display: "Requires 1 iron-52 and 1 helium-4",
            canClick() {return player.Iron.Fe52 >= 1 && player.atomic.He4 >= 1},
            onClick() {
                player.Iron.Fe52 -= 1
                player.atomic.He4 -= 1
                player.Nickel.Ni56 += 1
            }
        }
    },
    tabFormat: [
        ["display-text", function() {return "Nicekl: " + player.Nickel.Nickel + "<br>Nickel-56: " + player.Nickel.Ni56}],
        "clickables"
    ]
})

addLayer("Stars", {
    symbol: "",
    layerShown: false,
    startData() {return {
        selected: 0,
        dictionary: {0:"None", 101: "Hydrogen", 119: "Helium", 201: "Lithium", 202: "Beryllium", 214: "Boron", 215: "Carbon", 216: "Nitrogen", 217: "Oxygen", 218: "Flourine", 219: "Neon", 301: "Sodium", 302: "Magnesium", 314: "Aluminium", 315: "Silicon", 316: "Phosphorus", 317: "Sulfur", 318: "Chlorine", 319: "Argon", 401: "Potassium", 402: "Calcium", 403: "Scandium", 405: "Titanium", 406: "Vanadium", 407: "Chromium", 408: "Manganese", 409: "Iron", 410: "Cobalt", 411: "Nickel", 412: "Copper", 413: "Zinc", 414: "Gallium", 415: "Germanium", 416: "Arsenic", 417: "Selenium", 418: "Bromine", 419: "Krypton", 501: "Rubidium", 502: "Strontium", 503: "Yttrium", 505: "Zirconium", 506: "Niobium", 507: "Molybdenum", 508: "Technetium", 509: "Ruthenium", 510: "Rhodium", 511: "Palladium", 512: "Silver", 513: "Cadmium", 514: "Indium", 515: "Tin", 516: "Antimony", 517: "Tellurium", 518: "Iodine", 519: "Xenon", 601: "Caesium", 602: "Barium", 603: "Lanthanum", 605: "Hafnium", 606: "Tantalum", 607: "Tungsten", 608: "Rhenium", 609: "Osmium", 610: "Iridium", 611: "Platinum", 612: "Gold", 613: "Mercury", 614: "Thallium", 615: "Lead", 616: "Bismuth", 617: "Polonium", 618: "Astatine", 619: "Radon", 701: "Francium", 702: "Radium", 703: "Actinium", 705: "Rutherfordium", 706: "Dubnium", 707: "Seaborgium", 708: "Bohrium", 709: "Hassium", 710: "Meiternium", 711: "Darmstadtium", 712: "Roentgenium", 713: "Copernicium", 714: "Nihonium", 715: "Flerovium", 716: "Moscovium", 717: "Livermorium", 718: "Tennessine", 719: "Oganesson", 905: "Cerium", 906: "Praseodymium", 907: "Neodymium", 908: "Promethium", 909: "Samarium", 910: "Europium", 911: "Gadolinium", 912: "Terbium", 913: "Dysprosium", 914: "Holmium", 915: "Erbium", 916: "Thulium", 917: "Ytterbium", 918: "Lutetium", 1005: "Thorium", 1006: "Protactinium", 1007: "Uranium", 1008: "Neptunium", 1009: "Plutonium", 1010: "Americium", 1011: "Curium", 1012: "Berkelium", 1013: "Californium", 1014: "Einsteinium", 1015: "Fermium", 1016: "Mendelevium", 1017: "Nobelium", 1018: "Lawrencium"},
        timer: 0,
        time: 10,
        canGen: [315, 317, 319, 402, 405, 407, 409, 411],
        starGeneration: false,
        toGen: 0

    }},
    upgrades: {
        11:
        {
            
            unlocked() {return hasMilestone("Progression",1)},
            
            fullDisplay() {return "<h3>Helium hydride</h3><br><h4>The very first compound.</h4><br>Protium, deuterium and helium-3 costs nothing<br>Requires 1 helium-4 and 1 protium"},
            canAfford() {if (player.atomic.He4 >= 1 && player.atomic.protium >= 1) {return true}
        else {return false}},
        pay() {
            player.atomic.He4 -= 1
            player.atomic.protium -= 1
        }
        },
    
        12: {
            
            unlocked() {return hasMilestone("Progression", 2)},
            canAfford () {return player.Iron.Iron >= 3 && player.Nickel.Nickel >= 1},
            fullDisplay() {return "<h3>Antitaenite</h3><br>Requires 3 iron and 1 nickel"},
            pay() {
                player.Iron.spare -= 3
                player.Nickel.spare -= 1
            }
        },
    
        13: {
            unlocked() {return hasMilestone("Progression", 2)},
            canAfford() {return player.Nickel.Nickel >= 2 && player.Iron.Iron >= 1},
            fullDisplay() {return "<h3>Awaruite</h2><br>Requires 2 nickel and 1 iron"},
            pay() {
                player.Iron.spare -= 1
                player.Nickel.spare -= 2
            }
        },
    
        14: {
            unlocked() {return hasMilestone("Progression", 2)},
            canAfford() {return player.Nickel.Nickel >= 1 &&  player.Iron.Iron >= 9},
            fullDisplay() {return "<h3>Kamacite</h3><br>Requires 1 nickel and 9 iron"},
            pay() {
                player.Iron.spare -= 9
                player.Nickel.spare -= 1
            }
    
        },
    
        15: {
            unlocked() {return hasMilestone("Progression", 2)},
            canAfford() {return player.Nickel.Nickel >= 1 && player.Iron.Iron >= 1},
            fullDisplay() {return "<h3>Taenite</h3><br>Requires 1 nickel and 1 iron"},
            pay() {
                player.Iron.spare -= 1
                player.Nickel.spare -= 1
            }
        },
    
        16: {
            unlocked() {return hasMilestone("Progression", 2)},
            canAfford() {return player.Nickel.Nickel >= 1 && player.Iron.Iron >= 1},
            fullDisplay() {return "<h3>Tetrataenite</h3><br>Requires 1 nickel and 1 iron"},
            pay() {
                player.Iron.spare -= 1
                player.Nickel.spare -= 1
            }
        },
    
        17: {
            unlocked() {return hasMilestone("Progression", 2)},
            canAfford() {return player.Magnesium.Magnesium >= 2 && player.Silicon.Silicon >= 1 && player.Oxygen.Oxygen >= 4},
            fullDisplay() {return "<h3>Forsterite</h3><br>Requires 2 magnesium, 1 silicon and 4 oxygen"},
            pay() {
                player.Magnesium.spare -= 2
                player.Silicon.spare -= 1
                player.Oxygen.spare -= 4
            }
        },
    
        18: {
            unlocked() {return hasMilestone("Progression", 2)},
            canAfford() {return player.Sodium.Sodium >= 1 && player.Aluminium.Aluminium >= 1 && player.Silicon.Silicon >= 3 && player.Oxygen.Oxygen >= 8},
            fullDisplay() {return "<h3>Plagioclase</h3><br>Requires 1 sodium, 1 aluminium. 3 silicon and 8 oxygen."},
            pay() {
                player.Sodium.spare -= 1
                player.Aluminium.spare -= 1
                player.Silicon.spare -= 3
                player.Oxygen.spare -= 8
            }
        }
    },
    update(diff) {
        
        if (player.Stars.starGeneration) {
        
        if (player.Stars.timer >= 0.05) {
            
            player.Stars.timer -= 0.05
            
        }

        else {
            player[player.Stars.toGen].spare += 1
            player.Stars.timer=0
            
            doPopup("none", "Total " + player.Stars.toGen + ": " + (player[player.Stars.toGen][player.Stars.toGen]+1), player.Stars.toGen + " + 1!", 1, "white")
            player.Stars.starGeneration = false
            save()
            options['autosave'] = true
        }}
    }, 

    
    clickables: {
        11: {
            title() {
                if (!player.Stars.starGeneration) 
                {return "Generate " + player.Stars.dictionary[player.Stars.selected]}
            
            else {return "Generate " + player.Stars.toGen}},
            display() {return "Time remaining: " + player.Stars.timer.toFixed(2) + "s"},
            canClick() {return player.Stars.selected != 0 && player.Stars.timer.toFixed(2) == 0.00},
            onClick() {
                player.Stars.toGen = player.Stars.dictionary[player.Stars.selected]
                player.Stars.starGeneration = true
                options['autosave'] = false 
                
                if (player.Stars.canGen.includes (player.Stars.selected)){
                    player.Stars.timer = player.Stars.time
                    if (player.Stars.selected == 101) {player.Stars.timer = 0}}           
            }
        }

    },
    tabFormat: {

        "Stars": {
        content: [
        ["display-text", function() {return "Generate metals from stars! Select an element from the left and click the button to generate the element for free by using the power of stars! The elements that you CANNOT select are red."}],
        "clickables"],
        unlocked() {return player.subtabs.Stars.mainTabs == "Stars"}
    },

        "Upgrades": {
            content: [
                "upgrades"
            ],
            unlocked() {return player.subtabs.Stars.mainTabs == "Upgrades"}
        }
    }
})

addLayer("Magnesium", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Mg24: 0,
        Mg25: 0,
        Mg26: 0,
        Magnesium: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Magnesium-24",
            display: "Requires 1 neon-20 and 1 helium-4",
            canClick() {return player.Neon.Ne20 >= 1 && player.atomic.He4 >= 1},
            onClick() {
                player.Neon.Ne20 -= 1
                player.atomic.He4 -= 1
                player.Magnesium.Mg24 += 1
            }
        },

        12: {
            title: "Magnesium-25",
            display: "Requires 1 magnesium-24 and 1 neutron",
            canClick() {return player.Magnesium.Mg24 >= 1 && player.subatomic.neutron >= 1},
            onClick() {
                player.Magnesium.Mg24 -= 1
                player.subatomic.neutron -= 1
                player.Magnesium.Mg25 += 1
            }
        },

        13: {
            title: "Magnesium-26",
            display: "Requires 1 magnesium-25 and 1 neutron",
            canClick() {return player.Magnesium.Mg25 >= 1 && player.subatomic.neutron >= 1},
            onClick() {
                player.Magnesium.Mg25 -= 1
                player.subatomic.neutron -= 1
                player.Magnesium.Mg26 += 1
            }
        }
    },

    tabFormat: [
        ["display-text", function() {return "Magnesium: " + player.Magnesium.Magnesium + "<br>Magnesium-24: " + player.Magnesium.Mg24 + "<br>Magnesium-25: " + player.Magnesium.Mg25 + "<br>Magnesium-26: " + player.Magnesium.Mg26}],
        "clickables"
    ]
})

addLayer("Sodium", {
    symbol: "",
    layerShown: false,
    startData() {return {
        Na23: 0,
        Sodium: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Sodium-23",
            display: "Requires 2 carbon-12, but produces 1 protium",
            canClick() {return player.Carbon.C12 >= 2},
            onClick() {
                player.Carbon.C12 -= 2
                player.Sodium.Na23 += 1
                player.atomic.protium += 1
            }

        }
    },
    tabFormat: [
        ["display-text", function() {return "Sodium: " + player.Sodium.Sodium + "<br>Sodium-23: " + player.Sodium.Na23}],
        "clickables"
    ]
})

addLayer("Aluminium", {
    symbol: "",
    display: false,
    startData() {return {
        Al27: 0,
        Aluminium: 0,
        spare: 0,
        
    }},
    clickables: {
        11: {
            title: "Aluminium-27",
            display: "Requires 1 magnesium-26 and 1 proton",
            canClick() {return player.Magnesium.Mg26 >= 1 && player.subatomic.proton >= 1},
            onClick() {
                player.Magnesium.Mg26 -= 1
                player.subatomic.proton -= 1
                player.Aluminium.Al27 += 1
            }
        }
    },
    tabFormat: [
        ["display-text", function() {return "Aluminium: " + player.Aluminium.Aluminium + "<br>Aluminium-27: " + player.Aluminium.Al27}],
        "clickables"
    ]
})

addLayer("Molecules", {
    symbol: "",
    layerShown() {return hasMilestone("Progression", 3) || hasMilestone("Progression", 4)},
    row: 3,
    branches: ["atomic"],
    symbol: "Molecules",
    tooltip: "",
    nodeStyle: {
        'font-size': '18px',
    },
    startData() {return {
        water: 0,
        ribose: 0,
        methylene: 0,
        HCN: 0,
        ammonia: 0,
        adenine: 0,
        acetylene: 0,
        C3HN: 0,
        HNCO: 0,
        H2NCO: 0,
        PYU: 0,
        cytosine: 0,
        uracil: 0,
        CO: 0,
        methanol: 0,
        NO: 0,
        hydroxylamine: 0,
        formamide: 0,
        urea: 0,
        guanine: 0,
        formaldehyde: 0,
        glycolaldehyde: 0,
        phosphate: 0,
        RNA: false


    }},
    clickables: {
        11: {
            title: "Water", //simple
            display: "Requires 2 hydrogen and 1 oxygen",
            canClick() {return player.Hydrogen.Hydrogen >= 2 && player.Oxygen.Oxygen >= 1},
            onClick() {player.Molecules.water += 1
                player.Hydrogen.spare -= 2
                player.Oxygen.spare -= 1
            }

        },
        31: {
            title: "Ribose", //rna
            display: "Requires 1 formaldehyde and 2 glycolaldehyde",
            unlocked() {return hasMilestone("Progression", 5)},
            canClick() {return player.Molecules.formaldehyde >= 1 && player.Molecules.glycolaldehyde >= 2},
            onClick() {player.Molecules.ribose += 1
                player.Molecules.formaldehyde -= 1
                player.Molecules.glycolaldehyde -= 2
            }
        },

    12: {
        title: "Methylene", //simple
        display: "Requires 1 carbon and 2 hydrogen",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Carbon.Carbon >= 1 && player.Hydrogen.Hydrogen >= 2},
        onClick() {player.Molecules.methylene += 1
        player.Carbon.spare -= 1
        player.Hydrogen.spare -= 2
    }
    },

    13: {
        title: "Hydrogen cyanide", //simple
        display: "Requires 1 methylene and 1 nitrogen but gives 1 hydrogen",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.methylene >= 1 && player.Nitrogen.Nitrogen >= 1},
        onClick() {
            player.Molecules.HCN += 1
            player.Molecules.methylene -= 1
            player.Nitrogen.spare -= 1
            player.Hydrogen.spare += 1
        }
    },

    14: {
        title: "Ammonia", //simple
        display: "Requires 1 nitrogen and 3 hydrogen",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Nitrogen.Nitrogen >= 1 && player.Hydrogen.Hydrogen >= 3},
        onClick() {
            player.Molecules.ammonia += 1
            player.Nitrogen.spare -= 1
            player.Hydrogen.spare -= 3
        }
    },

    32: {
        title: "Adenine", //rna
        display: "Requires 1 ammonia, 5 hydrogen cyanides and 1 water",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.ammonia >= 1 && player.Molecules.HCN >= 5 && player.Molecules.water >= 1},
        onClick() {
            player.Molecules.adenine += 1
            player.Molecules.ammonia -= 1
            player.Molecules.HCN -= 5
            player.Molecules.water -= 1
        }
    },

    15: {
        title: "Acetylene", //simple
        display: "Requires 2 carbon and 2 hydrogen",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Carbon.Carbon >= 2 && player.Hydrogen.Hydrogen >= 2},
        onClick() {
            player.Molecules.acetylene += 1
            player.Carbon.spare -= 2
            player.Hydrogen.spare -= 2
        }
    },

    21: {
        title: "Cyanoacetylene", //intermediate
        display: "Requires 1 ammonia and 1 acetylene",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.acetylene >= 1 && player.Molecules.ammonia >= 1},
        onClick() {
            player.Molecules.C3HN += 1
            player.Molecules.acetylene -= 1
            player.Molecules.ammonia -= 1
        }
    },

    16: {
        title: "Isocyanic acid", //simple
        display: "Requires 1 hydrogen, 1 carbon, 1 oxygen and 1 nitrogen",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Hydrogen.Hydrogen >= 1 && player.Carbon.Carbon >= 1 && player.Oxygen.Oxygen >= 1 && player.Nitrogen.Nitrogen >= 1},
        onClick() {
            player.Molecules.HNCO += 1
            player.Hydrogen.spare -= 1
            player.Carbon.spare -= 1
            player.Oxygen.spare -= 1
            player.Nitrogen.spare -= 1
        }
    },

    22: {
        title: "Protonated isocyanic acid", //intermediate
        display: "Requires 1 isocyanic acid and 1 hydrogen",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.HNCO >= 1 && player.Hydrogen.Hydrogen >= 1},
        onClick() {
            player.Molecules.H2NCO+= 1
            player.Molecules.HNCO -= 1
            player.Hydrogen.spare -= 1
        }
    },

    23: {
        title: "PYU", //intermediate
        display: "Requires 1 protonared isocyanic acid and 1 cyanoacetylene",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.H2NCO >= 1 && player.Molecules.C3HN >= 1},
        onClick() {
            player.Molecules.H2NCO -= 1
            player.Molecules.C3HN -= 1
            player.Molecules.PYU += 1
        }
    },

    33: { //rna
        title: "Cytosine",
        display: "Requires 1 PYU and 1 ammonia",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.PYU >= 1 && player.Molecules.ammonia>= 1},
        onClick() {
            player.Molecules.cytosine += 1
            player.Molecules.PYU -= 1
            player.Molecules.ammonia -= 1
        }
    },

    34: { //rna
        title: "Uracil",
        display: "Requires 1 PYU and 1 water",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.PYU >= 1 && player.Molecules.water >= 1},
        onClick() {
            player.Molecules.uracil += 1
            player.Molecules.PYU -= 1
            player.Molecules.water -= 1
        }
    },

    17: { //simple
        title: "Carbon monoxide",
        display: "Requires 1 carbon and 1 oxygen",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Carbon.Carbon >= 1 && player.Oxygen.Oxygen >= 1},
        onClick() {
            player.Molecules.CO += 1
            player.Carbon.spare -= 1
            player.Oxygen.spare -= 1
        }
    },

    18: { //simple
        title: "Methanol",
        display: "Requires 1 carbon monoxide and 4 hydrogen",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.CO >= 1 && player.Hydrogen.Hydrogen >= 4},
        onClick() {
            player.Molecules.methanol += 1
            player.Molecules.CO -= 1
            player.Hydrogen.spare -= 4
        }

    },

    19: { //simple
        title: "Nitric oxide",
        display: "Requires 1 nitrogen and 1 oxygen",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Nitrogen.Nitrogen >= 1 && player.Oxygen.Oxygen >= 1},
        onClick() {
            player.Molecules.NO += 1
            player.Nitrogen.spare -= 1
            player.Oxygen.spare -= 1
        }
    },

    24: { //intermediate
        title: "Hydroxylamine",
        display: "Requires 1 nitric oxide and 3 hydrogen",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.NO >= 1 && player.Hydrogen.Hydrogen >= 3},
        onClick() {
            player.Molecules.hydroxylamine += 1
            player.Molecules.NO -= 1
            player.Hydrogen.spare -= 3
        }
    },

    25: { //intermediate
        title: "Formamide",
        display: "Requires 1 water and 1 hydrogen cyanide",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.water >= 1 && player.Molecules.HCN >= 1},
        onClick() {
            player.Molecules.water -= 1
            player.Molecules.HCN -= 1
            player.Molecules.formamide += 1
        }
    },

    26: { //intermediate
        title: "Urea",
        display: "Requires 1 formamide and 1 hydroxylamine",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.formamide >= 1 && player.Molecules.hydroxylamine >= 1},
        onClick() {
            player.Molecules.urea += 1
            player.Molecules.formamide -= 1
            player.Molecules.hydroxylamine -= 1
        }
    },

    35: { //rna
        title: "Guanine",
        display: "Requires 1 urea and 1 cyanoacetylene",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.urea >= 1 && player.Molecules.C3HN >= 1},
        onClick() {
            player.Molecules.guanine += 1
            player.Molecules.urea -= 1
            player.Molecules.C3HN -= 1
        }
    },

    36: { //rna
        title: "RNA",
        display: "Requires 1 adenine, 1 cytosine, 1 guanine, 1 uracil, 4 ribose and 4 phosphate",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.adenine >= 1 && player.Molecules.cytosine >= 1 && player.Molecules.guanine >= 1 && player.Molecules.uracil >= 1 && player.Molecules.ribose >= 4 && player.Molecules.phosphate >= 4},
        onClick() {
            player.Molecules.adenine -= 1
            player.Molecules.cytosine -= 1
            player.Molecules.guanine -= 1
            player.Molecules.uracil -= 1
            player.Molecules.ribose -= 4
            player.Molecules.phosphate -= 4
            player.Molecules.RNA = true
        }
    },

    27: { //intermediate
        title: "Glycolaldehyde",
        display: "Requires 1 methanol and 1 carbon monoxide",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.methanol >= 1 && player.Molecules.CO >= 1},
        onClick() {
            player.Molecules.glycolaldehyde += 1
            player.Molecules.methanol -= 1
            player.Molecules.CO -= 1
        }
    },

    28: { //intermediate
        title: "formaldehyde",
        display: "Requires 1 water and 1 carbon",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Molecules.water >= 1 && player.Carbon.Carbon >= 1},
        onClick() {
            player.Molecules.formaldehyde += 1
            player.Molecules.water += 1
            player.Carbon.spare -= 1
        }
    },

    41: { //simple
        title: "Phosphate",
        display: "Requires 1 phosphorus and 4 oxygen",
        unlocked() {return hasMilestone("Progression", 5)},
        canClick() {return player.Phosphorus.Phosphorus >= 1 && player.Oxygen.Oxygen >= 4},
        onClick() {
            player.Molecules.phosphate += 1
            player.Phosphorus.spare -= 1
            player.Oxygen.spare -= 4
        }
    }

    
    },
    tabFormat: {
        "Simple compounds": {
            content: [
                ["display-text", function() {return "Water: " + player.Molecules.water + "<br>Methylene: " + player.Molecules.methylene + "<br>Hydrogen cyanide: " + player.Molecules.HCN + "<br>Ammonia: " + player.Molecules.ammonia + "<br>Acetylene: " + player.Molecules.acetylene + "<br>Isocyanic acid: " + player.Molecules.HNCO + "<br>Carbon monoxide: " + player.Molecules.CO + "<br>Nitric oxide: " + player.Molecules.NO + "<br>Methanol: " + player.Molecules.methanol + "<br>Phosphate: " + player.Molecules.phosphate}],
                ["clickables", [1,4]]
            ]
        },

        "Intermediate compounds": {
            content: [
                ["display-text", function() {return "Cyanoacetylene: " + player.Molecules.C3HN + "<br>Protonated isocyanic acid: " + player.Molecules.H2NCO + "<br>PYU: " + player.Molecules.PYU + "<br>Hydroxylamine: " + player.Molecules.hydroxylamine + "<br>Formamide: " + player.Molecules.formamide + "<br>Urea: " + player.Molecules.urea+ "<br>Formaldehyde: " + player.Molecules.formaldehyde + "<br>Glycolaldehyde: " + player.Molecules.glycolaldehyde}],
                ["clickables", [2]]
            ],
            unlocked() {return hasMilestone("Progression", 5)}
        },

        "RNA": {
            content: [
                ["display-text",function() {return "Ribose: " + player.Molecules.ribose + "<br>Adenine: " + player.Molecules.adenine + "<br>Cytosine: " + player.Molecules.cytosine + "<br>Uracil: " + player.Molecules.uracil + "<br>Guanine: " + player.Molecules.guanine}],
                ["clickables", [3]]
            ],
            unlocked() {return hasMilestone("Progression", 5)}
        }
    }
})

addLayer("Nitrogen", {
    symbol: "",
    layerShown: false,
    startData() {return {
        N13: 0,
        Nitrogen: 0,
        spare: 0
    }},
    clickables: {
        11: {
            title: "Nitrogen-13",
            display: "Requires 1 carbon-12 and 1 protium",
            canClick() {return player.Carbon.C12 >= 1 && player.atomic.protium >= 1},
            onClick() {player.Nitrogen.N13 += 1
            player.Carbon.C12 -= 1
        player.atomic.protium -= 1
        if (!player.Stars.canGen.includes(216)) {player.Stars.canGen.push(216)}
    }
            
        }
    },
    

    tabFormat: [
        ["display-text", function() {return "Nitrogen: " + player.Nitrogen.Nitrogen + "<br>Nitrogen-13: " + player.Nitrogen.N13}],
        "clickables"
    ]
})

addLayer("Phosphorus", {
    symbol: "",
    layerShown: false,
    startData() { return {
        Phosphorus: 0,
        P31: 0,
        spare: 0
    }},
    clickables: {
        11: {
            title: "Phosphorus-31",
            display: "Requires 2 oxygen-16",
            canClick() {return player.Oxygen.O16 >= 2},
            onClick() {
                player.Phosphorus.P31 += 1
                player.Oxygen.O16 -= 2
                if (!player.Stars.canGen.includes(316)) {player.Stars.canGen.push(316)}
            }
        }
    },

    tabFormat: [
        ["display-text", function() {return "Phosphorus: " + player.Phosphorus.Phosphorus + "<br>Phosphorus-31: " + player.Phosphorus.P31}],
        "clickables"
    ]
})
/*
addLayer("Life", {
    symbol: "Life",
    row: 4,
    branches: ["Molecules"],
    layerShown() {return hasMilestone("Progression", 6)},
    color: "green",
    tooltip: "",
    nodeStyle: {
        'font-size': '18px',
    },
    startData() {return {
        human: false

    }},
    challenges: {
        11: {
            name: "Human",
            challengeDescription: "Create a human",
            canComplete() {return player.Life.human},
            onEnter() {
                player.navTab = "human-tab"
                player.tab = "none"
            }
        }
    }
})

addLayer("skin", {
    row: 1,
    symbol: "skin",
    nodeStyle: {
        'font-size': '18px',
    },
})

addLayer("skel", {
    row: 1,
    symbol: "skeleton",
    nodeStyle: {
        'font-size': '18px',
    },
})

addLayer("circ", {
    row: 1,
    symbol: "circulatory system",
    nodeStyle: {
        'font-size': '18px',
    },
    autoamte() {
        if (player.tab == "circ") {player.tab = "none"
    player.navTab = "circ-tab"}
    }
})

addLayer("rep", {
    row: 1,
    symbol: "repreduction system",
    nodeStyle: {
        'font-size': '18px',
    },
})

addLayer("nerv", {
    row: 1,
    symbol: "nervous system",
    nodeStyle: {
        'font-size': '18px',
    },

})

addNode("human", {
    row: 2,
    symbol: "human",
    nodeStyle: {
        'font-size': '18px',
    },
    branches: ["skin", "skel", "circ", "nerv", "rep"]
})

addLayer("heart", {
    row: 1,
    symbol: "heart",
    nodeStyle: {
        'font-size': '18px',
    },
    automate() {
        if (player.tab == "heart") {
            player.tab = "none",
            player.navTab = "heart-tab"
        }
    }
})

addLayer("circN", {
    row: 2,
    symbol: "Circulatory system",
    nodeStyle: {
        'font-size': '18px',
    },
    branches: ["heart"]
})

addLayer("Latrium", {
    row: 1,
    symbol: "Left atrium",
    nodeStyle: {
        'font-size': '18px',
    },
})

addLayer("Ratrium", {
    row: 1,
    symbol: "Right atrium",
    nodeStyle: {
        'font-size': '18px',
    },
})

addLayer("Lventricle", {
    row: 1,
    symbol: "Left ventricle",
    nodeStyle: {
        'font-size': '18px',
    },
})

addLayer("Rventricle", {
    row: 1,
    symbol: "Right ventricle",
    nodeStyle: {
        'font-size': '18px',
    },
})

addNode("heartN", {
    row: 2,
    symbol: "heart",
    nodeStyle: {
        'font-size': '18px',
    },
    branches: ["heart wall", "Latrium", "Ratrium", "Lventricle", "Rventricle"]
})

addLayer("heart wall", {
    row: 1,
    symbol: "heart wall",
    nodeStyle: {
        'font-size': '18px',
    },
})*/
