import { automateDao } from "@/api/automateDao";
import AutomateCanvas from "@/components/automateCanvas";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function AutomateViewerScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [automate, setAutomate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Options", "Choisis une action", [
              {
                text: "Modifier",
                onPress: () => console.log("Edit"),
              },
              {
                text: "Supprimer",
                onPress: () => {
                  Alert.alert(
                    "Confirmation",
                    "Êtes-vous sûr de vouloir supprimer cet automate ?",
                    [
                      { text: "Annuler", style: "cancel" },
                      {
                        text: "Supprimer",
                        style: "destructive",
                        onPress: async () => {
                          if (!id) return;

                          await automateDao.deleteAutomate(id);
                          console.log("Automate supprimé");

                          navigation.goBack();
                        },
                      },
                    ],
                  );
                },
              },
              {
                text: "Exporter l'automate en Image",
                onPress: () => console.log("Export as Image"),
              },
              { text: "Annuler", style: "cancel" },
            ])
          }
        >
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });

    const fetchAutomate = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const automateId = Array.isArray(id) ? id[0] : id;

        if (!automateId) {
          setLoading(false);
          return;
        }

        const data = await automateDao.getAutomateById(automateId);
        console.log("Automate reçu :", data);

        setAutomate(data);
      } catch (error) {
        console.error("Erreur chargement automate :", error);
        setError("Impossible de charger l'automate");
        setAutomate(null);
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

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text>{error}</Text>
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AutomateCanvas automate={automate} />
    </View>
  );
}
