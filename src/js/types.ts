export interface Building {
    id: string,
    name?: string,
    fps: number,
    level: number,
}

export type AddBuilding = (building: string) => void

export type UpdateBuilding = (building: Building) => void

export type SelectBuidling = (buildingId: string) => void

export type RemoveBuilding = (buildingId: string) => void

export type SetInclude = (include: boolean[]) => void

export interface Rank {
    invest: number,
    rank: string,
    fp: number,
    ownShare: number,
}

export interface SettingValues {
    name: string,
    percent: number,
    language: string,
    ownShare: number,
}

export type SetSetting = (key: string, value: any) => void

export type UpdateFunction<T> = (value: T) => void


