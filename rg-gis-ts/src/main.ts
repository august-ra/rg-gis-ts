import { gisApi } from "./api/gisApi"


/// <reference types="yandex-maps" />
ymaps.ready(init)

async function init() {
  const myMap = new ymaps.Map("map", {
    center:   [55.76, 37.64],
    zoom:     10,
    controls: ["fullscreenControl", "typeSelector"],
  })

  myMap.controls.add("zoomControl", {
    position: {
      left:   10,
      bottom: 50,
    },
  })

  let panoramaManager = await myMap.getPanoramaManager()

  const togglePanorama = (event) => {
    if (event.get("type") === "select") {
      panoramaManager.enableLookup()
    } else {
      panoramaManager.disableLookup()
    }
  }

  const panoramaButton = new ymaps.control.Button("Панорамы")
  panoramaButton.events.add(["select", "deselect"], togglePanorama)

  myMap.controls.add(panoramaButton, { float: "right" })

  const objectManager = new ymaps.ObjectManager({
    clusterize:        true,
    gridSize:          32,
    clusterIconLayout: "default#pieChart",
  })

  const data = await gisApi.getGIS()

  objectManager.add(gisApi.getGeoJSON(data))

  myMap.geoObjects.add(objectManager)
}
