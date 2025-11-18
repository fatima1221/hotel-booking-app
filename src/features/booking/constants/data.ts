export const COUNTRIES = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'Italy', code: 'IT' },
  { name: 'Spain', code: 'ES' },
  { name: 'Japan', code: 'JP' },
  { name: 'Australia', code: 'AU' },
];

export const BOARD_TYPES = [
  { code: 'FB', name: 'Full Board', description: 'Breakfast, Lunch & Dinner included' },
  { code: 'HB', name: 'Half Board', description: 'Breakfast & one meal included' },
  { code: 'NB', name: 'No Board', description: 'No meals included' },
];

export const HOTELS = {
  'United States': [
    { id: '1', name: 'Luxury Manhattan Suite', price: 450 },
    { id: '2', name: 'Downtown LA Penthouse', price: 380 },
    { id: '3', name: 'Miami Beach Resort', price: 320 },
  ],
  'United Kingdom': [
    { id: '4', name: 'London Kensington Palace', price: 520 },
    { id: '5', name: 'Oxford Street Deluxe', price: 380 },
    { id: '6', name: 'Edinburgh Royal Suite', price: 340 },
  ],
  'France': [
    { id: '7', name: 'Paris Eiffel Tower View', price: 580 },
    { id: '8', name: 'Versailles Grand Hotel', price: 450 },
    { id: '9', name: 'Riviera Luxury Escape', price: 420 },
  ],
  'Germany': [
    { id: '10', name: 'Berlin Modern Suite', price: 380 },
    { id: '11', name: 'Munich Bavarian Palace', price: 420 },
    { id: '12', name: 'Frankfurt Executive Room', price: 340 },
  ],
  'Italy': [
    { id: '13', name: 'Venice Grand Canal', price: 620 },
    { id: '14', name: 'Rome Colosseum View', price: 520 },
    { id: '15', name: 'Florence Renaissance Suite', price: 480 },
  ],
  'Spain': [
    { id: '16', name: 'Barcelona Sagrada Suite', price: 450 },
    { id: '17', name: 'Madrid Royal Palace', price: 420 },
    { id: '18', name: 'Seville Andalusian Retreat', price: 380 },
  ],
  'Japan': [
    { id: '19', name: 'Tokyo Shinjuku Luxury', price: 500 },
    { id: '20', name: 'Kyoto Traditional Palace', price: 480 },
    { id: '21', name: 'Osaka Modern Tower', price: 420 },
  ],
  'Australia': [
    { id: '22', name: 'Sydney Harbour Penthouse', price: 540 },
    { id: '23', name: 'Melbourne Arts District', price: 420 },
    { id: '24', name: 'Great Barrier Reef Resort', price: 480 },
  ],
};

export const MEALS = {
  'United States': {
    lunch: [
      { id: 'us-l1', name: 'NY Steakhouse Lunch', price: 65 },
      { id: 'us-l2', name: 'Italian Pasta Set', price: 45 },
      { id: 'us-l3', name: 'Gourmet Burger', price: 40 },
    ],
    dinner: [
      { id: 'us-d1', name: 'Premium Steakhouse Dinner', price: 120 },
      { id: 'us-d2', name: 'Michelin Fine Dining', price: 180 },
      { id: 'us-d3', name: 'BBQ Ribs Feast', price: 85 },
    ],
  },
  'United Kingdom': {
    lunch: [
      { id: 'uk-l1', name: 'Traditional Fish & Chips', price: 35 },
      { id: 'uk-l2', name: 'Sunday Roast', price: 50 },
      { id: 'uk-l3', name: 'High Tea Experience', price: 55 },
    ],
    dinner: [
      { id: 'uk-d1', name: 'Michelin Star Dining', price: 160 },
      { id: 'uk-d2', name: 'Prime Rib Dinner', price: 95 },
      { id: 'uk-d3', name: 'Welsh Lamb Feast', price: 105 },
    ],
  },
  'France': {
    lunch: [
      { id: 'fr-l1', name: 'Coq au Vin Lunch', price: 75 },
      { id: 'fr-l2', name: 'Salade Nicoise', price: 45 },
      { id: 'fr-l3', name: 'Croque Monsieur', price: 40 },
    ],
    dinner: [
      { id: 'fr-d1', name: 'French Haute Cuisine', price: 200 },
      { id: 'fr-d2', name: 'Beef Bourguignon', price: 130 },
      { id: 'fr-d3', name: 'Duck Confit Delight', price: 120 },
    ],
  },
  'Germany': {
    lunch: [
      { id: 'de-l1', name: 'Bavarian Schnitzel', price: 50 },
      { id: 'de-l2', name: 'Bratwurst Special', price: 40 },
      { id: 'de-l3', name: 'Pretzel & Cheese', price: 30 },
    ],
    dinner: [
      { id: 'de-d1', name: 'Traditional Sauerbraten', price: 95 },
      { id: 'de-d2', name: 'Black Forest Dinner', price: 110 },
      { id: 'de-d3', name: 'Pork Knuckle Feast', price: 100 },
    ],
  },
  'Italy': {
    lunch: [
      { id: 'it-l1', name: 'Pasta Carbonara', price: 55 },
      { id: 'it-l2', name: 'Risotto alla Milanese', price: 60 },
      { id: 'it-l3', name: 'Caprese Salad', price: 35 },
    ],
    dinner: [
      { id: 'it-d1', name: 'Truffle Pasta Dinner', price: 180 },
      { id: 'it-d2', name: 'Osso Buco', price: 140 },
      { id: 'it-d3', name: 'Fresh Seafood Delight', price: 155 },
    ],
  },
  'Spain': {
    lunch: [
      { id: 'es-l1', name: 'Paella Valenciana', price: 65 },
      { id: 'es-l2', name: 'Tapas Selection', price: 50 },
      { id: 'es-l3', name: 'Gazpacho & Bread', price: 30 },
    ],
    dinner: [
      { id: 'es-d1', name: 'Premium Paella Dinner', price: 130 },
      { id: 'es-d2', name: 'Jamón Ibérico Feast', price: 150 },
      { id: 'es-d3', name: 'Seafood Para Dinner', price: 140 },
    ],
  },
  'Japan': {
    lunch: [
      { id: 'jp-l1', name: 'Sushi Set Lunch', price: 70 },
      { id: 'jp-l2', name: 'Udon Noodles', price: 35 },
      { id: 'jp-l3', name: 'Bento Box Premium', price: 55 },
    ],
    dinner: [
      { id: 'jp-d1', name: 'Omakase Sushi Dinner', price: 250 },
      { id: 'jp-d2', name: 'Wagyu Beef Dinner', price: 200 },
      { id: 'jp-d3', name: 'Kaiseki Multi-Course', price: 220 },
    ],
  },
  'Australia': {
    lunch: [
      { id: 'au-l1', name: 'Barramundi Lunch', price: 65 },
      { id: 'au-l2', name: 'Lamb Chops', price: 70 },
      { id: 'au-l3', name: 'Avocado Toast', price: 35 },
    ],
    dinner: [
      { id: 'au-d1', name: 'Premium Barramundi', price: 145 },
      { id: 'au-d2', name: 'Wagyu Steak Dinner', price: 160 },
      { id: 'au-d3', name: 'Seafood Platter', price: 155 },
    ],
  },
};

