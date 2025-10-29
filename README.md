## Important
- The SDK has a Web Assembly file(.wasm) that needs to be imported in the application.
import "../node_modules/@your-q-number/codecorp-web_sdk/dist/web/0xxxfefjensssrejriwjdkq9.wasm"  
However, the application bundler should allow the WASM file to be uploaded to the browser. The WebPack configuration needed to allow this is mentioned below -
//wasm files should not be processed but just be emitted.

```
{
    test : /\.(wasm)$/,
    type: `javascript/auto`,
    use: {
        loader: `file-loader`
    }
}
```

## Installation Instructions

### Install NodeJS and NPM

[https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Verify Installation of NodeJS and NPM

Open a command prompt (or PowerShell), and enter the following:

* ```node –v```
  The system should display the Node.js version installed on your system.
* ```npm –v```
  The system should display the NPM version installed on your system.

### SDK folder structure

* The SDK release folder will have two directories namely <b>NPM_Package</b> and  <b>SampleProjects</b>.
* The "NPM_Package" folder contains the package that should be installed locally in the project.
* The "SampleProjects" folder contains example apps to demonstrate the camera scanning and image scanning feature of the SDK.

### Camera Scan Sample App

#### 1. Integrate the SDK in camera scan sample app
* Copy the <b>camera-scan-sampleapp</b> app from the "SampleProjects" folder to local file system.
* Copy the <b>codecorp-web_sdk-x.x.x.tgz</b> file from "NPM_Package" folder to the root of "camera-scan-sampleapp" app.
* Open the <b>camera-scan-sampleapp</b> app in a source code editor of your choice.
* Type <b>npm install --save "./codecorp-web_sdk-x.x.x.tgz"</b> from the project's root folder.

#### 2. Find and add your Q-number to import statements
* Navigate to "src" folder.
* Open package.json, find "codecorp-web_sdk" under dependencies, and copy its 5-character Q-number (e.g. q0000).
* Open "index.js" and enter your Q-number in this import statement:
	- Change: import * as CortexDecoder from '@your-q-number/codecorp-web_sdk';
	- Example: import * as CortexDecoder from '@q0000/codecorp-web_sdk';

#### 3. Find and add your WASM to the import statment
* Navigate to the node_modules folder and open the folder named after your q-number. 
	- Example: '@q0000'
* Continue through the subfolders -> codecorp-web_sdk -> dist -> web
* Copy the relative file path of the file ending in ".wasm"
* Return to "index.js" and paste the file path in the import statement:
  - Change: <b>import "../node_modules/@your-q-number/codecorp-web_sdk/dist/web/your-wasm-file-name.wasm";</b>
  - Example: <b>import "../node_modules/@q0000/codecorp-web_sdk/dist/web/6d64b25b330217463b53c89e718982b9.wasm";</b>

#### 4. Activate the license
* In "index.js", go to the line where function <b>"activateLicense"</b> is called and replace the text with the license key provided by our Sales team.
* Type <b>npm run dev</b> to start the server. The license activation message must be printed in console log.

#### 5. Use Camera to Scan

* Our SDK provides APIs to change multiple settings of the device camera and decode the frames generated from the camera.
* SDK requires the application to provide either -
  * HTML canvas element
    ```<canvas id="videoCanvas" width="640" height="360"></canvas>```
  * HTML video element
    ```<video id="video" width="640" height="360" playsinline></video>```
* CDCamera class provides ```init(ref?: HTMLVideoElement | HTMLCanvasElement): Promise<void>;``` API which takes an optional parameter for video input. If no parameter is provided, SDK looks for video element in the DOM and if none, throws an error.

  ```js
  CDCamera.init(document.getElementById("videoCanvas"))
  ```
* The ```getConnectedCameras(): MediaDeviceInfo[];``` API of CDCamera class returns a list of all the connected video input devices.
* Pass the device returned from getConnectedCameras() to ```setCamera(device:MediaDeviceInfo):Promise<void>;``` API.
* If you prefer to select the camera based on orientation (front / back) then call ```    setCameraPosition(value: CDPosition): Promise<void>;``` API.

  ```js
  CDCamera.setCameraPosition(value : CDPosition, autoSwitch : boolean)
  ```
* Call ```startCamera(): Promise<void>;``` API to start the camera stream.
* Finally call ```startPreview(getResult: (arg0: [CDResult]) => any): Promise<void>;``` which takes a callback function as argument to return the decode results.

  ```js
  CDCamera.startPreview((result)=>{
	console.log(result)
  })
  ```
__________________________________________________________
### Image Scan Sample App

#### 1. Integrate the SDK in image scan sample app
* Copy the <b>image-scan-sampleapp</b> app from the "SampleProjects" folder to local file system.
* Copy the <b>codecorp-web_sdk-2.x.x.tgz</b> file from "NPM_Package" folder to the root of "image-scan-sampleapp" app.'
* Open the <b>image-scan-sampleapp</b> app in a source code editor of your choice.
* Type <b>npm install --save "./codecorp-web_sdk-2.x.x.tgz"</b> from the project's root folder.

#### 2. Find and add your Q-number to import statement
* Navigate to "src" folder 
* Open "package.json", find "codecorp-web_sdk" under dependencies, and copy its 5-character Q-number (e.g. q0000).
* Open "index.js" and enter your q-number in this import statement:
  - Change: <b>import { CDDataParsing, CDDecoder, CDLicense, CDPerformanceFeatures, CDSymbology } from '@your-q-number/codecorp-web_sdk';</b>
  - Example: <b>import { CDDataParsing, CDDecoder, CDLicense, CDPerformanceFeatures, CDSymbology } from '@q0000/codecorp-web_sdk';</b>

#### 3. Find and add your WASM to the import statement
* Navigate to the node_modules folder and open the folder named after your q-number. 
	- Example: '@q0000'
* Continue through the subfolders -> codecorp-web_sdk -> dist -> web
* Copy the relative file path of the file ending in ".wasm"
* Return to "index.js" and paste the file path in the import statement:
  - Change: <b>import "../node_modules/@your-q-number/codecorp-web_sdk/dist/web/your-wasm-file-name.wasm";</b>
  - Example: <b>import "../node_modules/@q0000/codecorp-web_sdk/dist/web/6d64b25b330217463b53c89e718982b9.wasm";</b>

#### 4. Activate the license
* Go to the line where function <b>"activateLicense"</b> is called and replace the text with the license key provided by our Sales team.
* Type <b>npm run dev</b> to start the server. The license activation message must be printed in console log.

#### 5. Scan Images

* In HTML file, using input tag, upload an image

  ```html
  <input type="file" id="imageImport" accept="image/*,.pdf" />
  ```
* In JS, handle the image upload

  ```js
  // HTML
  document.getElementById("imageImport").addEventListener('change', getImage, false);

  //JS
  async function getImage(evt) {
	image = evt.target.files[0];
	result = await CDDecoder.decode(image).catch(e => alert(e));
	console.log(result)
  }
  ```

__________________________________________________________

### Image Scan Node Sample App

#### 1. Integrate the SDK in image scan nodesdk sample app

* Copy the <b>image-scan-nodesdk-sampleapp</b> app from the "SampleProjects" folder to local file system.
* Copy the codecorp-web_sdk-2.x.x.tgz</b> file from "NPM_Package" folder to the root of <b>image-scan-nodesdk-sampleapp</b> app.
* Open the <b>image-scan-nodesdk-sampleapp</b> app in a source code editor of your choice.
* Type <b>npm install --save "./codecorp-web_sdk-2.x.x.tgz"</b> from the project's root folder.

#### 2. Find and add your Q-number to import statement
* Open package.json, find "codecorp-web_sdk" under dependencies, and copy its 5-character Q-number (e.g. q0000).
* Open the file "index.js" and enter your Q-number in this import statement:
  - Change: <b>const CortexDecoder = require('@your-q-number/codecorp-web_sdk')</b>
  - Example: <b>const CortexDecoder = require('@q0000/codecorp-web_sdk')</b>

#### 3. Copy your .wasm file to the sample app root folder
* Navigate to the node_modules folder and open the folder named after your q-number. 
	- Example: '@q0000'
* Continue through the subfolders -> codecorp-web_sdk -> dist -> node
* Copy the file ending in ".wasm"
* Paste the ".wasm" file to the root folder of <b>image-scan-nodesdk-sampleapp</b>

#### 4. Activate the license
* Navigate to "index.js".
* Go to the line where function <b>"activateLicense"</b> is called and replace the text with the license key provided by our Sales team.
* Type <b>npm start</b> to start the server. The license activation message must be printed in console log.

#### 5. Open Postman

##### Initialize Decoder and Activate License

  ```js
    	HTTP Request: GET http://localhost:8000/init

  	Body: None

  	Expected HTTP Code: 200 OK

  	Expected Response: {
  		"status": "ACTIVATED",
  		"message": "License activated",
  		"expirationDate": "10/31/2025", //Your license   expiration date
  		"rawExpirationDate": "2025-11-01T03:59:59.999Z" //  Your license expiration date
  	}
  ```

##### Decode sample image

```js
	HTTP Request: POST http://localhost:8000/post_image

	Body: Use form-data, with
	Key: “image”
	Key-type: “File”
	Value: Upload an image of a barcode like “UPC(UPC-A).jpg.

	Expected HTTP Code: 200 Ok
```
### Quick Tips

#### Enable or Disable a symbology

```js
const cdSymbology = new CDSymbology();
cdSymbology.QR.enable = true
console.log(cdSymbology.QR.enable) //Prints true
```
#### Set Region of Interest (ROI)

```js
const ROIRect = new CDRect();

ROIRect.TopLeft.X = parseInt(left);
ROIRect.TopLeft.Y = parseInt(top);
ROIRect.TopRight.X = parseInt(left) + parseInt(width)
ROIRect.TopRight.Y = parseInt(top)
ROIRect.BottomRight.X = parseInt(left) + parseInt(width)
ROIRect.BottomRight.Y = parseInt(top) + parseInt(height)
ROIRect.BottomLeft.X = parseInt(left)
ROIRect.BottomLeft.Y = parseInt(top) + parseInt(height)

CDDecoder.setRegionOfInterest(ROIRect, true);
```
#### Set Barcodes to Decode

```js
await CDDecoder.setBarcodesToDecode(1, true);
```
#### Set TimeLimit

```js
CDDecoder.timeLimit = value
```
#### Enable beep and vibrate for a successful scan

```js
CDDevice.audio = true
CDDevice.vibration = false
console.log(CDDevice.audio)   //Prints true
```
