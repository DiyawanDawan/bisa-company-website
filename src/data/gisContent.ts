export type GisWastePoint = {
  id: string;
  name: string;
  province: string;
  regency: string;
  type: 'ORGANIK' | 'AGRI' | 'BIOMASS';
  volumeTon: number;
  lat: number;
  lng: number;
  suppliers: number;
};

export const gisWastePoints: GisWastePoint[] = [
  {
    id: '1',
    name: 'Cluster Hortikultura Pangalengan',
    province: 'Jawa Barat',
    regency: 'Bandung',
    type: 'ORGANIK',
    volumeTon: 420,
    lat: -7.589,
    lng: 107.589,
    suppliers: 38,
  },
  {
    id: '2',
    name: 'Sentra Sayur Ciwidey',
    province: 'Jawa Barat',
    regency: 'Bandung',
    type: 'AGRI',
    volumeTon: 310,
    lat: -7.118,
    lng: 107.358,
    suppliers: 27,
  },
  {
    id: '3',
    name: 'Agroforestry Gununghejo',
    province: 'Jawa Barat',
    regency: 'Bandung',
    type: 'BIOMASS',
    volumeTon: 265,
    lat: -6.903,
    lng: 107.619,
    suppliers: 22,
  },
  {
    id: '4',
    name: 'Hortikultura Lembang',
    province: 'Jawa Barat',
    regency: 'West Bandung',
    type: 'ORGANIK',
    volumeTon: 198,
    lat: -6.829,
    lng: 107.618,
    suppliers: 19,
  },
  {
    id: '5',
    name: 'Cluster Cabai Garut',
    province: 'Jawa Barat',
    regency: 'Garut',
    type: 'AGRI',
    volumeTon: 175,
    lat: -7.214,
    lng: 107.901,
    suppliers: 15,
  },
];

export const gisBiomassTypes = ['ALL', 'ORGANIK', 'AGRI', 'BIOMASS'] as const;
