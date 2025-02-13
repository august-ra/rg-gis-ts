import { get, ref, set } from "firebase/database"
import { db } from "./firebaseConfig"

import type { GisInfo, GisRecord } from "../utils/types"


export const gisApi = {

  // reading methods

  async getGIS() {
    try {
      const path     = "gis"
      const snapshot = await get(ref(db, path))

      if (!snapshot.exists())
        return []

      const data = Object.values(snapshot.val()) as GisInfo
      data.forEach((item: GisRecord) => {
        item.kind   = item.kind.trim().toLowerCase()
        item.status = item.status === "new" ? "новый" : item.status
      })

      return data
    } catch (error) {
      console.log(error)
      return []
    }
  },

  getColor(item: GisRecord): string {
    if (item.status === "новый")
      return "#1e98ff"
    else if (item.status === "в работе")
      return "#16bb6f"
    else if (item.status === "отклонено")
      return "#ff531e"

    return "#1e98ff"
  },

  getGeoJSON(data: GisInfo) {
    const objects = []
    const uniquePoint = {}

    for (const item of data) {
      // if (есть полигоны) => добавить каждый в массив
      // if (есть точка) => добавить в массив
      const key = `${item.x};${item.y}`

      if (uniquePoint[key]) {
        item.x += uniquePoint[key] * 0.00002
        ++uniquePoint[key]
      } else {
        uniquePoint[key] = 1
      }

      objects.push({
        type: "Feature",
        id:   item._id,
        geometry: {
          type:        "Point",
          coordinates: [item.x, item.y],
        },
        properties: {
          // balloonContent: item.area,
          // balloonContent: "Аптека",
          // clusterCaption: "Аптека",
          // hintContent:    "Аптека",
          balloonContentHeader: item._id.substring(3),
          balloonContentBody :  item.address,
          // iconCaption:    "Аптека",
          // balloonContentHeader: "Балун метки",
          // balloonContentBody: "Содержимое <em>балуна</em> метки",
          // balloonContentFooter: "Подвал",
          // hintContent: "Хинт метки",
        },
        options: {
          iconColor:             this.getColor(item),
          preset:                item.status === "в работе" ? "islands#blueCircleDotIcon" : "islands#blueCircleIcon",
          hideIconOnBalloonOpen: false,
        },
      })
    }

    return {
      type: "FeatureCollection",
      features: objects,
    }
  },

  // writing methods

  async addGIS(id: string, data: GisRecord) {
    const path = `gis/${id}`

    await set(ref(db, path), data)
  },
}
