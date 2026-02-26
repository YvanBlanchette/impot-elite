--
-- PostgreSQL database dump
--

\restrict RkL3qQeYib4pFCI0uhYLWIM0DGau6LdC3xkhwoS3QKoropGAQpd8xVTrq9m9n4y

-- Dumped from database version 17.8 (6108b59)
-- Dumped by pg_dump version 17.9 (Ubuntu 17.9-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Configuration; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Configuration" (
    id text NOT NULL,
    cle text NOT NULL,
    valeur text,
    "estVisible" boolean DEFAULT true NOT NULL,
    description text,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Configuration" OWNER TO neondb_owner;

--
-- Name: Document; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Document" (
    id text NOT NULL,
    nom text NOT NULL,
    type text NOT NULL,
    chemin text NOT NULL,
    "dossierId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Document" OWNER TO neondb_owner;

--
-- Name: Dossier; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Dossier" (
    id text NOT NULL,
    annee integer NOT NULL,
    statut text DEFAULT 'en_attente'::text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "dateReceptionDocs" timestamp(3) without time zone,
    "dateTransmission" timestamp(3) without time zone,
    "modePaiement" text,
    "montantResultat" double precision,
    "tarifFacture" double precision,
    "transmisARC" boolean DEFAULT false NOT NULL,
    "transmisRQ" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Dossier" OWNER TO neondb_owner;

--
-- Name: FAQ; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."FAQ" (
    id text NOT NULL,
    question text NOT NULL,
    reponse text NOT NULL,
    ordre integer DEFAULT 0 NOT NULL,
    publie boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."FAQ" OWNER TO neondb_owner;

--
-- Name: Service; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Service" (
    id text NOT NULL,
    nom text NOT NULL,
    prix double precision NOT NULL,
    description text NOT NULL,
    populaire boolean DEFAULT false NOT NULL,
    ordre integer DEFAULT 0 NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    features text[]
);


ALTER TABLE public."Service" OWNER TO neondb_owner;

--
-- Name: Supplement; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Supplement" (
    id text NOT NULL,
    nom text NOT NULL,
    prix text,
    ordre integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Supplement" OWNER TO neondb_owner;

--
-- Name: User; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "clerkId" text NOT NULL,
    email text NOT NULL,
    nom text,
    prenom text,
    telephone text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    adresse text,
    "codePostal" text,
    ville text,
    "conjointDateNaissance" text,
    "conjointNas" text,
    "conjointNom" text,
    "conjointPrenom" text,
    "dateNaissance" text,
    "etatCivil" text,
    nas text,
    "noTps" text,
    "noTvq" text,
    "notesCrm" text,
    province text,
    consentement boolean DEFAULT false NOT NULL,
    "consentementDate" timestamp(3) without time zone,
    employeur text,
    "lienDossierExterne" text,
    "nbrEnfants" integer,
    "niveauPriorite" text DEFAULT 'normal'::text,
    occupation text,
    "revenuFourchette" text,
    "sourceAcquisition" text,
    "statutFiscal" text,
    "typeClient" text,
    "typesRevenus" text
);


ALTER TABLE public."User" OWNER TO neondb_owner;

--
-- Data for Name: Configuration; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Configuration" (id, cle, valeur, "estVisible", description, "updatedAt") FROM stdin;
cl-delai-123	DELAI_PRODUCTION	3	t	\N	2026-02-24 18:31:48.52
\.


--
-- Data for Name: Document; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Document" (id, nom, type, chemin, "dossierId", "createdAt") FROM stdin;
\.


--
-- Data for Name: Dossier; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Dossier" (id, annee, statut, "userId", "createdAt", "updatedAt", "dateReceptionDocs", "dateTransmission", "modePaiement", "montantResultat", "tarifFacture", "transmisARC", "transmisRQ") FROM stdin;
\.


