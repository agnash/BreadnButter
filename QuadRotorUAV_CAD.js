/* This is a work in progress. Copy and paste this code into editor at www.openjscad.org */

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
        color('silver', cube({size: [5, 5, 0.064]}).rotateZ(45).translate([0.375, (11 - sqrt(12.5)), -0.064])),
        color('silver', cube({size: [5, 5, 0.064]}).rotateZ(45).translate([0.375, (11 - sqrt(12.5)), 0.75])),
        // start definition of motor bay 1
        union(
            // base plate
            color('silver', cube({size: [1.75, 3, 0.064]}).translate([-0.5, -1.75, -0.064])),
            // right vertical support - boom
            difference(
                color('tan', cube({size: [0.5, 1.25, 0.75]}).translate([0.75, 0, 0])),
                cube({size: [(0.5 - 0.064), 1.25, (0.75 - (2 * 0.064))]}).translate([0.75 + 0.064, 0, 0.064])
            ),
            // right vertical support - span
            rotate([19.23, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.75, 0], [0.17 + (2 * 0.064), -1.32], [0.064, -1.32]])))).translate([0.75 + 0.064, 0, 0]),
            // right vertical support - baseplate, vertical
            rotate([0, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.17 + (2 * 0.064), 0], [2 * 0.064, -0.5], [0.064, -0.5]])))).translate([1.25, -1.25, 0]), 
            // right vertical support - baseplate, horizontal
            color('tan', cube({size: [0.5, 0.5, 0.064]}).translate([0.75, -1.75, 0])),
            // right standoff - inner
            color('green', cylinder({r: 0.125, h: 0.622})).translate([0.282 + 0.75, 0.9375, 0.064]),
            // right standoff - outer
            color('green', cylinder({r: 0.125, h: 0.622})).translate([0.282 + 0.75, 0.3125, 0.064]),
            // left vertical support - boom
            difference(
                color('tan', cube({size: [0.5, 1.25, 0.75]}).translate([-0.5, 0, 0])),
                cube({size: [(0.5 - 0.064), 1.25, (0.75 - (2 * 0.064))]}).translate([-0.5, 0, 0.064])
            ),
            // left vertical support - span
            rotate([-19.23, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.75, 0], [0.17 + (2 * 0.064), -1.32], [0.064, -1.32]])))),
            // left vertical support - baseplate, vertical
            rotate([0, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.17 + (2 * 0.064), 0], [2 * 0.064, -0.5], [0.064, -0.5]])))).translate([-0.5 + 0.064, -1.25, 0]),
            // left vertical support - baseplate, horizontal
            color('tan', cube({size: [0.5, 0.5, 0.064]}).translate([-0.5, -1.75, 0])),
            // left standoff - inner
            color('green', cylinder({r: 0.125, h: 0.622})).translate([-0.282, 0.9375, 0.064]),
            // left standoff - outer
            color('green', cylinder({r: 0.125, h: 0.622})).translate([-0.282, 0.3125, 0.064]),
            // top plate
            color('silver', cube({size: [1.75, 1.25, 0.064]}).translate([-0.5, 0, 0.75]))
        ).translate([0, 0, 0]),
        // motor bay 2
        union(
            // base plate
            color('silver', cube({size: [1.75, 3, 0.064]}).translate([-0.5, -1.75, -0.064])),
            // right vertical support - boom
            difference(
                color('tan', cube({size: [0.5, 1.25, 0.75]}).translate([0.75, 0, 0])),
                cube({size: [(0.5 - 0.064), 1.25, (0.75 - (2 * 0.064))]}).translate([0.75 + 0.064, 0, 0.064])
            ),
            // right vertical support - span
            rotate([19.23, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.75, 0], [0.17 + (2 * 0.064), -1.32], [0.064, -1.32]])))).translate([0.75 + 0.064, 0, 0]),
            // right vertical support - baseplate, vertical
            rotate([0, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.17 + (2 * 0.064), 0], [2 * 0.064, -0.5], [0.064, -0.5]])))).translate([1.25, -1.25, 0]), 
            // right vertical support - baseplate, horizontal
            color('tan', cube({size: [0.5, 0.5, 0.064]}).translate([0.75, -1.75, 0])),
            // right standoff - inner
            color('green', cylinder({r: 0.125, h: 0.622})).translate([0.282 + 0.75, 0.9375, 0.064]),
            // right standoff - outer
            color('green', cylinder({r: 0.125, h: 0.622})).translate([0.282 + 0.75, 0.3125, 0.064]),
            // left vertical support - boom
            difference(
                color('tan', cube({size: [0.5, 1.25, 0.75]}).translate([-0.5, 0, 0])),
                cube({size: [(0.5 - 0.064), 1.25, (0.75 - (2 * 0.064))]}).translate([-0.5, 0, 0.064])
            ),
            // left vertical support - span
            rotate([-19.23, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.75, 0], [0.17 + (2 * 0.064), -1.32], [0.064, -1.32]])))),
            // left vertical support - baseplate, vertical
            rotate([0, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.17 + (2 * 0.064), 0], [2 * 0.064, -0.5], [0.064, -0.5]])))).translate([-0.5 + 0.064, -1.25, 0]),
            // left vertical support - baseplate, horizontal
            color('tan', cube({size: [0.5, 0.5, 0.064]}).translate([-0.5, -1.75, 0])),
            // left standoff - inner
            color('green', cylinder({r: 0.125, h: 0.622})).translate([-0.282, 0.9375, 0.064]),
            // left standoff - outer
            color('green', cylinder({r: 0.125, h: 0.622})).translate([-0.282, 0.3125, 0.064]),
            // top plate
            color('silver', cube({size: [1.75, 1.25, 0.064]}).translate([-0.5, 0, 0.75]))
        ).rotateZ(90).translate([11.375, 10.625, 0]),
        // motor bay 3
        union(
            // base plate
            color('silver', cube({size: [1.75, 3, 0.064]}).translate([-0.5, -1.75, -0.064])),
            // right vertical support - boom
            difference(
                color('tan', cube({size: [0.5, 1.25, 0.75]}).translate([0.75, 0, 0])),
                cube({size: [(0.5 - 0.064), 1.25, (0.75 - (2 * 0.064))]}).translate([0.75 + 0.064, 0, 0.064])
            ),
            // right vertical support - span
            rotate([19.23, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.75, 0], [0.17 + (2 * 0.064), -1.32], [0.064, -1.32]])))).translate([0.75 + 0.064, 0, 0]),
            // right vertical support - baseplate, vertical
            rotate([0, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.17 + (2 * 0.064), 0], [2 * 0.064, -0.5], [0.064, -0.5]])))).translate([1.25, -1.25, 0]), 
            // right vertical support - baseplate, horizontal
            color('tan', cube({size: [0.5, 0.5, 0.064]}).translate([0.75, -1.75, 0])),
            // right standoff - inner
            color('green', cylinder({r: 0.125, h: 0.622})).translate([0.282 + 0.75, 0.9375, 0.064]),
            // right standoff - outer
            color('green', cylinder({r: 0.125, h: 0.622})).translate([0.282 + 0.75, 0.3125, 0.064]),
            // left vertical support - boom
            difference(
                color('tan', cube({size: [0.5, 1.25, 0.75]}).translate([-0.5, 0, 0])),
                cube({size: [(0.5 - 0.064), 1.25, (0.75 - (2 * 0.064))]}).translate([-0.5, 0, 0.064])
            ),
            // left vertical support - span
            rotate([-19.23, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.75, 0], [0.17 + (2 * 0.064), -1.32], [0.064, -1.32]])))),
            // left vertical support - baseplate, vertical
            rotate([0, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.17 + (2 * 0.064), 0], [2 * 0.064, -0.5], [0.064, -0.5]])))).translate([-0.5 + 0.064, -1.25, 0]),
            // left vertical support - baseplate, horizontal
            color('tan', cube({size: [0.5, 0.5, 0.064]}).translate([-0.5, -1.75, 0])),
            // left standoff - inner
            color('green', cylinder({r: 0.125, h: 0.622})).translate([-0.282, 0.9375, 0.064]),
            // left standoff - outer
            color('green', cylinder({r: 0.125, h: 0.622})).translate([-0.282, 0.3125, 0.064]),
            // top plate
            color('silver', cube({size: [1.75, 1.25, 0.064]}).translate([-0.5, 0, 0.75]))
        ).rotateZ(180).translate([0.75, 22, 0]),
        // motor bay 4
        union(
            // base plate
            color('silver', cube({size: [1.75, 3, 0.064]}).translate([-0.5, -1.75, -0.064])),
            // right vertical support - boom
            difference(
                color('tan', cube({size: [0.5, 1.25, 0.75]}).translate([0.75, 0, 0])),
                cube({size: [(0.5 - 0.064), 1.25, (0.75 - (2 * 0.064))]}).translate([0.75 + 0.064, 0, 0.064])
            ),
            // right vertical support - span
            rotate([19.23, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.75, 0], [0.17 + (2 * 0.064), -1.32], [0.064, -1.32]])))).translate([0.75 + 0.064, 0, 0]),
            // right vertical support - baseplate, vertical
            rotate([0, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.17 + (2 * 0.064), 0], [2 * 0.064, -0.5], [0.064, -0.5]])))).translate([1.25, -1.25, 0]), 
            // right vertical support - baseplate, horizontal
            color('tan', cube({size: [0.5, 0.5, 0.064]}).translate([0.75, -1.75, 0])),
            // right standoff - inner
            color('green', cylinder({r: 0.125, h: 0.622})).translate([0.282 + 0.75, 0.9375, 0.064]),
            // right standoff - outer
            color('green', cylinder({r: 0.125, h: 0.622})).translate([0.282 + 0.75, 0.3125, 0.064]),
            // left vertical support - boom
            difference(
                color('tan', cube({size: [0.5, 1.25, 0.75]}).translate([-0.5, 0, 0])),
                cube({size: [(0.5 - 0.064), 1.25, (0.75 - (2 * 0.064))]}).translate([-0.5, 0, 0.064])
            ),
            // left vertical support - span
            rotate([-19.23, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.75, 0], [0.17 + (2 * 0.064), -1.32], [0.064, -1.32]])))),
            // left vertical support - baseplate, vertical
            rotate([0, -90, 0], color('tan', linear_extrude({height: 0.064}, polygon([[0.064, 0], [0.17 + (2 * 0.064), 0], [2 * 0.064, -0.5], [0.064, -0.5]])))).translate([-0.5 + 0.064, -1.25, 0]),
            // left vertical support - baseplate, horizontal
            color('tan', cube({size: [0.5, 0.5, 0.064]}).translate([-0.5, -1.75, 0])),
            // left standoff - inner
            color('green', cylinder({r: 0.125, h: 0.622})).translate([-0.282, 0.9375, 0.064]),
            // left standoff - outer
            color('green', cylinder({r: 0.125, h: 0.622})).translate([-0.282, 0.3125, 0.064]),
            // top plate
            color('silver', cube({size: [1.75, 1.25, 0.064]}).translate([-0.5, 0, 0.75]))
        ).rotateZ(-90).translate([-10.625, 11.375, 0]),
        // inner landing gear support - 1
        union(
            // right
            difference(
                cube({size: [1.5, 2, 0.064]}),
                cube({size: [1, 1.5, 0.064]}).translate([0, 0.5, 0])
            ).rotateY(90).translate([0.75, 0, 0.75]),
            // left
            difference(
                cube({size: [1.5, 2, 0.064]}),
                cube({size: [1, 1.5, 0.064]}).translate([0, 0.5, 0])
            ).rotateY(90).translate([-0.064, 0, 0.75]),
            // cross spacer
            color('green', cylinder({r: 0.125, h: 0.75})).rotateY(90).translate([0, 0.25, -0.5])
        ).translate([0, 7, 0]),
        // inner landing gear support - 2
        union(
            // right
            difference(
                cube({size: [1.5, 2, 0.064]}),
                cube({size: [1, 1.5, 0.064]}).translate([0, 0.5, 0])
            ).rotateY(90).translate([0.75, 0, 0.75]),
            // left
            difference(
                cube({size: [1.5, 2, 0.064]}),
                cube({size: [1, 1.5, 0.064]}).translate([0, 0.5, 0])
            ).rotateY(90).translate([-0.064, 0, 0.75]),
            // cross spacer
            color('green', cylinder({r: 0.125, h: 0.75})).rotateY(90).translate([0, 0.25, -0.5])
        ).rotateZ(90).translate([11.375 - 7, 10.625, 0]),
        // inner landing gear support - 3
        union(
            // right
            difference(
                cube({size: [1.5, 2, 0.064]}),
                cube({size: [1, 1.5, 0.064]}).translate([0, 0.5, 0])
            ).rotateY(90).translate([0.75, 0, 0.75]),
            // left
            difference(
                cube({size: [1.5, 2, 0.064]}),
                cube({size: [1, 1.5, 0.064]}).translate([0, 0.5, 0])
            ).rotateY(90).translate([-0.064, 0, 0.75]),
            // cross spacer
            color('green', cylinder({r: 0.125, h: 0.75})).rotateY(90).translate([0, 0.25, -0.5])
        ).rotateZ(180).translate([0.75, 22 - 7, 0]),
        // inner landing gear support - 4
        union(
            // right
            difference(
                cube({size: [1.5, 2, 0.064]}),
                cube({size: [1, 1.5, 0.064]}).translate([0, 0.5, 0])
            ).rotateY(90).translate([0.75, 0, 0.75]),
            // left
            difference(
                cube({size: [1.5, 2, 0.064]}),
                cube({size: [1, 1.5, 0.064]}).translate([0, 0.5, 0])
            ).rotateY(90).translate([-0.064, 0, 0.75]),
            // cross spacer
            color('green', cylinder({r: 0.125, h: 0.75})).rotateY(90).translate([0, 0.25, -0.5])
        ).rotateZ(-90).translate([-10.625 + 7, 11.375, 0])
    );
}
