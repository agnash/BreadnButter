/* This is a work in progress. Copy and paste this code into editor at www.openjscad.org */

function getParameterDefinitions() {
  return [
    { name: 'mLength', type: 'float', initial: 18, caption: "Motor-to-motor distance:"},
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
    var quad = makeQuad(params.mLength, params.battLength, params.battWidth, params.battHeight, params.plateThickness);
    return quad;
}

function makeQuad(mLength, battLength, battWidth, battHeight, plateThickness) {
    var booms = makeBooms(mLength, plateThickness);
    var model = union(
        booms
    );
    return model;
}

function makeBooms(mLength, plateThickness) {
    var arms = union(
        difference(
            cube({size: [0.75, mLength, 0.75]}),
            cube({size: [0.75 - (2 * plateThickness), mLength, 0.75 - (2 * plateThickness)]}).translate([plateThickness, 0, plateThickness])
        ),
        difference(
            cube({size: [(mLength - 0.75) / 2, 0.75, 0.75]}),
            cube({size: [(mLength - 0.75) / 2, 0.75 - (2 * plateThickness), 0.75 - (2 * plateThickness)]}).translate([0, plateThickness, plateThickness])
        ).translate([-(mLength - 0.75) / 2, (mLength - 0.75) / 2, 0]),
        difference(
            cube({size: [(mLength - 0.75) / 2, 0.75, 0.75]}),
            cube({size: [(mLength - 0.75) / 2, 0.75 - (2 * plateThickness), 0.75 - (2 * plateThickness)]}).translate([0, plateThickness, plateThickness])
        ).translate([0.75, (mLength - 0.75) / 2, 0])
    );
    echo("**********Boom arms**********");
    echo("Boom arm 1: " + mLength + " inches");
    echo("Boom arm 2: " + ((mLength - 0.75) / 2) + " inches");
    echo("Boom arm 3: " + ((mLength - 0.75) / 2) + " inches");
    return arms;
}
