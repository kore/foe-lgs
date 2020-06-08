export interface Building {
    id: string,
    name?: string,
    fps: number,
    level: number,
}

export type UpdateBuilding = (building: Building) => void

export interface Rank {
    invest: number,
    // @TODO: Add other properties as well
}

export type SetInclude = (include: boolean[]) => void

export interface Rank {
    invest: number,
    rank: string,
    fp: number,
    ownShare: number,
}
