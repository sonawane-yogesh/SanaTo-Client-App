import { UserMaster, RoleMaster,  } from "../models"
import { BaseRepository } from './BaseRepository';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FloKaptureService {
    constructor(private httpClient: HttpClient) { }
    public userMaster = new BaseRepository<UserMaster>(this.httpClient);
    public roleMaster = new BaseRepository<RoleMaster>(this.httpClient);
}