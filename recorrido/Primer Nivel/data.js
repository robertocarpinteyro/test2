var APP_DATA = {
  "scenes": [
    {
      "id": "0-primer-piso",
      "name": "Primer Piso",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1632,
      "initialViewParameters": {
        "yaw": -2.8323614847959515,
        "pitch": 0.10656837208547643,
        "fov": 1.3446888170112152
      },
      "linkHotspots": [
        {
          "yaw": -2.999222830386149,
          "pitch": 0.15975010993929573,
          "rotation": 0,
          "target": "1-primer-piso"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-primer-piso",
      "name": "Primer piso",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1632,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.04881393716354232,
          "pitch": 0.0818800530310746,
          "rotation": 0,
          "target": "0-primer-piso"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};
