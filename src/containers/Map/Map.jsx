import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Container, Tooltip } from './styles';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './Pin';



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
    updatePercentiles,    
} from '../../utils/neighborhood';

import { fetchMarkers, fetchMarkersByNeighborhood } from '../../stores/actions/markersActions';

const MAPBOX_API_KEY = 'pk.eyJ1IjoiZnNzYW50b3MiLCJhIjoiY2pvYnRpbG03MjZkNTNxcGFmZGdkam1oOSJ9.4hi5rcuE_LMmsppDRezm2A'

export class Map extends Component {

    state = {
        mapStyle: defaultMapStyle,
        viewport: {
            width: '90%',
            height: 500,
            latitude: -30.0346,
            longitude: -51.2177,
            zoom: 12
        },
        densityFilter: 'avgOfNATURA',
        geoJson: null,
        hoveredFeature: null,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    componentDidMount = async () => {

        const typeOfSearch = 'RELATIVE_DENSITY_BY_POPULATION';

        switch (typeOfSearch) {
            case 'MARKERS': {
                //this.props.fetchMarkers();
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
            case 'RELATIVE_DENSITY_BY_POPULATION': {
                await this.props.fetchMarkersByNeighborhood('RELATIVE_DENSITY_BY_POPULATION')
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
        const { mapStyle } = this.state;
        const { markers } = this.props;
        return (
            <Container>
                <ReactMapGL
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({ viewport })}
                    mapboxApiAccessToken={MAPBOX_API_KEY}
                    mapStyle={mapStyle}
                    onHover={this._onHover}>
                    {/*                     {
                        markers.map((e, i) => {
                            return (
                                <Marker key={i} latitude={parseFloat(e.lng)} longitude={parseFloat(e.lat)}
                                >
                                    <Pin color={
                                        e.type === 'ULTRA' ? 'red'
                                            : e.type === 'MIX' ? 'yellow'
                                                : e.type === 'NATURA' ? 'gren' :
                                                    'black'
                                    }
                                        size={10} />
                                </Marker>)
                        })
                    } */}
                    {this._renderTooltip()}
                </ReactMapGL>


            </Container >
        );
    }

    handlePolygonClick = (props, polygon, e) => {
        this.setState({
            selectedPlace: props,
            infoWindowPosition: props.paths[0],
            showingInfoWindow: true,
        })
    };


    handleRawData = () => {
        const { list } = Boundaries;

        const finalObject = {
            type: "FeatureCollection",
            features: []
        }

        let sanitazedList = []

        list.map((boundarie, i) => {
            let b = {
                type: 'Feature',
                properties: {
                    id: '',
                    name: '',
                },
                geometry: {}
            }

            b.properties.id = i + 1;
            b.properties.name = boundarie[1];
            b.geometry = JSON.parse(boundarie[2]);
            sanitazedList.push(b);
        })

        finalObject.features = sanitazedList;

        return finalObject;
    }
}

const mapStateToProps = (state) => {
    return {
        markers: state.markersReducer.data,
        markersByNeighborhood: state.markersReducer.markersByNeighborhood,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMarkers: () => { return dispatch(fetchMarkers()) },
        fetchMarkersByNeighborhood: (type) => { return dispatch(fetchMarkersByNeighborhood(type)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Map);



                                    /* Google Maps implementantion
                                             const PNUD_data = this.handleRawData();
                    const {markers} = this.props;




    //Função para retornar ponto vs bairro;
    //const point = [-30.04431, -51.18637]
    //const point_belongs_to = pointBelongsTo(point, PNUD_data);
                <ReactMapGL
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({ viewport })}
                    mapboxApiAccessToken={MAPBOX_API_KEY}
                    mapStyle={mapStyle}>

                    {
                        markers.map((e, i) => {
                            return (
                                <Marker key={i} latitude={parseFloat(e.lng)} longitude={parseFloat(e.lat)}
                                >
                                    <Pin color={
                                        e.type === 'ULTRA' ? 'red'
                                            : e.type === 'MIX' ? 'yellow'
                                                : e.type === 'NATURA' ? 'gren' :
                                                    'black'
                                    }
                                        size={10} />
                                </Marker>)
                        })
                    }
                </ReactMapGL>
                    */