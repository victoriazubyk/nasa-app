import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  photos: Array<any> = [];
  photosToDisplay: Array<any> = [];
  searchFlag = false;
  loadingStatus = false;
  breakpoint = 4;
  errorText = '';

  roverOptions = [
    { value: 'curiosity', label: 'Curiosity' },
    { value: 'opportunity', label: 'Opportunity' },
    { value: 'spirit', label: 'Spirit' },
  ];

  cameraOptions = [
    { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
    { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
    { value: 'MAST', label: 'Mast Camera' },
    { value: 'CHEMCAM', label: 'Chemistry and Camera Complex' },
    { value: 'MAHLI', label: 'Mars Hand Lens Imager' },
    { value: 'MARDI', label: 'Mars Descent Imager' },
    { value: 'NAVCAM', label: 'Navigation Camera' },
    { value: 'MINITES', label: 'Miniature Thermal Emission Spectrometer (Mini-TES)' }
  ];

  public form: FormGroup;

  constructor(private appService: AppService, public fb: FormBuilder) {
    this.form = fb.group({
      rover: [ '', [ Validators.required ] ],
      camera: [ '', [ ] ],
      sol: [ '', [ ] ]
    });
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 750) ? 2 : 4;
}

  onResize(event): void {
    this.breakpoint = (event.target.innerWidth <= 750) ? 2 : 4;
  }

  searchFotos(): any {
    console.log('form', this.form.value);
    const {rover, camera, sol} = this.form.value;
    if (this.form.valid) {
      this.loadingStatus = true;
      this.appService.getFotos(rover, camera, sol)
        .then((resp: any) => {
          this.errorText = '';
          console.log(resp);
          this.photos = resp.photos;
          this.photosToDisplay = this.photos.slice(0, 12);
          this.loadingStatus = false;

        })
        .catch(err => {
          console.log(err);
          this.errorText = err.statusText;
          this.loadingStatus = false;
      });

      this.searchFlag = true;
      console.log(!!this.searchFlag && this.photosToDisplay.length);
    }
  }

  loadMore(): void {
    const counter = this.photosToDisplay.length;
    this.photosToDisplay.push(...this.photos.slice(counter, counter + 12));
    console.log(this.photosToDisplay);
  }
}
