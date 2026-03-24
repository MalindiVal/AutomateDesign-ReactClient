import { automateDao } from "@/api/automateDao";
import Button from "@/components/Button";
import { storage } from "@/utils/storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ListAutomates() {
  const [automates, setAutomates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAndFetch = async () => {
      const token = await storage.getToken();

      if (!token) {
        router.replace("/");
        return;
      }

      try {
        const data = await automateDao.getAllAutomate();
        setAutomates(data);
      } catch (error) {
        if (Platform.OS === "web") {
          window.alert(
            "Erreur lors de la récupération des automates : " + error,
          );
        } else {
          Alert.alert("Erreur", "Impossible de récupérer les automates");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAndFetch();
  }, []);

  const handleViewAutomate = (id: string) => {
    router.push({
      pathname: "/automateviewer",
      params: { id },
    });
  };

  if (loading) {
    return (
      <View>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {automates.length > 0 ? (
        automates.map((auto) => (
          <View key={auto.id} style={styles.automateStyle}>
            <Text style={styles.title}>{auto.nom}</Text>

            <Button label="Voir" onPress={() => handleViewAutomate(auto.id)} />
          </View>
        ))
      ) : (
        <Text>Aucun automate trouvé</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",

    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
  },
  automateStyle: {
    backgroundColor: "#525252",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});
