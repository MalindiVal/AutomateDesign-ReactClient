import { automateDao } from "@/api/automateDao";
import AutomateCanvas from "@/components/automateCanvas";
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

        setAutomate(data);
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
      <AutomateCanvas automate={automate} />
    </View>
  );
}
