export const STATUT_CONFIG = {
  en_attente:     { label: "En attente",    color: "bg-yellow-100 text-yellow-700" },
  en_cours:       { label: "En traitement", color: "bg-blue-100 text-blue-700" },
  complete:       { label: "Complété",      color: "bg-[#006838]/10 text-[#006838]" },
  action_requise: { label: "Action requise", color: "bg-red-100 text-red-700" },
};

export const PROVINCES = ["AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT"];

export const TYPES_REVENUS_OPTIONS = [
  { value: "salarie",    label: "Salarié" },
  { value: "autonome",   label: "Travailleur autonome" },
  { value: "dividendes", label: "Dividendes" },
  { value: "loyers",     label: "Revenus locatifs" },
  { value: "retraite",   label: "Revenus de retraite" },
  { value: "crypto",     label: "Cryptomonnaies" },
  { value: "placement",  label: "Placements / intérêts" },
  { value: "bourse",     label: "Gains en capital" },
];

export const ONGLETS = [
  { id: "coordonnees", label: "Coordonnées" },
  { id: "fiscal",      label: "Fiscal" },
  { id: "conjoint",    label: "Conjoint(e)" },
  { id: "notes",       label: "Notes & Liens" },
  { id: "dossiers",    label: "Dossiers" },
];
