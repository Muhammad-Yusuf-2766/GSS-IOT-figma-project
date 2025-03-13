export interface INodePositionFile {
	position: string
	nodeNum: number
}
export interface IUploadXlsFile {
	buildingId: string
	nodesPosition: INodePositionFile[]
}
