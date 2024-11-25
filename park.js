// Input passed from Shortcuts (a single JSON string)
let input = args.shortcutParameter;

// Error handling: Check if the input is valid and a proper JSON string
try {
  let parsedInput = JSON.parse(input);

  // Extract locationCode and duration from the parsed object
  let locationCode = parsedInput.ParkingLocation;
  let duration = parsedInput.ParkingDuration;

  // URL for PayByPhone website
  let url = "https://m2.paybyphone.co.uk/parking";

  // Cookies from the session (replace with your actual cookies)
  let cookies = [
    { name: '__pxvid', value: 'c748d874-a4f4-11ef-ad06-0242ac120004' },
    { name: '_dd_s', value: 'rum=2&id=6a73f03f-8942-4ece-b243-120a9a6c9e84&created=1731860707885&expire=1731862074067' },
    // Add other cookies here
    { name: '_gcl_au' , value: '1.1.2143979748.1731855666' },
    { name: '_pxvid' , value:	'c7252a38-a4f4-11ef-9e30-e2eecbfd0ffa' },
    { name: 'OptanonAlertBoxClosed' , value:	'2024-11-17T15:01:10.225Z'},
    { name: 'OptanonConsent' , value: 'isGpcEnabled=0&datestamp=Sun+Nov+17+2024+16%3A33%3A19+GMT%2B0000+(Greenwich+Mean+Time)&version=6.20.0&isIABGlobal=false&hosts=&consentId=a18b83ce-0a67-4c44-acf3-ee526efcb154&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A1&geolocation=%3B&AwaitingReconsent=false' },
    { name: 'PBP.MetaKeyValues' , value: 	'{%22returnUrl%22:%22/parking%22}'},
    { name: 'PBP.UserAuthToken' , value: 	'{%22access_token%22:%22eyJ4NXQiOiJhdjQtMFh1NHR4Y2g0WTYwRTdLa0VVYzUwclEiLCJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZBRkUzRUQxN0JCOEI3MTcyMUUxOEVCNDEzQjJBNDExNDczOUQyQjQifQ.eyJtZW1iZXJpZCI6IjhkMmJmNDg3LWI0MDYtNDQzZC04ODU0LTgxZGZmNjQzOGJhZSIsImFjdGl2ZXVzZXJhY2NvdW50IjoiOGQyYmY0ODctYjQwNi00NDNkLTg4NTQtODFkZmY2NDM4YmFlIiwibmJmIjoxNzMxODU1NjgwLCJndHkiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Z3JhbnQtdHlwZTp0b2tlbi1leGNoYW5nZSIsImp0aSI6InpGUWtreWRyeVZRSzYxelBhbloteSIsInN1YiI6IjhkMmJmNDg3LWI0MDYtNDQzZC04ODU0LTgxZGZmNjQzOGJhZSIsImlhdCI6MTczMTg1NTY4MCwiZXhwIjoxNzMxODU2ODgwLCJzY29wZSI6InBheWJ5cGhvbmUiLCJpc3MiOiJQYXlCeVBob25lIElkZW50aXR5IEFuZCBBY2Nlc3MiLCJhdWQiOlsiaHR0cHM6Ly9jb25zdW1lci5wYXlieXBob25lYXBpcy5jb20iLCJodHRwczovL2NvbnN1bWVyLnBheWJ5cGhvbmVhcGlzLmNvbS9pZGVudGl0eSIsInBicF9hcGlfZnBzcGF5bWVudHMiLCJwYnBfYXBpX3BhcmtpbmciLCJwYnBfYXBpX3BheW1lbnQiLCJwYnBfYXBpX3Byb2ZpbGVzZXJ2aWNlIiwicGJwX2lkYSIsImh0dHA6Ly9hcGkucGF5YnlwaG9uZS5jb20iLCJodHRwOi8vYXBpLnFhLnBheWJ5cGhvbmUuY29tIl0sImF6cCI6InBheWJ5cGhvbmVfd2ViIn0.CZYFC3BiyP0Yq4xFVDVelSjfpv9CJYl3ZmQQ-GDUtJZubNN3Jp_pv1GWO76CDLZZdJ6kIBbuE4Gx23YtBZCG20OTiZBKsIlO8gXy-bTgOrvKJj-3J4nsq2pQt8nqxlvBcMdTf2Z7gvRKWyOVWJcLMNGTA4iwLpr44HTDZbekeKuEY90RKwK-tegx9ARESHzLD3CuQln1R9ZpuD6fjpy4XtYuRfoijKgSII9s0kX2EdYb9ZTHZF2Vd9dT2NS-UBwkQhmUgW7_75zG92KgKTQ5vBTj16uf-EOTa02B9mn7L2V2cULrkqY6H1Q5fNeYdWoxzLKMaEKCSm8DBK9D3M2gcg%22%2C%22expires_in%22:1200%2C%22refresh_token%22:%224MkeizRe6ZgKeN8pJHi3xDf-qpDmeTv-MuPA4X3yjMh%22%2C%22scope%22:%22paybyphone%22%2C%22token_type%22:%22Bearer%22}' },
    { name: 'pxcts'	, value: 'c72538fb-a4f4-11ef-9e31-6fb4e6ab88a3' },

  ];


  // Create a WebView to interact with the website
  let webView = new WebView();

  // Load the PayByPhone website
  await webView.loadURL(url);

  // Wait for the page to load fully
  await webView.waitForLoad();

  // Inject cookies into the WebView's context
  cookies.forEach(cookie => {
    webView.addCookie(cookie.name, cookie.value, url);
  });

  // Make the WebView visible (optional)
  //await webView.present();

  // Interact with the page to start the parking session
  await webView.evaluateJavaScript(`
    // Click the "Park" button
    document.getElementById('park-button').click();
  `);

  // Wait for the page to load after the first action
  await webView.waitForLoad();

  // Enter the location code into the location number field
  await webView.evaluateJavaScript(`
    document.getElementById('locationNumber').value = '${locationCode}';
  `);

  // Click the "Continue" button
  await webView.evaluateJavaScript(`
    document.getElementById('locationSubmit-button').click();
  `);

  // Wait for the next page to load
  await webView.waitForLoad();

  // Enter the parking duration into the Duration field
  await webView.evaluateJavaScript(`
    document.getElementById('duration').value = '${duration}';
  `);

  // Click the "Continue" button again
  await webView.evaluateJavaScript(`
    document.querySelector('button.MuiButton-containedPrimary[type="submit"]').click();
  `);

  // Wait for the page to load and bypass the insurance prompt by clicking "Not Now"
  await webView.waitForLoad();

  await webView.evaluateJavaScript(`
    document.getElementById('notNow-button').click();
  `);

  // Wait for the page to load and submit the parking session
  await webView.waitForLoad();

  await webView.evaluateJavaScript(`
    document.getElementById('pay-button').click();
  `);

  // Optionally, handle any confirmation or logging messages here
  console.log('Parking session started successfully!');

} catch (error) {
  // Handle JSON parse error or any other errors
  console.log('Error parsing JSON:', error.message);
}

// Call Script.complete() to signal the end of the script execution
Script.complete();
