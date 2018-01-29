import { Component, ViewChild, ElementRef, NgZone, Inject, Injector, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';


declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  @ViewChild('map') mapElement: ElementRef;

  MainApp: any;
  map: any;
  active_driver: boolean = false;
  apiKey: any = 'AIzaSyA9f8YjPIgwAr-ZIscN1nTMmGUZsDsHbTQ';

  constructor(
  	public navCtrl: NavController,
	public geolocation: Geolocation,
	public storage: Storage,
	private inj:Injector,
  	) {
    this.MainApp = this.inj.get(MyApp);
  }

   ionViewDidLoad() {
      this.initMap();
      this.ActiveDrive();
  }
    


	ActiveDrive(){
		this.storage.get('active_driver').then((val) => {
	      this.active_driver = val;

	    });
	}

	UpdateStatus(){
		this.storage.set('active_driver', this.active_driver).then((val) => {
			if(this.active_driver){
	      		this.MainApp.presentToast('Your service are turn on.', 'toggle');
	      	}else{
	      		this.MainApp.presentToast('Your service are turn off.', 'toggle');
	      	}
	    });
	}


  initMap() {

  	this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 16,
        streetViewControl: false,
        mapTypeId: 'roadmap',
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
    }, (err) => {
      console.log(err);
    });
  } 

}
