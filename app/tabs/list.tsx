import { automateDao } from "@/api/automateDao";
import Button from "@/components/Button";
import { storage } from "@/utils/storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";

export default function ListScreen() {
  const [automates, setAutomates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAndFetch = async () => {
      // 🔑 Récupérer le token correctement
      const token = await storage.getToken();

      if (!token) {
        router.replace("/");
      } else {
        try {
          const data = await automateDao.getAllAutomate(); // passer token si nécessaire
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
      }
    };

    checkAndFetch();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chargement...</Text>
      </View>
    );
  }

  const handleViewAutomate = (id: string) => {
    router.push({
      pathname: "/automateviewer",
      params: { id: id },
    });
  };

  return (
    <View style={styles.container}>
      {Array.isArray(automates) && automates.length > 0 ? (
        automates.map((auto: any) => (
          <View style={styles.automateStyle} key={auto.id}>
            <Text key={auto.id} style={styles.automateStyle}>
              {auto.nom}
            </Text>
            <Button
              label={"Voir"}
              onPress={() => handleViewAutomate(auto.id)}
            />
          </View>
        ))
      ) : (
        <Text style={styles.title}>Aucun automate trouvé</Text>
      )}
    </View>
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
