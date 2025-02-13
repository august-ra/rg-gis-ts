import { gisApi } from "./api/gisApi"


/// <reference types="yandex-maps" />
ymaps.ready(init)

async function init() {
  const myMap = new ymaps.Map("map", {
    center:   [55.76, 37.64],
    zoom:     10,
    controls: [],
  })

  const objectManager = new ymaps.ObjectManager({
    clusterize:        true,
    gridSize:          32,
    clusterIconLayout: "default#pieChart",
  })

  const data = await gisApi.getGIS()

  objectManager.add(gisApi.getGeoJSON(data.filter((item) => selectedAreas.includes(item.area))))

  myMap.geoObjects.add(objectManager)
}
