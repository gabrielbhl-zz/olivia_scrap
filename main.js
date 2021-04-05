import pkg from 'puppeteer';
const { launch } = pkg;

let scrape = async () => {
  const browser = await launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://fit-web-scraping-challenge.herokuapp.com/login');
  page.click('body > form > div:nth-child(1) > input[type=text]');
  page.type("olivia");
  page.click('body > form > div:nth-child(2) > input[type=password]');
  page.type("oliveira");
  await page.click('body > form > div:nth-child(3) > input[type=submit]');
  await page.waitForNavigation();
  page.click('body > p:nth-child(2) > a');
  await page.waitForNavigation();
  const result = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#financial > tbody")).reduce(
      (result, dado) => {
        return {
          year: dado.querySelector("#financial > tbody > tr:nth-child(2) > td:nth-child(1)").innerText,
          equity: dado.querySelector("#financial > tbody > tr:nth-child(2) > td:nth-child(2)").innerText,
          revenue: dado.querySelector("#financial > tbody > tr:nth-child(2) > td:nth-child(3)").innerText,
          ebitda: dado.querySelector("#financial > tbody > tr:nth-child(2) > td:nth-child(4)").innerText,
        }
      }, {});
  })
  browser.close();
  return result
}

scrape().then((value) => {
  console.log(value)
});

// request('https://fit-web-scraping-challenge.herokuapp.com/login', function(error, result, html){
//     if(error) {
//         console.log('An error occurred');
//         console.log(error);
//         return;
//     }
    
//     var $ = load(html);

//     var promises = [];

//     $('.financial').each(function(i, dataTable){
//         var race = $(dataTable).find('.title-bar span').text();
//         var $unitnames =  $(dataTable).find('.databox table .button-rollover');

//         promises.append(scrapeUnits($unitnames));
//     });

//     all(promises).then(function(promiseResults){
//         var data = {};

//         // use the promiseResults to populate and  build your data object...

//         // write the JSON file to disk
//         writeFile('public/units.json', JSON.stringify(data), function(err){
//             if(err) { console.log(err); }
//         });
//     });
// });

// function scrapeUnits(unitUrls) {
//     return new Promise(function(fulfil, reject) {
//         var units = [];

//         // some code that loads a new page with request
//         // some code that uses querySelectors and cheerio to extract data
//         // some code that creates a unit object and eventually adds units to the array

//         // eventually we're done with grabbing data for our units and we do this:        
//         fulfil(units);
//     });
// }