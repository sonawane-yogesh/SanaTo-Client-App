import { WorkspaceMaster, ProjectMaster, UserMaster, RoleMaster,  } from "../models"
import { BaseRepository } from './BaseRepository';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FloKaptureService {
    constructor(private httpClient: HttpClient) { }
    public workspaceMaster = new BaseRepository<WorkspaceMaster>(this.httpClient);
    public projectMaster = new BaseRepository<ProjectMaster>(this.httpClient);
    public userMaster = new BaseRepository<UserMaster>(this.httpClient);
    public roleMaster = new BaseRepository<RoleMaster>(this.httpClient);
}