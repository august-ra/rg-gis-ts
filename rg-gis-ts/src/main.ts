
/// <reference types="yandex-maps" />
ymaps.ready(init)

async function init() {
  new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 10,
    controls: [],
  })
}
