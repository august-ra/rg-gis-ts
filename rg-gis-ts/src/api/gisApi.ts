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

  // writing methods

  async addGIS(id: string, data: GisRecord) {
    const path = `gis/${id}`

    await set(ref(db, path), data)
  },
}
