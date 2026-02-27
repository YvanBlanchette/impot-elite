/**
 * Configuration des données - Impôt Élite
 * Ce fichier centralise tout le contenu dynamique du site.
 */

export const siteData = {
  business: {
    name: "Impôt Élite",
    currentDelay: 3,
    contactEmail: "info@impotelite.ca",
    status: "En service"
  },

  owner: {
    name: "Emmanuel Savard",
    role: "Fondateur & Expert",
    imageUrl: "emman.jpg",
    email: "emmanuelsavard@impotelite.ca",
    description: [
      "Expertise approfondie en fiscalité pour particuliers, orientée vers la maximisation de vos avantages.",
      "BAA & DESS en sciences comptables : une rigueur académique au service de votre tranquillité d'esprit."
    ],
    social: [
      { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61573978085209" },
      { label: "website", url: "https://www.impotelita.ca" }
    ]
  },

  // Section des Tarifs principaux
  pricing: [
    {
      id: "simple",
      title: "INDIVIDUEL SIMPLE",
      price: 55.00,
      currency: "$",
      isFeatured: false,
      description: "Déclaration de revenu simple pour particuliers.",
      features: [
        "Revenu annuel moins de 25 000$",
        "±4 feuillets"
      ]
    },
    {
      id: "individuel",
      title: "INDIVIDUEL",
      price: 75.00,
      currency: "$",
      isFeatured: true,
      description: "Déclaration de revenu standard pour les particuliers.",
      features: [
        "Couple et enfants",
        "Optimisation familiale"
      ]
    },
    {
      id: "famille",
      title: "COUPLES & FAMILLE",
      price: 105.00,
      currency: "$",
      isFeatured: false,
      description: "Déclaration de revenu conjointes pour les couples ou les familles.",
      features: [
        "Déclaration conjointe",
        "Déclaration famille"
      ]
    }
  ],

  // Section des Suppléments
  supplements: [
    { label: "Déclaration d'enfants à charge", price: 35 },
    { label: "Immeuble à revenus", price: 60 },
    { label: "Employés avec dépenses d'emploi", price: 60 },
    { label: "Vente d'une résidence principale", price: 30 },
    { label: "Enfants à charge (sans déclaration)", price: 10 },
    { label: "Crédit d'impôt pour maintien à domicile", price: 25 },
    { label: "Revenus et dépenses d'entreprise ou revenus locatifs", price: "50" }
  ],

  // Section FAQ
  faq: [
    {
      id: "fonctionnement-global",
      question: "Comment fonctionne le service ?",
      answer: "Notre processus est entièrement en ligne. Vous téléversez vos documents de façon sécurisée, nous traitons vos impôts et vous signez électroniquement."
    },
    {
      id: "producteur-rapports",
      question: "Qui produit les déclarations d'impôts ?",
      answer: "Toutes les déclarations sont produites par Emmanuel Savard, titulaire d'un baccalauréat en administration des affaires et d'un diplôme d'études spécialisées en sciences comptables."
    },
    {
      id: "questions-processus",
      question: "Et si j'ai des questions durant le processus de dépôt ?",
      answer: "Vous pouvez nous contacter en tout temps via la messagerie du portail, par courriel ou par téléphone. Nous répondons dans les plus brefs délais."
    },
    {
      id: "processus-depose",
      question: "Quel est le processus une fois mon dossier déposé ?",
      answer: "Votre dossier est pris en charge par notre équipe. Nous vous contactons si des informations supplémentaires sont requises, puis nous vous transmettons votre déclaration pour approbation avant transmission."
    },
    {
      id: "delais-production",
      question: "Quels sont les délais de production ?",
      answer: "Le délai de production actuel est affiché en temps réel sur notre site. En saison normale, la majorité des dossiers sont complétés en moins de 5 jours ouvrables."
    },
    {
      id: "quels-documents",
      question: "Comment savoir quels documents fournir ?",
      answer: "Après avoir répondu au questionnaire, la plateforme vous indique précisément quels documents sont requis selon votre situation."
    },
    {
      id: "comment-deposer",
      question: "Comment est-ce que je fournis mes documents ?",
      answer: "Directement via le portail sécurisé. Vous pouvez téléverser des PDF, JPG ou PNG depuis votre ordinateur ou votre téléphone."
    },
    {
      id: "documents-manquants",
      question: "Et s'il me manque certains documents ?",
      answer: "Vous pouvez soumettre votre dossier avec les documents disponibles et en ajouter d'autres par la suite. Nous vous aviserons si des pièces manquantes bloquent la production."
    },
    {
      id: "annees-anterieures",
      question: "Est-ce possible de produire des années antérieures ?",
      answer: "Oui, nous pouvons produire des déclarations pour les années antérieures. Contactez-nous pour obtenir une soumission."
    },
    {
      id: "ouvert-annee",
      question: "Êtes-vous ouvert à l'année ?",
      answer: "Oui, nous offrons le service à l'année. Bien que la saison des impôts soit de mars à juin, nous acceptons des mandats en tout temps."
    },
    {
      id: "tarifs",
      question: "Quels sont les tarifs ?",
      answer: "Nos tarifs sont fixes et transparents. Consultez la section Tarifs pour tous les détails."
    },
    {
      id: "modes-paiements",
      question: "Quels sont les modes de paiements acceptés ?",
      answer: "Nous acceptons les paiements par carte de crédit, virement Interac et paiement en ligne sécurisé via notre portail."
    },
  ]
};