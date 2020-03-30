import { UserMaster, RoleMaster } from "../models";
import { BaseRepository } from "./BaseRepository";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataTrainingMaster } from "../helpers/models/data-traning-model";

@Injectable({
  providedIn: "root"
})
export class SanaToService {
  constructor(private httpClient: HttpClient) {}
  public userMaster = new BaseRepository<UserMaster>(this.httpClient);
  public roleMaster = new BaseRepository<RoleMaster>(this.httpClient);
  public dataTrainingMaster = new BaseRepository<DataTrainingMaster>( this.httpClient);
}
