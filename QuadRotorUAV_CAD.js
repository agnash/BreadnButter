/* copy and paste this code into editor at www.openjscad.org */

function main() {
    return union(
        color('pink', difference(
            cube({size: [0.75, 22, 0.75]}),
            cube({size: [0.625, 22, 0.625]}).translate([0.0625, 0, 0.0625])
        )),
        color('gold', difference(
            cube({size: [10.625, 0.75, 0.75]}),
            cube({size: [10.625, 0.625, 0.625]}).translate([0, 0.0625, 0.0625])
        ).translate([0.75, 10.625, 0])),
        difference(
            cube({size: [10.625, 0.75, 0.75]}),
            cube({size: [10.625, 0.625, 0.625]}).translate([0, 0.0625, 0.0625])
        ).translate([-10.625, 10.625, 0]),
        color('green', cube({size: [5, 5, 0.1]}).rotateZ(45).translate([0.375, (11 - sqrt(12.5)), -0.1])),
        color('tan', cube({size: [5, 5, 0.1]}).rotateZ(45).translate([0.375, (11 - sqrt(12.5)), 0.75]))
    );
}
