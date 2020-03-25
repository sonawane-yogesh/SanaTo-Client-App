import { FileTypeMaster, ProjectMaster } from ".";

export default interface FileMaster {
    _id: string | null;
    FileId: string;
    ProjectId: string;
    FileTypeMasterId: string;
    FileName: string;
    FileNameWithoutExt: string;
    FilePath: string;
    Processed: boolean;
    LinesCount: number;
    WorkFlowStatus: string;
    FileTypeMaster: FileTypeMaster;
    ProjectMaster: ProjectMaster;
}