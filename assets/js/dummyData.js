
//AREA LAYERS

let MONArea = {
  "type": "Feature",
  "properties": {
    "area": "MON" 
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          13.593521118164062,
          45.77614401215916
        ],
        [
          13.574295043945312,
          45.817315080406246
        ],
        [
          13.514556884765625,
          45.81875073139775
        ],
        [
          13.4747314453125,
          45.80295653465527
        ],
        [
          13.426666259765623,
          45.746922837378264
        ],
        [
          13.41499328613281,
          45.7205627558654
        ],
        [
          13.483657836914062,
          45.70474073467439
        ],
        [
          13.550949096679688,
          45.72727377526009
        ],
        [
          13.520050048828125,
          45.75075599455506
        ],
        [
          13.527603149414062,
          45.775186183521036
        ],
        [
          13.558502197265625,
          45.78332720254533
        ],
        [
          13.57978820800781,
          45.778059620080064
        ],
        [
          13.593521118164062,
          45.77614401215916
        ]
      ]
    ]
  }
}

let MUGArea = {
  "type": "Feature",
  "properties": {
    "area": "MUG"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          13.784408569335936,
          45.597224374966075
        ],
        [
          13.748016357421875,
          45.608994029538806
        ],
        [
          13.720893859863281,
          45.60587170876381
        ],
        [
          13.721237182617188,
          45.595302564236775
        ],
        [
          13.706474304199217,
          45.5931404484943
        ],
        [
          13.712310791015623,
          45.58401059700219
        ],
        [
          13.742523193359373,
          45.57367765830111
        ],
        [
          13.745269775390625,
          45.56574643897729
        ],
        [
          13.7933349609375,
          45.57656146038471
        ],
        [
          13.784408569335936,
          45.597224374966075
        ]
      ]
    ]
  }
}

let TRSArea = {
  "type": "Feature",
  "properties": {
    "area": "TRS"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          13.754196166992186,
          45.67956010571019
        ],
        [
          13.755912780761719,
          45.67428272784149
        ],
        [
          13.766555786132812,
          45.66036725500337
        ],
        [
          13.763809204101562,
          45.64884838552229
        ],
        [
          13.750419616699219,
          45.641647888928
        ],
        [
          13.763809204101562,
          45.63564676810469
        ],
        [
          13.777198791503906,
          45.632045787102584
        ],
        [
          13.778915405273438,
          45.61811981684217
        ],
        [
          13.795394897460938,
          45.611635857525116
        ],
        [
          13.817024230957031,
          45.61115553441937
        ],
        [
          13.842773437499998,
          45.623642598278074
        ],
        [
          13.831100463867186,
          45.64332808758249
        ],
        [
          13.797111511230467,
          45.67476251003246
        ],
        [
          13.754196166992186,
          45.67956010571019
        ]
      ]
    ]
  }
}


//DUMMY DATA

let TRSLayers ={
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "area": "TRS",
      "type": "WDN",
      "title": "Water on the field",
      "message": "Molestiae ducimus delectus aut. Culpa voluptatibus sit possimus quia magnam. Ut nesciunt fuga qui eum sit praesentium blanditiis.",
      "date": "2019-03-12T00:00:00.000Z",
      "sub": "eos laudantium ea",
      "id": 1
  
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            13.756170272827147,
            45.64794837406225
          ],
          [
            13.758659362792969,
            45.64602830128161
          ],
          [
            13.768444061279297,
            45.65238829029308
          ],
          [
            13.757457733154297,
            45.66918478803249
          ],
          [
            13.752994537353516,
            45.66660565337351
          ],
          [
            13.757543563842773,
            45.66120707989019
          ],
          [
            13.75908851623535,
            45.655028073634895
          ],
          [
            13.758401870727539,
            45.65190831631695
          ],
          [
            13.756170272827147,
            45.64794837406225
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "area": "TRS",
      "type": "FLD",
      "title": "Flood on the field",
      "message": "Molestiae ducimus delectus aut. Culpa voluptatibus sit possimus quia magnam. Ut nesciunt fuga qui eum sit praesentium blanditiis.",
      "date": "2019-03-12T00:00:00.000Z",
      "sub": "eos laudantium ea",
      "id": 2
  
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            13.757114410400389,
            45.627904372904226
          ],
          [
            13.771533966064453,
            45.62466305268988
          ],
          [
            13.770933151245117,
            45.626163687199224
          ],
          [
            13.773164749145508,
            45.62892474973852
          ],
          [
            13.777027130126953,
            45.631205524908815
          ],
          [
            13.777027130126953,
            45.632645966671085
          ],
          [
            13.77385139465332,
            45.63498660557578
          ],
          [
            13.766641616821289,
            45.63540670990307
          ],
          [
            13.765182495117188,
            45.63042527016332
          ],
          [
            13.757114410400389,
            45.627904372904226
          ]
        ]
      ]
    }
  }]
}

let MUGLayers = {
  "type": "Feature",
  "properties": {
    "area": "MUG",
    "type": "MDW",
    "title": "Muddy water on the field",
    "message": "Molestiae ducimus delectus aut. Culpa voluptatibus sit possimus quia magnam. Ut nesciunt fuga qui eum sit praesentium blanditiis.",
    "date": "2019-03-12T00:00:00.000Z",
    "sub": "eos laudantium ea",
    "id": 3

  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          13.75788688659668,
          45.60755298000793
        ],
        [
          13.774151802062988,
          45.60367997594771
        ],
        [
          13.774881362915039,
          45.60419038712886
        ],
        [
          13.775525093078612,
          45.60464074607929
        ],
        [
          13.769001960754395,
          45.606832441359316
        ],
        [
          13.762822151184082,
          45.60782317961499
        ],
        [
          13.759045600891112,
          45.60845364030324
        ],
        [
          13.75788688659668,
          45.60755298000793
        ]
      ]
    ]
  }
}

let MONLayers = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "area": "MON",
        "type": "OIL",
        "title": "OIL on the field",
        "message": "Quod blanditiis qui est ab aut nulla. Ipsam atque omnis rerum iste. Rerum doloremque impedit pariatur.Ipsa consequatur ad. Deleniti ipsum aut atque et tenetur sequi quam dicta dolorum. Error omnis reiciendis perspiciatis temporibus tempore. Iste est voluptatem nisi impedit eos quia eos.Dicta eum nihil dolor. Dicta id nisi nam aut magni dolor et. Voluptates qui qui ut accusantium qui in et. Tenetur voluptates fuga eaque laudantium consequuntur voluptatem eos et. Iste sit quia sunt et maxime eveniet. Eum consectetur et ut.",
        "date": "2019-03-12T00:00:00.000Z",
        "sub": "eos laudantium ea",
        "id": 4
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              13.538761138916014,
              45.7878012637901
            ],
            [
              13.546164035797117,
              45.78926760037929
            ],
            [
              13.542580604553223,
              45.7923796971558
            ],
            [
              13.539941310882568,
              45.79157176565478
            ],
            [
              13.537430763244629,
              45.79044961914028
            ],
            [
              13.538761138916014,
              45.7878012637901
            ]
          ]
        ]
      }
    }
  ]
}

const layers = [TRSLayers, MUGLayers, MONLayers]