import { consolidateStreamedStyles } from "styled-components";

export const isInside = (point, vs) => {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};


export const pointBelongsTo = (point, neighborhoods) => {
    console.log(point);
    console.log(neighborhoods);

    let belongsTo = 'aaa';
    neighborhoods.map((neighborhood, i) => {
        neighborhood.polygons.map(region => {
            let regionArr = []
            region.map(polygon => {
                const arr = [polygon.lat, polygon.lng];
                regionArr = [...regionArr, arr]
            })
            if (isInside(point, regionArr)) {
                belongsTo = neighborhood.id
            }
        })

    })
    console.log(belongsTo);
}