import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Container, Tooltip } from './styles';
import 'mapbox-gl/dist/mapbox-gl.css';

import Cluster from '../Cluster/Cluster';
import Pin from './Pin';
import { PinGroup } from 'supercluster';




//GEOJSON NEIGHBORHOODS
import { defaultMapStyle, dataLayer } from './GeoJson/map-style';
import { fromJS } from 'immutable';

import data from '../../MockedData/neighborhoods';
import Boundaries from '../../MockedData/NeighborhoodGeoJson.js';


import { isInside, pointBelongsTo } from '../../utils/MapCalculus';
import {
    injectDensityProperties,
    injectRelativeDensityByTypeProperties,
    injectIndexNaturaUltra,
    injectPnudFieldProperties,
    updatePercentiles,
} from '../../utils/neighborhood';

import { fetchMarkers, fetchMarkersByNeighborhood } from '../../stores/actions/markersActions';
import { fetchPnudDataByField } from '../../stores/actions/pnudActions';

const MAPBOX_API_KEY = 'pk.eyJ1IjoiZnNzYW50b3MiLCJhIjoiY2pvYnRpbG03MjZkNTNxcGFmZGdkam1oOSJ9.4hi5rcuE_LMmsppDRezm2A'

export class Map extends Component {


    state = {
        map: null,
        mapStyle: defaultMapStyle,
        viewport: {
            width: 700,
            height: 500,
            latitude: -30.0346,
            longitude: -51.2177,
            zoom: 12
        },
        markerFilter: 'ULTRA',
        densityFilter: 'indexNaturaUltra',
        mapVariable: null,
        geoJson: null,
        hoveredFeature: null,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };


    shouldUpdateMapVariable = (variable) => {
        const { mapVariable } = this.state;
        if (variable === 'NONE' || variable === mapVariable) {
            console.log('should not update');
            return false;
        }
        this.setState({ mapVariable: variable }, () => {
            const injectedGeoJson = injectPnudFieldProperties(variable, this.props.pnud, data);
            updatePercentiles(injectedGeoJson, f => f.properties.field[variable]);
            this.loadGeoJson(injectedGeoJson);

        })

    }

    componentDidMount = async () => {

        await this.props.fetchMarkers();
        const typeOfSearch = '';


        switch (typeOfSearch) {
            case 'MARKERS': {

                break;


            }
            case 'DENSITY': {
                await this.props.fetchMarkersByNeighborhood('DENSITY')
                const injectedGeoJson = injectDensityProperties(this.props.markersByNeighborhood, data);
                updatePercentiles(injectedGeoJson, f => f.properties.density[this.state.densityFilter]);
                this.loadGeoJson(injectedGeoJson);
                break;
            }
            case 'RELATIVE_DENSITY_BY_TYPE': {
                await this.props.fetchMarkersByNeighborhood('RELATIVE_DENSITY_BY_TYPE')
                const injectedGeoJson = injectRelativeDensityByTypeProperties(this.props.markersByNeighborhood, data);
                updatePercentiles(injectedGeoJson, f => f.properties.density[this.state.densityFilter]);
                this.loadGeoJson(injectedGeoJson);
                break;
            }
            case 'RELATIVE_DENSITY_BY_RDPCULATION': {
                await this.props.fetchMarkersByNeighborhood('RELATIVE_DENSITY_BY_RDPCULATION')
                const injectedGeoJson = injectRelativeDensityByTypeProperties(this.props.markersByNeighborhood, data);
                updatePercentiles(injectedGeoJson, f => f.properties.density[this.state.densityFilter]);
                this.loadGeoJson(injectedGeoJson);
                break;
            }
            case 'INDEX_NATURA_ULTRA': {
                await this.props.fetchMarkersByNeighborhood('DENSITY')
                const injectedGeoJson = injectIndexNaturaUltra(this.props.markersByNeighborhood, data);
                updatePercentiles(injectedGeoJson, f => f.properties.density[this.state.densityFilter]);
                this.loadGeoJson(injectedGeoJson);
                break;
            }
            default: {
                return
            }
        }


    }

    loadGeoJson = (geoJson) => {
        const mapStyle = defaultMapStyle
            // Add geojson source to map
            .setIn(['sources', 'incomeByState'], fromJS({ type: 'geojson', data: geoJson }))
            // Add point layer to map
            .set('layers', defaultMapStyle.get('layers').push(dataLayer));

        this.setState({ geoJson, mapStyle });
    }

    _onHover = event => {
        const { features, srcEvent: { offsetX, offsetY } } = event;
        const hoveredFeature = features && features.find(f => f.layer.id === 'data');

        this.setState({ hoveredFeature, x: offsetX, y: offsetY });
    };

    _renderTooltip() {
        const { hoveredFeature, densityFilter, x, y } = this.state;

        return hoveredFeature && (
            <Tooltip className="tooltip" style={{ left: x, top: y }}>
                <div>Neighborhood: {hoveredFeature.properties.name}</div>
                <div>{densityFilter}: {hoveredFeature.properties.value}</div>
                <div>Percentile: {hoveredFeature.properties.percentile / 8 * 100}</div>
            </Tooltip>
        );
    }


    render() {
        const { mapStyle, map } = this.state;
        const markerFilter = this.props.toolBar.type;
        const mapVariable = this.props.toolBar.variable;
        this.shouldUpdateMapVariable(mapVariable);
        const { markers } = this.props;
        const filteredMarkers = markers.filter(e => e.type === markerFilter);
        return (
            <Container>
                <ReactMapGL
                    {...this.state.viewport}
                    ref={ref => (this.mapRef = ref)}
                    onLoad={() => this.setState({ map: this.mapRef.getMap() })}
                    onViewportChange={(viewport) => this.setState({ viewport })}
                    mapboxApiAccessToken={MAPBOX_API_KEY}
                    mapStyle={mapStyle}
                //onHover={this._onHover}
                >
                    {map &&
                        (<Cluster
                            map={map}
                            maxZoom={14}
                            radius={50}
                            extent={512}
                            nodeSize={40}
                            element={clusterProps => (
                                <Pin totalN={filteredMarkers.length} color={'green'} onViewportChange={(viewport) => this.setState({ viewport })} {...clusterProps} />
                            )}
                        >

                            {
                                filteredMarkers.map((e, i) => {
                                    return (
                                        <Marker key={i} latitude={parseFloat(e.lng)} longitude={parseFloat(e.lat)}
                                        >
                                        </Marker>)
                                })
                            }
                        </Cluster>
                        )}

                    {/*                     {this._renderTooltip()} */}
                </ReactMapGL>
            </Container >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        markers: state.markersReducer.data,
        markersByNeighborhood: state.markersReducer.markersByNeighborhood,
        toolBar: state.toolBarReducer,
        pnud: state.pnudReducer.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMarkers: () => { return dispatch(fetchMarkers()) },
        fetchMarkersByNeighborhood: (type) => { return dispatch(fetchMarkersByNeighborhood(type)) },
        fetchPnudDataByField: (field) => { return dispatch(fetchPnudDataByField(field)) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Map);
