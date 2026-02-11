import { automateDao } from "@/api/automateDao";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function AutomateViewerScreen() {
  const { id } = useLocalSearchParams();
  const [automate, setAutomate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAutomate = async () => {
      if (!id) return;

      try {
        // id peut être string ou string[]
        const automateId = Array.isArray(id) ? id[0] : id;

        const data = await automateDao.getAutomateById(automateId);
        console.log("Automate reçu :", data);
        console.log("Etats reçus :", data.etats);
        console.log("Transitions reçues :", data.transitions);

        const formattedAutomate = {
          ...data,
          etats: data.etats?.$values || [],
          transitions: data.transitions?.$values || [],
        };

        setAutomate(formattedAutomate);
      } catch (error) {
        console.error("Erreur chargement automate :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAutomate();
  }, [id]);

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!automate) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Aucun automate trouvé</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Automate Viewer</Text>
      <Text>ID reçu : {id}</Text>
      <Text>Nom : {automate.nom}</Text>

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>États :</Text>
      {automate.etats && automate.etats.length > 0 ? (
        automate.etats.map((etat: any) => (
          <Text>
            ID : {etat.id}, Nom : {etat.nom}
          </Text>
        ))
      ) : (
        <Text>Aucun état trouvé</Text>
      )}

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>Transitions :</Text>
      {automate.transitions && automate.transitions.length > 0 ? (
        automate.transitions.map((transition: any) => (
          <Text>
            Nom : {transition.condition} (de {transition.etatDebut.id} à{" "}
            {transition.etatFinal.id})
          </Text>
        ))
      ) : (
        <Text>Aucune transition trouvée</Text>
      )}
    </View>
  );
}