--
-- Data for Name: FAQ; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."FAQ" (id, question, reponse, ordre, publie, "createdAt", "updatedAt") FROM stdin;
faq_1	Comment fonctionne le service ?	Créez votre profil, répondez à quelques questions et déposez vos documents en ligne. Un expert s'occupe du reste et vous transmet votre déclaration dans les meilleurs délais.	1	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
faq_2	Qui produit les déclarations d'impôts ?	Toutes les déclarations sont produites par Emmanuel Savard, titulaire d'un baccalauréat en administration des affaires et d'un diplôme d'études spécialisées en sciences comptables.	2	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
faq_3	Et si j'ai des questions durant le processus de dépôt ?	Vous pouvez nous contacter en tout temps via la messagerie du portail, par courriel ou par téléphone. Nous répondons dans les plus brefs délais.	3	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
faq_4	Quel est le processus une fois mon dossier déposé ?	Votre dossier est pris en charge par notre équipe. Nous vous contactons si des informations supplémentaires sont requises, puis nous vous transmettons votre déclaration pour approbation avant transmission.	4	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
faq_5	Quels sont les délais de production ?	Le délai de production actuel est affiché en temps réel sur notre site. En saison normale, la majorité des dossiers sont complétés en moins de 5 jours ouvrables.	5	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
faq_6	Comment savoir quels documents fournir ?	Après avoir répondu au questionnaire, la plateforme vous indique précisément quels documents sont requis selon votre situation.	6	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
faq_7	Comment est-ce que je fournis mes documents ?	Directement via le portail sécurisé. Vous pouvez téléverser des PDF, JPG ou PNG depuis votre ordinateur ou votre téléphone.	7	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
faq_8	Et s'il me manque certains documents ?	Vous pouvez soumettre votre dossier avec les documents disponibles et en ajouter d'autres par la suite. Nous vous aviserons si des pièces manquantes bloquent la production.	8	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
faq_9	Est-ce possible de produire des années antérieures ?	Oui, nous pouvons produire des déclarations pour les années antérieures. Contactez-nous pour obtenir une soumission.	9	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
faq_10	Êtes-vous ouvert à l'année ?	Oui, nous offrons le service à l'année. Bien que la saison des impôts soit de mars à juin, nous acceptons des mandats en tout temps.	10	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
faq_11	Quels sont les tarifs ?	Nos tarifs sont fixes et transparents, à partir de 55 $ pour une déclaration individuelle simple. Consultez la section Tarifs pour tous les détails.	11	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
faq_12	Quels sont les modes de paiements acceptés ?	Nous acceptons les paiements par carte de crédit, virement Interac et paiement en ligne sécurisé via notre portail.	12	t	2026-02-24 20:42:21.229	2026-02-24 20:42:21.229
\.


--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Service" (id, nom, prix, description, populaire, ordre, "updatedAt", features) FROM stdin;
ser_1	Individuel Simple	55	Déclaration de revenu simple pour particuliers.	f	1	2026-02-24 19:53:46.967	{"Revenu annuel moins de 25 000$","±4 feuillets"}
ser_2	Individuel	75	Déclaration de revenu standard pour les particuliers.	t	2	2026-02-24 19:53:46.967	{"Déclaration individuelle","Revenu annuel plus de 25 000$"}
ser_3	Couples & Famille	105	Déclaration de revenu conjointes pour les couples ou les familles.	f	3	2026-02-24 19:53:46.967	{"Déclaration conjointe","Déclaration famille"}
\.


--
-- Data for Name: Supplement; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Supplement" (id, nom, prix, ordre) FROM stdin;
sup_1	Déclaration d'enfants à charge	35	1
sup_5	Employés avec dépenses d'emploi	60	5
sup_3	Immeuble à revenus	60	3
sup_2	Enfants à charge (sans déclaration)	10	2
sup_4	Travailleur autonome	100	4
sup_7	Vente d'une résidence principale	30	7
sup_6	Crédit d'impôt pour maintien à domicile	25	6
sup_8	Revenus et dépenses d'entreprise ou revenus locatifs	50	8
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."User" (id, "clerkId", email, nom, prenom, telephone, "createdAt", "updatedAt", adresse, "codePostal", ville, "conjointDateNaissance", "conjointNas", "conjointNom", "conjointPrenom", "dateNaissance", "etatCivil", nas, "noTps", "noTvq", "notesCrm", province, consentement, "consentementDate", employeur, "lienDossierExterne", "nbrEnfants", "niveauPriorite", occupation, "revenuFourchette", "sourceAcquisition", "statutFiscal", "typeClient", "typesRevenus") FROM stdin;
cmm046ktc0000u2mx9t94y6fc	user_3A6JOOQoxgKRswjG2HXOnZhE1zs	yvanblanchette@gmail.com	Blanchette	Yvan junior	\N	2026-02-24 04:37:26.88	2026-02-24 06:42:11.444	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	\N	\N	normal	\N	\N	\N	\N	\N	\N
\.


--
-- Name: Configuration Configuration_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Configuration"
    ADD CONSTRAINT "Configuration_pkey" PRIMARY KEY (id);


--
-- Name: Document Document_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_pkey" PRIMARY KEY (id);


--
-- Name: Dossier Dossier_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Dossier"
    ADD CONSTRAINT "Dossier_pkey" PRIMARY KEY (id);


--
-- Name: FAQ FAQ_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."FAQ"
    ADD CONSTRAINT "FAQ_pkey" PRIMARY KEY (id);


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);


--
-- Name: Supplement Supplement_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Supplement"
    ADD CONSTRAINT "Supplement_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Configuration_cle_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "Configuration_cle_key" ON public."Configuration" USING btree (cle);


--
-- Name: User_clerkId_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "User_clerkId_key" ON public."User" USING btree ("clerkId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Document Document_dossierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES public."Dossier"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Dossier Dossier_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Dossier"
    ADD CONSTRAINT "Dossier_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

\unrestrict RkL3qQeYib4pFCI0uhYLWIM0DGau6LdC3xkhwoS3QKoropGAQpd8xVTrq9m9n4y

