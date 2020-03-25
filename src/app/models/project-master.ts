
export class BaseModel {
    CreatedBy: string;
    UpdatedBy: string;
    CreatedOn: Date = new Date()
};

export class ProjectMaster {
    public WorkspaceId: string = null;
    public LanguageId: string = null;
    public ProjectName: string = "";
    public IsCtCode: boolean = false;
    public ProjectDescription?: string = "";
    public UploadedPath?: string;
    public UploadDetails?: {
        FileName: string,
        UploadPath: string,
        CompletePath: string
    }
    public IsActive: boolean = true;
};

export class WorkspaceMaster {
    public LanguageId?: string;
    public WorkspaceId?: string;
    public WorkspaceName: string;
    public WorkspaceDescription: string;
};