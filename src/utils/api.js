import "whatwg-fetch";
const apiUrl = "http://192.168.15.8:3001";


const resource = {
    markers: "marker",
    pnud: 'pnud'
}


// Widgets 
export const listWidgets = () =>
    fetchList(resource.widgets).then(response => response.json())


// Chat
export const listChatMessages = () =>
    fetchList(resource.chatMessages).then(response => response.json())

export const createChatMessage = data =>
    fetchCreate(resource.chatMessages, data).then(response => response.status)


// Page Views
export const listPageViews = () =>
    fetchList(resource.pageViews).then(response => response.json())

// Markers
export const listMarkers = () =>
    fetchList(resource.markers).then(response => response.json())

export const listMarkersByNeighborhood = (type) =>
    searchList(resource.markers, type).then(response => response.json())

export const listPnudDataByField = (field) =>
    searchList(resource.pnud, field).then(response => response.json())

// Commum methods
const fetchList = resource =>
    fetch(`${apiUrl}/${resource}/`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    });

const searchList = (resource, type) =>
    fetch(`${apiUrl}/${resource}/search?type=${type}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    });

const fetchCreate = (resource, data) =>
    fetch(`${apiUrl}/${resource}/`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
    });


