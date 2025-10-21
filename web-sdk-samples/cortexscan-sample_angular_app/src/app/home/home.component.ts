import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import * as CortexDecoder from 'codecorp-web_sdk';
import '../../../node_modules/codecorp-web_sdk/dist/web/6fa90a72196a39df73e5c0709c269a35.wasm'; 
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  cameraDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | null = null; // Store the selected device
  isCameraOn: boolean = false; // To track the camera state
  buttonText: string = 'Start Camera'; // To update button text
  buttonColor: string = 'green'; // To update button color
  tableResults: { barcodeData: string, symbology: string, decodeTime: string }[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    try {
      //Initialize the decoder
      CortexDecoder.CDDecoder.init().then((handle)=>{
        if(handle == 1){
          CortexDecoder.CDDevice.audio = true;

          CortexDecoder.CDLicense.activateLicense("EC1qMTHjr4uHxJ85npcPnB2BkPB1p1o4Evp9PUbFupvexmLfcK5BmwzHyAhuO2TuGWC/Fqdf/JXGh0yry+meL6Z9/PCk7zmCue8hiwk6iO30rrfNZmamNO/0CbpZyt74rCqpAaf9wVznhWNhEwGLWV37EMOO615PCPReMwGgsiETI1nYbSSm1vaZNA8Kmmqf1SRF4HlD0TU/rpgp6+uSCbi/SRu2lV6xdIkhpqwl15bmoSXi61w4lqfj9EUNTE4ZchFSnK+jBavHFckTu6/OTpDFJaK4Xvfy6uKHkrlXy3hyFuUGBA3fZO4QfhsJz9E1ZnNeiZCJwx3UipsMp8EzK/fL61P7gBisXEXRbXJj631WZE1pNYbCGIdUTYosfU0OLdJwVtK963n6T6E3udDgqw==").then((license_res)=>{
            console.log(license_res)

            CortexDecoder.CDCamera.init().then(()=>{
              this.cameraDevices = CortexDecoder.CDCamera.getConnectedCameras(); 
              this.selectedDevice = this.cameraDevices[0]
            })
          }).catch(e => console.log(e))
        }
      })
    }catch(e){
      console.log(e)
    }
  }

  toggleCamera(): void {
    try {
      if (!this.isCameraOn) {
        this.startCamera();
        this.buttonText = 'Stop Camera';
        this.buttonColor = 'red';
      } else {
        this.stopCamera();
        this.buttonText = 'Start Camera';
        this.buttonColor = 'green';
      }
      this.isCameraOn = !this.isCameraOn; // Toggle the camera state
    } catch (err) {
      console.error(err);
    }
  }

  startCamera(): void {
    console.log('Starting the camera...');
    try {
      CortexDecoder.CDCamera.startCamera().then(()=>{
        CortexDecoder.CDCamera.startPreview((resultArray)=>{
          try {
            resultArray.forEach((result)=>{
              if (result.status == CortexDecoder.CDDecodeStatus.SUCCESS) {
                this.drawTable(result)
              }
            })
          } catch (err) {
            console.log(err);   
          }
        })
      })
    } catch (err) {
        console.log(err);
    }
  }

  stopCamera(): void {
    try {
      CortexDecoder.CDCamera.stopCamera();
    } catch (err) {
      console.log(err);
    }
  }

  drawTable(result : CortexDecoder.CDResult){
    this.tableResults.unshift({
      barcodeData: result.barcodeData,
      symbology: result.symbology,
      decodeTime: result.decodeTime.toString() // Converting time to string
    });
    this.cdr.detectChanges();
  }

  clearTable(){
    this.tableResults = []
  }

  switchCamera(){
    if (this.selectedDevice) {
      CortexDecoder.CDCamera.setCamera(this.selectedDevice)
      this.isCameraOn = false;
      this.buttonText = 'Start Camera';
      this.buttonColor = 'green';
    }
  }
}
