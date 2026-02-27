"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import { Loader2, ChevronLeft, User, Star, Pencil, Trash2, Upload } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ONGLETS } from "@/app/(protected)/dashboard/(admin)/clients/components/config";
import { TabCoordonneesLecture, TabCoordonneesEdition } from "@/app/(protected)/dashboard/(admin)/clients/components/TabCoordonnees";
import { TabFiscalLecture, TabFiscalEdition } from "@/app/(protected)/dashboard/(admin)/clients/components/TabFiscal";
import { TabConjointLecture, TabConjointEdition } from "@/app/(protected)/dashboard/(admin)/clients/components/TabConjoint";
import { TabNotesLecture, TabNotesEdition } from "@/app/(protected)/dashboard/(admin)/clients/components/TabNotes";
import TabDossiers from "@/app/(protected)/dashboard/(admin)/clients/components/TabDossiers";
import clsx from "clsx";
import { useIsAdmin } from "@/hooks/use-is-admin";
import Link from "next/link";

export default function ClientPage() {
  const { userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [ongletActif, setOngletActif] = useState("coordonnees");
  const [modeEdition, setModeEdition] = useState(false);
  const [sauvegarde, setSauvegarde] = useState(false);
  const [confirmSupprimer, setConfirmSupprimer] = useState(false);
  const [formData, setFormData] = useState({});

  const isAdmin = useIsAdmin();
  function buildFormData(c) {
    return {
    };
  }

  useEffect(() => {
    if (!userId || !isAdmin) return;
    fetch(`/api/admin/clients/${clientId}?userId=${userId}`)
      .then((r) => r.json())
      .then((data) => {
        setClient(data);
        setFormData(buildFormData(data));
        setChargement(false);
      });
  }, [userId, isAdmin, clientId]);

  const f = (key) => (e) => setFormData((p) => ({ ...p, [key]: e.target.value }));

  const sauvegarder = async () => {
    setSauvegarde(true);
    const payload = { ...formData, typesRevenus: formData.typesRevenus.join(","), userId };
    await fetch(`/api/admin/clients/${clientId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updated = { ...client, ...formData, typesRevenus: formData.typesRevenus.join(",") };
    setClient(updated);
    setSauvegarde(false);
    setModeEdition(false);
  };

  const supprimerClient = async () => {
    await fetch(`/api/admin/clients/${clientId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    router.push("/dashboard/clients");
  };

  if (!isAdmin) return <div className="p-8 text-neutral-500">Accès refusé.</div>;
  if (chargement)
    return (
      <div className="p-8 flex items-center gap-3 text-neutral-400">
        <Loader2 className="w-5 h-5 animate-spin" /> Chargement...
      </div>
    );

  return (
    <div className="min-h-full bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-5 h-26">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={clsx(
                "w-14 h-14 rounded-full flex items-center justify-center",
                client.niveauPriorite === "vip" ? "bg-[#c9a227]/15" : "bg-[#006838]/10",
              )}
            >
              <User className={clsx("w-6 h-6", client.niveauPriorite === "vip" ? "text-[#c9a227]" : "text-[#006838]")} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-neutral-900">
                  {client.prenom} {client.nom}
                </h1>
                {client.niveauPriorite === "vip" && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-[#c9a227]/15 text-[#c9a227] rounded-full font-medium">
                    <Star className="w-3 h-3" /> VIP
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-400 mt-0.5">
                {client.typeClient || "Client"} · {client.email}
                {client.telephone && ` · ${client.telephone}`}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {ongletActif === "dossiers" ? (
              <Link
                href={`/dashboard/clients/${clientId}/upload`}
                className="flex items-center gap-2 px-4 py-2 bg-[#006838] text-white text-sm rounded-lg hover:bg-[#005c31] transition-colors"
              >
                <Upload className="w-4 h-4" /> Déposer des documents
              </Link>
            ) : !modeEdition ? (
              <>
                <button
                  onClick={() => setModeEdition(true)}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-neutral-200 text-neutral-700 text-sm rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <Pencil className="w-4 h-4" /> Modifier
                </button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setConfirmSupprimer(true)}
                      className="cursor-pointer p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Supprimer le client</TooltipContent>
                </Tooltip>
              </>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setModeEdition(false);
                    setFormData(buildFormData(client));
                  }}
                  className="px-4 py-2 border border-neutral-200 text-neutral-700 text-sm rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={sauvegarder}
                  disabled={sauvegarde}
                  className="px-4 py-2 bg-[#006838] text-white text-sm rounded-lg hover:bg-[#005c31] disabled:opacity-50 transition-colors"
                >
                  {sauvegarde ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation suppression */}
        {confirmSupprimer && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
            <p className="text-sm text-red-700 font-medium">Supprimer ce client ? Cette action est irréversible.</p>
            <div className="flex gap-2">
              <button
                onClick={supprimerClient}
                className="px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirmer
              </button>
              <button
                onClick={() => setConfirmSupprimer(false)}
                className="px-4 py-1.5 border border-neutral-200 text-neutral-600 text-sm rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Onglets */}
      <div className="bg-[#006838]/5 border-b px-8">
        <div className="flex">
          {ONGLETS.map((o) => (
            <button
              key={o.id}
              onClick={() => setOngletActif(o.id)}
              className={clsx(
                "cursor-pointer px-5 py-3 text-sm border-b-2 -mb-px transition-colors",
                ongletActif === o.id ? "border-[#006838] text-[#006838] font-medium" : "border-transparent text-neutral-500 hover:text-neutral-700",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu */}
      <div className="">
        {ongletActif === "coordonnees" &&
          (modeEdition ? (
            <TabCoordonneesEdition
              formData={formData}
              f={f}
            />
          ) : (
            <TabCoordonneesLecture client={client} />
          ))}
        {ongletActif === "fiscal" &&
          (modeEdition ? (
            <TabFiscalEdition
              formData={formData}
              setFormData={setFormData}
              f={f}
            />
          ) : (
            <TabFiscalLecture client={client} />
          ))}
        {ongletActif === "conjoint" &&
          (modeEdition ? (
            <TabConjointEdition
              formData={formData}
              f={f}
            />
          ) : (
            <TabConjointLecture client={client} />
          ))}
        {ongletActif === "notes" &&
          (modeEdition ? (
            <TabNotesEdition
              formData={formData}
              f={f}
            />
          ) : (
            <TabNotesLecture client={client} />
          ))}
        {ongletActif === "dossiers" && <TabDossiers dossiers={client.dossiers} />}
      </div>
    </div>
  );
}
