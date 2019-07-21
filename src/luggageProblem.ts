import ConstraintDeclaration from './ConstraintDeclaration';

// !!! Puzzel klopt niet - heeft 11 oplossingen, niet 1

export const variables = [
  {
    "name": "bagage",
    "values": [ "A", "B", "C", "D", "E", "F" ]
  },
  {
    "name": "kleur",
    "values": [ "Blauw", "Bruin", "Groen", "Oranje", "Rood", "Zwart" ]
  },
  {
    "name": "soort",
    "values": [ "Handkoffer", "Plunjezak", "Reiskoffer", "Reistas", "Rugzak", "Sporttas" ]
  },
  {
    "name": "naam",
    "values": [ "Bulhof", "Abby Loftus", "Molstra", "Patel", "J. Schwartz", "SWB" ]
  }
];

export const constraintDeclarations: ConstraintDeclaration[] = [
  // 1. Het groene stuk bagage, met de naam Molstra, bevindt zich recht tegenover de reiskoffer; ...
  [ 'eq', 1, 2, 0, 3, 2 ],
  [ 'eq', 1, 2, 3, 2, 2 ],
  // 1. ... dit is niet het rode artikel D.
  [ 'eq', 0, 3, 0, 1, 4 ],
  [ 'nq', 0, 3, 0, 2, 2 ],
  // 2. Het blauwe stuk bagage ligt direct achter dat van Abby Loftus; ...
  [ 'eq', 1, 0, 1, 3, 1 ],
  // 2. ... dit is niet het zwarte, ...
  [ 'nq', 3, 1, 0, 1, 5 ],
  // 2. ... dat twee plaatsen voor het bruine voorbijdraait.
  [ 'eq', 1, 1, 2, 1, 5 ],
  // 3. De sporttas is van J. Schwartz
  [ 'eq', 2, 5, 0, 3, 4 ],
  // 4. De oranje rugzak is niet van Patel
  [ 'eq', 2, 4, 0, 1, 3 ],
  [ 'nq', 2, 4, 0, 3, 3 ],
  // 5. Artikel C, met het label SWB, is geen reistas
  [ 'eq', 0, 2, 0, 3, 5 ],
  [ 'nq', 0, 2, 0, 2, 3 ],
  // 6. Bij E ziet u een eenvoudige handkoffer
  [ 'eq', 0, 4, 0, 2, 0 ],
];
