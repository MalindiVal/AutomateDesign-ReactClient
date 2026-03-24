import { automateDao } from "@/api/automateDao";
import Button from "@/components/Button";
import { storage } from "@/utils/storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
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

  const fetchAutomates = async () => {
    try {
      const data = await automateDao.getAllAutomate();
      setAutomates(data);
    } catch (error) {
      if (Platform.OS === "web") {
        window.alert("Erreur : " + error);
      } else {
        Alert.alert("Erreur", "Impossible de récupérer les automates");
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const checkAndFetch = async () => {
        const token = await storage.getToken();

        if (!token) {
          router.replace("/");
          return;
        }

        setLoading(true);
        await fetchAutomates();
      };

      checkAndFetch();
    }, []),
  );

  const handleViewAutomate = (id: string) => {
    router.push({
      pathname: "/automateviewer",
      params: { id },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
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
            <Button
              label="Supprimer"
              onPress={() =>
                Alert.alert("Confirmation", "Supprimer ?", [
                  { text: "Annuler" },
                  {
                    text: "OK",
                    onPress: async () => {
                      await automateDao.deleteAutomate(auto.id);
                      fetchAutomates();
                    },
                  },
                ])
              }
            />
          </View>
        ))
      ) : (
        <Text style={styles.empty}>Aucun automate trouvé</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 20,
    width: "100%",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  automateStyle: {
    backgroundColor: "#525252",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  empty: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});
