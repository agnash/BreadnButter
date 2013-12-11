/* This is a work in progress. Copy and paste this code into editor at www.openjscad.org */

function getParameterDefinitions() {
  return [
    { name: 'mDiameter', type: 'float', initial: 35.0, caption: "Motor diameter (mm):"},
    { name: 'mMountWidth', type: 'float', initial: 58.0, caption: "Motor mount diameter (mm):"},
    { name: 'mLength', type: 'float', initial: 20, caption: "Motor-to-motor distance:"},
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
    this.plate = difference(
        cube({size: [this.length, this.width, this.thickness]})
    );
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


function makeQuad(mDiameter, mMountWidth, mLength, battLength, battWidth, battHeight, plateThickness) {
    var plateLow = makeLowerPlate(4, 6, plateThickness);
    var booms = makeBooms(mLength, plateThickness);
    //var bays = makeEngineBays(mMountWidth, mLength);
    var model = union(
        plateLow,
        booms
    );
    return model;
}

/*
function makeEngineBays(mMountWidth, mLength) {

}
*/

function makeLowerPlate(length, width, thickness) {
    var plateL = new lowerPlate(length, width, thickness);
    return plateL.plate.translate([-length / 2, 0, -0.064]);
}

function makeBooms(mLength, plateThickness) {
    // define arm lengths
    var longLength = mLength;
    var shortLength = (mLength - 0.75) / 2;
    // generate arm objects
    var longArm = new boomArm(longLength);
    var shortArm1 = new boomArm(shortLength);
    var shortArm2 = new boomArm(shortLength);
    //...
    return union(
        longArm.arm,
        shortArm1.arm.rotateZ(90).translate([shortLength + longArm.width, shortLength, 0]),
        shortArm2.arm.rotateZ(90).translate([0, shortLength, 0])
    ).rotateZ(45).translate([sqrt(pow(shortLength, 2) + pow(shortLength, 2)) / 2, 0, 0]);
}
