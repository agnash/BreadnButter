/* This is a work in progress. Copy and paste this code into editor at www.openjscad.org */

function getParameterDefinitions() {
  return [
    { name: 'mDiameter', type: 'float', initial: 35.0, caption: "Motor diameter (mm):"},
    { name: 'mMountWidth', type: 'float', initial: 58.0, caption: "Motor mount diameter (mm):"},
    { name: 'mLength', type: 'float', initial: 17.5, caption: "Motor-to-motor distance:"},
    { name: 'battLength', type: 'float', initial: 5.0, caption: "Length of battery:" },
    { name: 'battWidth', type: 'float', initial: 2.0, caption: "Width of battery:" },
    { name: 'battHeight', type: 'float', initial: 1.0, caption: "Height of battery:" },
    { name: 'plateThickness', type: 'float', initial: 0.064, caption: "Aluminum plate thickness:" }
  ];
}

function main(params) {
    echo("Motor-to-motor distance: " + params.mLength);
    echo("Length of battery: " + params.battLength);
    echo("Width of battery: " + params.battWidth);
    echo("Height of battery: " + params.battHeight);
    echo("Aluminum plate thickness: " + params.plateThickness);
    var quad = makeQuad(params.mDiameter, params.mMountWidth, params.mLength, params.battLength, params.battWidth, params.battHeight, params.plateThickness);
    return quad;
}

// lower frame plate object constructor
function lowerPlate(length, width, thickness) {
    this.length = length;
    this.width = width;
    this.thickness = thickness;
    this.plate = color('gray', difference(
        cube({size: [this.length, this.width, this.thickness]})
    ));
    
}

// upper frame plate object constructor
function upperPlate(length, width, thickness, cutout) {
    this.length = length;
    this.width = width;
    this.thickness = thickness;
    this.cutout = cutout;
    this.plate = color('silver', difference(
        cube({size: [this.length, this.width, this.thickness]}),
        cube({size: [this.length - 2*0.5, this.cutout, this.thickness]}).translate([0.5, this.width - this.cutout, 0])
    ));
}

// boom arm object constructor
function boomArm(length) {
    this.length = length;
    this.width = 0.75;
    this.arm = difference(
        cube({size: [this.width, this.length, this.width]}),
        cube({size: [this.width - (2 * 0.064), this.length, this.width - (2 * 0.064)]}).translate([0.064, 0, 0.064])
    );
}

// standoff object constructor
function standoff(height) {
    this.height = height;
    this.standoff = color('green', difference(
        cylinder({r: 0.125, h: this.height}),
        cylinder({r: 0.0625, h: this.height})
    ));
}

// battery plate object constructor
function batteryPlate(length, width, thickness) {
    this.length = length;
    this.width = width;
    this.thickness = thickness;
    this.plate = color('orange', cube({size: [this.length, this.width, this.thickness]}));
}


function makeQuad(mDiameter, mMountWidth, mLength, battLength, battWidth, battHeight, plateThickness) {
    var plateLength = 4;
    var plateWidth = 6;
    var cutout = 1.5;
    var camSpace = 1;
    var refHeight = 4.5;    // temporary battery/payload height reference height
    var heightReference = color('black', cylinder({r: 0.125, h: refHeight}));   // temporary battery/payload height reference cylinder
    var battPlate = makeBattPlate(plateWidth, camSpace);
    var plateLow = makeLowerPlate(plateLength, plateWidth, plateThickness);
    var booms = makeBooms(mLength, plateThickness, plateLength);
    var plateHigh = makeUpperPlate(plateLength, plateWidth, plateThickness, cutout);
    var standoffs = makeStandoffs();
    //var bays = makeEngineBays(mMountWidth, mLength);
    var model = union(
        heightReference.translate([0, 2, -(refHeight + plateThickness)]),
        battPlate,
        plateLow,
        booms,
        plateHigh,
        standoffs
    );
    return model;
}

/*
function makeEngineBays(mMountWidth, mLength) {

}
*/

function makeBattPlate(width, cutout) {
    var length = 2;
    var adjustedWidth = width - cutout;
    var thickness = 0.125;
    var drop = 1.25;
    var plateB = new batteryPlate(length, adjustedWidth, thickness);
    return plateB.plate.translate([-length / 2, cutout, -(drop + 0.064)]);
}

function makeLowerPlate(length, width, thickness) {
    var plateL = new lowerPlate(length, width, thickness);
    return plateL.plate.translate([-length / 2, 0, -0.064]);
}

function makeBooms(mLength, plateThickness, plateLength) {
    // define arm lengths
    var longLength = mLength;
    var shortLength = (mLength - 0.75) / 2;
    var shift = plateLength / 2;
    // generate arm objects
    var longArm = new boomArm(longLength);
    var shortArm1 = new boomArm(shortLength);
    var shortArm2 = new boomArm(shortLength);
    //...
    return union(
        longArm.arm,
        shortArm1.arm.rotateZ(90).translate([shortLength + longArm.width, shortLength, 0]),
        shortArm2.arm.rotateZ(90).translate([0, shortLength, 0])
    ).rotateZ(45).translate([sqrt(pow(shortLength, 2) + pow(shortLength, 2)) / 2, -1*(sqrt((pow(mLength / 2, 2)) / 2) - (shift - (sqrt(pow(0.75, 2)/2)/2))), 0]);
}

function makeUpperPlate(length, width, thickness, cutout) {
    var plateH = new upperPlate(length, width, thickness, cutout);
    return plateH.plate.translate([-length / 2, 0, 0.75]);
}

function makeStandoffs() {
    var fromEdge = 0.25;
    var frameSpace = 0.75;
    var battSpace = 1.25;
    var frameSpacer = new standoff(frameSpace);
    var battSpacer = new standoff(battSpace);
    return union(
        frameSpacer.standoff.translate([0, fromEdge, 0]),                                   // frame spacer: bow
        frameSpacer.standoff.translate([2 - fromEdge, 2, 0]),                               // frame spacer: port
        frameSpacer.standoff.translate([0, 4 - fromEdge, 0]),                               // frame spacer: stern
        frameSpacer.standoff.translate([-(2 - fromEdge), 2, 0]),                            // frame spacer: starboard
        frameSpacer.standoff.translate([2 - fromEdge, 4.5 + fromEdge, 0]),                  // frame spacer: port quarter fore
        frameSpacer.standoff.translate([2 - fromEdge, 6 - fromEdge, 0]),                    // frame spacer: port quarter aft
        frameSpacer.standoff.translate([-(2 - fromEdge), 4.8, 0]),                          // frame spacer: starboard quarter fore
        frameSpacer.standoff.translate([-(2 - fromEdge), 5.7, 0]),                          // frame spacer: starboard quarter aft
        battSpacer.standoff.translate([1 - fromEdge, 1 + fromEdge, -(battSpace + 0.064)]),  // battery spacer: port bow
        battSpacer.standoff.translate([-1 + fromEdge, 1 + fromEdge, -(battSpace + 0.064)]), // battery spacer: starboard bow
        battSpacer.standoff.translate([1 - fromEdge, 3 - fromEdge, -(battSpace + 0.064)]),  // battery spacer: port quarter
        battSpacer.standoff.translate([-1 + fromEdge, 3 - fromEdge, -(battSpace + 0.064)])  // battery spacer: starboard quarter
    );
}
