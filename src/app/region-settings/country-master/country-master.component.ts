import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import CountryMaster from '../../models/country-master';
import { FloKaptureService } from '../../base-repositories/FloKaptureService';

@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.css']
})
export class CountryMasterComponent implements OnInit, AfterViewInit {
  constructor(private floKaptureService: FloKaptureService) { }
  public countryMaster: CountryMaster;
  public update: boolean = false;
  public countries: Array<CountryMaster>;
  showDetails(country: CountryMaster): void {
    this.countryMaster = country;
    this.update = true;
  };
  ngAfterViewInit(): void {
    this.floKaptureService.countryMaster.getAllItems("country-master/get-all")
      .subscribe((res: any) => {
        this.countries = res;
      });
  }
  ngOnInit(): void {
    this.setDefaults();
  };
  submitCountry(countryForm: NgForm): void {
    var countryDetails: CountryMaster = countryForm.value as CountryMaster;
    this.floKaptureService.countryMaster.addItem("country-master/upsert", countryDetails)
      .subscribe(() => {
        this.ngAfterViewInit();
        this.setDefaults();
      });
  };
  deleteCountry(country: CountryMaster): void {
    this.floKaptureService.countryMaster.deleteItem("country-master/delete", country._id)
      .subscribe(() => {
        this.ngAfterViewInit();
        this.setDefaults();
      });
  };
  setDefaults(): void {
    this.countryMaster = { CountryCode: 0, CountryName: "", CountryId: null, _id: null };
    this.update = false;
  };
}
