import { range } from 'd3-array';
import { scaleQuantile } from 'd3-scale';

export const injectDensityProperties = (propsArray, geoJsonData) => {
    const features = geoJsonData.features.map((e, i) => {
        return {
            ...e,
            properties: {
                ...e.properties,
                density: {
                    nOfULTRA: propsArray[i].ULTRA,
                    nOfMIX: propsArray[i].MIX,
                    nOfNATURA: propsArray[i].NATURA,
                }

            }
        }

    })
    return {
        type: 'FeatureCollection',
        features
    };
}

export const injectRelativeDensityByTypeProperties = (propsArray, geoJsonData) => {
    const features = geoJsonData.features.map((e, i) => {
        return {
            ...e,
            properties: {
                ...e.properties,
                density: {
                    avgOfULTRA: propsArray[i].ULTRA,
                    avgOfMIX: propsArray[i].MIX,
                    avgOfNATURA: propsArray[i].NATURA,
                }

            }
        }

    })
    return {
        type: 'FeatureCollection',
        features
    };
}

export const injectIndexNaturaUltra = (propsArray, geoJsonData) => {
    const features = geoJsonData.features.map((e, i) => {
        return {
            ...e,
            properties: {
                ...e.properties,
                density: {
                    indexNaturaUltra:
                        propsArray[i].ULTRA === 0 || propsArray[i].NATURA === 0 ? 0
                            : propsArray[i].ULTRA === null || propsArray[i].NATURA === null ? 0
                                : propsArray[i].NATURA / propsArray[i].ULTRA,

                }

            }
        }

    })
    return {
        type: 'FeatureCollection',
        features
    };
}

export const injectPnudFieldProperties = (field, propsArray, geoJsonData) => {
    const features = geoJsonData.features.map((e, i) => {
        return {
            ...e,
            properties: {
                ...e.properties,
                field: {
                    [field]: propsArray[i][field],
                }

            }
        }

    })
    return {
        type: 'FeatureCollection',
        features
    };
}

export function updatePercentiles(featureCollection, accessor) {
    const { features } = featureCollection;
    const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
    features.forEach(f => {
        const value = accessor(f);
        f.properties.value = value;
        f.properties.percentile = scale(value);
    });
}