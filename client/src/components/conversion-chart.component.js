import React from "react";

function ConversionChart() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h3>Conversions</h3>
          <small>
            Click the "Convert Units" button in the navigation bar to use the
            volume calculator
          </small>
          <hr />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <h4>Abbreviations:</h4>
            </div>
            <div className="col-6 col-lg-3">
              <p>teaspoon (tsp)</p>
            </div>
            <div className="col-6 col-lg-3">
              <p>tablespoon (Tbsp)</p>
            </div>
            <div className="col-6 col-lg-3">
              <p>ounce (oz)</p>
            </div>
            <div className="col-6 col-lg-3">
              <p>fluid ounce (fl.oz)</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="row mt-3">
            <div className="col-12 mx-auto text-center">
              <h4 className="border border-secondary p-2 pb-3 bg-light">
                tsp / Tbsp / Cup
              </h4>
              <p className="my-0">3 tsp = 1 Tbsp = 1/16 Cup</p>
              <p className="my-0">6 tsp = 2 Tbsp = 1/8 Cup</p>
              <p className="my-0">12 tsp = 4 Tbsp = 1/4 Cup</p>
              <p className="my-0">24 tsp = 8 Tbsp = 1/2 Cup</p>
              <p className="my-0">36 tsp = 12 Tbsp = 3/4 Cup</p>
              <p className="my-0">48 tsp = 16 Tbsp = 1 Cup</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 mx-auto text-center">
              <h4 className="border border-secondary p-2 pb-3 bg-light">
                oz / cup / pint / quart / gallon
              </h4>
              <p className="my-0">8 fl.oz = 1 cup = 1/2 pint = 1/4 quart</p>
              <p className="my-0">16 fl.oz = 2 cups = 1 pint = 1/2 quart</p>
              <p className="my-0">32 fl.oz = 4 cups = 2 pints = 1 quart</p>
              <p className="my-0">
                128 fl.oz = 16 cups = 8 pints = 4 quart = 1 gallon
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 mx-auto text-center">
              <h4 className="border border-secondary p-2 pb-3 bg-light">
                Butter
              </h4>
              <p className="my-0">
                1 Cup = 2 Sticks = 8 oz = 230 grams = 8 Tbsp
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 mx-auto text-center">
              <h4 className="border border-secondary p-2 pb-3 bg-light">
                Metric To US Temperatures
              </h4>
              <p className="my-0">120&deg; C = 250&deg; F</p>
              <p className="my-0">160&deg; C = 320&deg; F</p>
              <p className="my-0">180&deg; C = 350&deg; F</p>
              <p className="my-0">205&deg; C = 400&deg; F</p>
              <p className="my-0">220&deg; C = 425&deg; F</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 mx-auto text-center">
              <h4 className="border border-secondary p-2 pb-3 bg-light">
                Baking in Grams
              </h4>
              <p className="my-0">1 cup flour = 140 grams</p>
              <p className="my-0">1 cup sugar = 150 grams</p>
              <p className="my-0">1 cup powdered sugar = 160 grams</p>
              <p className="my-0">1 cup heavy cream = 235 grams</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 mx-auto text-center">
              <h4 className="border border-secondary p-2 pb-3 bg-light">
                Metric To US Volume
              </h4>
              <p className="my-0">1 milliliter = 1/5 tsp</p>
              <p className="my-0">5 milliliters = 1 tsp</p>
              <p className="my-0">15 milliliters = 1 Tbsp</p>
              <p className="my-0">250 milliliters = 1 cup = 8 fl.oz</p>
              <p className="my-0">1000 milliliters = 34 fl.oz</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="row mt-3">
            <div className="col-12 mx-auto text-center">
              <h4 className="border border-secondary p-2 pb-3 bg-light">
                Weight
              </h4>
              <p className="my-0">1 gram = 0.035 oz</p>
              <p className="my-0">100 grams = 3.5 oz</p>
              <p className="my-0">500 grams = 1.1 pounds</p>
              <p className="my-0">1000 grams = 35 oz</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 mx-auto text-center">
              <h4 className="border border-secondary p-2 pb-3 bg-light">
                Standard US to Metric
              </h4>
              <p className="my-0">1/5 tsp = 1 milliliter</p>
              <p className="my-0">1 tsp = 5 milliliters</p>
              <p className="my-0">1 Tbsp = 15 milliliters</p>
              <p className="my-0">1 fl.oz = 30 milliliters</p>
              <p className="my-0">1 cup = 237 milliliters</p>
              <p className="my-0">1 pint = 2 cups = 473 milliliters</p>
              <p className="my-0">1 quart = 4 cups = .95 liters</p>
              <p className="my-0">1 gallon = 16 cups = 3.8 liters</p>
              <p className="my-0">1 oz = 28 grams</p>
              <p className="my-0">1 pound = 454 grams</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 mx-auto text-center">
              <h4 className="border border-secondary p-2 pb-3 bg-light">
                1 Cup Equals What ??
              </h4>
              <p className="my-0">1 cup = 8 fl.oz</p>
              <p className="my-0">1 cup = 16 Tbsp</p>
              <p className="my-0">1 cup = 48 tsp</p>
              <p className="my-0">1 cup = 1/2 pint</p>
              <p className="my-0">1 cup = 1/4 quart</p>
              <p className="my-0">1 cup = 1/16 gallon</p>
              <p className="my-0">1 cup = 240 milliliters</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 mx-auto text-center">
              <h4 className="border border-secondary p-2 pb-3 bg-light">
                Misc.
              </h4>
              <p className="my-0">1 cup flour = 4.5 oz</p>
              <p className="my-0">1 large egg = 1.7 oz</p>
              <p className="my-0">1 cup butter = 8 oz</p>
              <p className="my-0">1 cup milk = 8 oz</p>
              <p className="my-0">1 cup sugar = 7.1 oz</p>
              <p className="my-0">1 cup vegetable oil = 7.7 oz</p>
              <p className="my-0">1 cup powdered sugar = 4.4 oz</p>
              <p className="my-0">1 cup brown sugar = 7.75 oz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversionChart;
