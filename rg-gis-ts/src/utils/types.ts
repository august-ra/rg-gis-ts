
export type GisInfo = GisRecord[]

export interface GisRecord {
  _id: string
  address: string
  address_from_yandex: string
  area: string
  cad_num: string
  description: string
  is_active: boolean
  kind: string
  status: "new" | "новый" | "в работе" | "отклонено" | string
  x: number
  y: number
}

export type GisRecordKey = keyof GisRecord


export type FilterOptions = Record<string, boolean>
