export type ProvinceLocation = {
  lat: number;
  lng: number;
  zoom: number;
};

export const provinceCoordinates: Record<string, ProvinceLocation> = {
  // NCR
  "Metropolitan Manila": {
    lat: 14.5995,
    lng: 120.9842,
    zoom: 10.5,
  },

  // Region I
  "Ilocos Norte": {
    lat: 18.1647,
    lng: 120.7116,
    zoom: 8.8,
  },
  "Ilocos Sur": {
    lat: 17.2279,
    lng: 120.5739,
    zoom: 8.8,
  },
  "La Union": {
    lat: 16.6159,
    lng: 120.3213,
    zoom: 9,
  },
  Pangasinan: {
    lat: 15.8949,
    lng: 120.2863,
    zoom: 8.7,
  },

  // Region II
  Batanes: {
    lat: 20.4485,
    lng: 121.9708,
    zoom: 9,
  },
  Cagayan: {
    lat: 17.6132,
    lng: 121.7269,
    zoom: 8.5,
  },
  Isabela: {
    lat: 16.9754,
    lng: 121.8107,
    zoom: 8.3,
  },
  "Nueva Vizcaya": {
    lat: 16.3301,
    lng: 121.171,
    zoom: 8.8,
  },
  Quirino: {
    lat: 16.270,
    lng: 121.537,
    zoom: 9,
  },

  // Region III
  Aurora: {
    lat: 15.827,
    lng: 121.769,
    zoom: 8.7,
  },
  Bataan: {
    lat: 14.6417,
    lng: 120.4818,
    zoom: 9,
  },
  Bulacan: {
    lat: 14.7942,
    lng: 120.8799,
    zoom: 9,
  },
  "Nueva Ecija": {
    lat: 15.5784,
    lng: 121.1113,
    zoom: 8.7,
  },
  Pampanga: {
    lat: 15.0794,
    lng: 120.62,
    zoom: 9,
  },
  Tarlac: {
    lat: 15.4755,
    lng: 120.596,
    zoom: 9,
  },
  Zambales: {
    lat: 15.327,
    lng: 119.978,
    zoom: 8.5,
  },

  // Region IV-A
  Batangas: {
    lat: 13.7565,
    lng: 121.0583,
    zoom: 8.7,
  },
  Cavite: {
    lat: 14.2456,
    lng: 120.8786,
    zoom: 9,
  },
  Laguna: {
    lat: 14.2164,
    lng: 121.4456,
    zoom: 9,
  },
  Quezon: {
    lat: 13.914,
    lng: 122.1087,
    zoom: 8.2,
  },
  Rizal: {
    lat: 14.6037,
    lng: 121.3084,
    zoom: 9,
  },

  // Region IV-B
  Marinduque: {
    lat: 13.4767,
    lng: 121.9032,
    zoom: 9,
  },
  "Occidental Mindoro": {
    lat: 13.2232,
    lng: 120.7651,
    zoom: 8.5,
  },
  "Oriental Mindoro": {
    lat: 13.0565,
    lng: 121.4069,
    zoom: 8.5,
  },
  Palawan: {
    lat: 9.8349,
    lng: 118.7384,
    zoom: 7.5,
  },
  Romblon: {
    lat: 12.5778,
    lng: 122.2691,
    zoom: 9,
  },

  // Region V
  Albay: {
    lat: 13.1775,
    lng: 123.528,
    zoom: 9,
  },
  "Camarines Norte": {
    lat: 14.139,
    lng: 122.7633,
    zoom: 9,
  },
  "Camarines Sur": {
    lat: 13.525,
    lng: 123.3486,
    zoom: 8.6,
  },
  Catanduanes: {
    lat: 13.597,
    lng: 124.246,
    zoom: 9,
  },
  Masbate: {
    lat: 12.3615,
    lng: 123.5504,
    zoom: 8.5,
  },
  Sorsogon: {
    lat: 12.9927,
    lng: 124.0147,
    zoom: 9,
  },

    // Region VI (Western Visayas)
  Aklan: {
    lat: 11.8166,
    lng: 122.0942,
    zoom: 9,
  },
  Antique: {
    lat: 11.816,
    lng: 122.064,
    zoom: 8.8,
  },
  Capiz: {
    lat: 11.5529,
    lng: 122.7407,
    zoom: 9,
  },
  Guimaras: {
    lat: 10.5929,
    lng: 122.6325,
    zoom: 10,
  },
  Iloilo: {
    lat: 10.7202,
    lng: 122.5621,
    zoom: 8.7,
  },
//   "Negros Occidental": {
//     lat: 10.2926,
//     lng: 123.0247,
//     zoom: 8.2,
//   },

  // Region VII (Central Visayas)
  Bohol: {
    lat: 9.8499,
    lng: 124.1435,
    zoom: 8.5,
  },
  Cebu: {
    lat: 10.3157,
    lng: 123.8854,
    zoom: 8.3,
  },
//   "Negros Oriental": {
//     lat: 9.6282,
//     lng: 123.3026,
//     zoom: 8.6,
//   },
//   Siquijor: {
//     lat: 9.2148,
//     lng: 123.5156,
//     zoom: 10,
//   },

  // Region VIII (Eastern Visayas)
  Biliran: {
    lat: 11.5789,
    lng: 124.4642,
    zoom: 10,
  },
  "Eastern Samar": {
    lat: 11.5001,
    lng: 125.4996,
    zoom: 8.8,
  },
  Leyte: {
    lat: 11.0497,
    lng: 124.535,
    zoom: 8.5,
  },
  "Northern Samar": {
    lat: 12.3613,
    lng: 124.7741,
    zoom: 8.8,
  },
  Samar: {
    lat: 11.8929,
    lng: 124.8333,
    zoom: 8.8,
  },
  "Southern Leyte": {
    lat: 10.3346,
    lng: 125.1706,
    zoom: 9,
  },

  // Region IX (Zamboanga Peninsula)
  "Zamboanga del Norte": {
    lat: 8.1541,
    lng: 123.2588,
    zoom: 8.6,
  },
  "Zamboanga del Sur": {
    lat: 7.8383,
    lng: 123.2967,
    zoom: 8.6,
  },
  "Zamboanga Sibugay": {
    lat: 7.5225,
    lng: 122.3108,
    zoom: 9,
  },

  // Region X (Northern Mindanao)
  Bukidnon: {
    lat: 8.153,
    lng: 125.127,
    zoom: 8.4,
  },
  Camiguin: {
    lat: 9.1732,
    lng: 124.7299,
    zoom: 10,
  },
  "Lanao del Norte": {
    lat: 7.8722,
    lng: 123.8854,
    zoom: 8.8,
  },
  "Misamis Occidental": {
    lat: 8.3375,
    lng: 123.7071,
    zoom: 8.8,
  },
  "Misamis Oriental": {
    lat: 8.5046,
    lng: 124.621,
    zoom: 8.8,
  },

  // Region XI (Davao Region)
  "Davao de Oro": {
    lat: 7.5618,
    lng: 126.1763,
    zoom: 8.8,
  },
  "Davao del Norte": {
    lat: 7.3172,
    lng: 125.684,
    zoom: 8.8,
  },
  "Davao del Sur": {
    lat: 6.7663,
    lng: 125.3284,
    zoom: 8.8,
  },
  "Davao Occidental": {
    lat: 6.2158,
    lng: 125.9978,
    zoom: 9,
  },
  "Davao Oriental": {
    lat: 7.317,
    lng: 126.541,
    zoom: 8.5,
  },

  // Region XII (SOCCSKSARGEN)
  "Cotabato": {
    lat: 7.2232,
    lng: 124.2464,
    zoom: 8.5,
  },
  Sarangani: {
    lat: 5.9267,
    lng: 125.195,
    zoom: 9,
  },
  "South Cotabato": {
    lat: 6.3358,
    lng: 124.7741,
    zoom: 8.8,
  },
  "Sultan Kudarat": {
    lat: 6.5069,
    lng: 124.4198,
    zoom: 8.8,
  },

  // CAR
  Abra: {
    lat: 17.593,
    lng: 120.619,
    zoom: 9,
  },
  Apayao: {
    lat: 18.012,
    lng: 121.171,
    zoom: 8.8,
  },
  Benguet: {
    lat: 16.4023,
    lng: 120.596,
    zoom: 9,
  },
  Ifugao: {
    lat: 16.8331,
    lng: 121.171,
    zoom: 9,
  },
  Kalinga: {
    lat: 17.474,
    lng: 121.354,
    zoom: 9,
  },
  "Mountain Province": {
    lat: 17.084,
    lng: 120.879,
    zoom: 9,
  },

    // Region XIII (Caraga)
  "Agusan del Norte": {
    lat: 9.078,
    lng: 125.604,
    zoom: 8.8,
  },
  "Agusan del Sur": {
    lat: 8.653,
    lng: 125.977,
    zoom: 8.5,
  },
  "Dinagat Islands": {
    lat: 10.128,
    lng: 125.609,
    zoom: 9.5,
  },
  "Surigao del Norte": {
    lat: 9.785,
    lng: 125.493,
    zoom: 8.8,
  },
  "Surigao del Sur": {
    lat: 8.541,
    lng: 126.115,
    zoom: 8.8,
  },

  // BARMM
  Basilan: {
    lat: 6.429,
    lng: 121.987,
    zoom: 9,
  },
  "Lanao del Sur": {
    lat: 7.823,
    lng: 124.419,
    zoom: 8.8,
  },
  "Maguindanao del Norte": {
    lat: 7.215,
    lng: 124.247,
    zoom: 8.8,
  },
  "Maguindanao del Sur": {
    lat: 6.934,
    lng: 124.441,
    zoom: 8.8,
  },
  Sulu: {
    lat: 6.053,
    lng: 121.002,
    zoom: 8.8,
  },
  "Tawi-Tawi": {
    lat: 5.133,
    lng: 119.950,
    zoom: 8.8,
  },

  // Negros Island Region (NIR)
  "Negros Occidental": {
    lat: 10.2926,
    lng: 123.0247,
    zoom: 8.3,
  },
  "Negros Oriental": {
    lat: 9.6282,
    lng: 123.3026,
    zoom: 8.5,
  },
  Siquijor: {
    lat: 9.1999,
    lng: 123.5952,
    zoom: 9.8,
  },
};