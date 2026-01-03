import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
    id: number;
    name: string;
    abilities: Ability[];
    moves: Move[];
    stats: Stat[];
    sprites: {
        front_default: string | null;
    };
}

interface Ability {
    ability: {
        name: string;
        url: string;
    };
}

interface Move {
    move: {
        name: string;
        url: string;
    };
}

interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export default function Details() {
    const params = useLocalSearchParams<{ url?: string }>();

    const [detailsPokemon, setPokemonDetail] = useState<Pokemon | null>(null);

    useEffect(() => {
        FetchPokemonDetail();
    }, []);

    async function FetchPokemonDetail() {
        try {
            if (!params.url) return;

            const response = await fetch(params.url);
            const detail: Pokemon = await response.json();

            setPokemonDetail(detail);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {detailsPokemon && (
                <View style={styles.card} key={detailsPokemon.id}>
                    <Text style={styles.name}>
                        {detailsPokemon.name}
                    </Text>

                    <Image
                        source={{ uri: detailsPokemon.sprites.front_default ?? "" }}
                        style={styles.image}
                    />

                    {/* Abilities */}
                    <Text style={styles.sectionTitle}>Abilities</Text>
                    <View style={styles.badgeContainer}>
                        {detailsPokemon.abilities.map((item, index) => (
                            <View key={index} style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {item.ability.name}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Moves */}
                    <Text style={styles.sectionTitle}>Moves</Text>
                    <View style={styles.badgeContainer}>
                        {detailsPokemon.moves.slice(0, 12).map((item, index) => (
                            <View key={index} style={styles.moveBadge}>
                                <Text style={styles.badgeText}>
                                    {item.move.name}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Stats */}
                    <Text style={styles.sectionTitle}>Stats</Text>
                    <View style={styles.statsContainer}>
                        {detailsPokemon.stats.map((item, index) => (
                            <View key={index} style={styles.statItem}>
                                <Text style={styles.statName}>
                                    {item.stat.name}
                                </Text>
                                <Text style={styles.statValue}>
                                    {item.base_stat}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#F5F7FA",
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        gap: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },

    name: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        textTransform: "capitalize",
        color: "#0F172A",
    },

    image: {
        width: 150,
        height: 150,
        alignSelf: "center",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
    },

    badgeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },

    badge: {
        backgroundColor: "#E0F2FE",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    moveBadge: {
        backgroundColor: "#FFE4E6",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    badgeText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
        textTransform: "capitalize",
    },

    statsContainer: {
        gap: 12,
    },

    statItem: {
        backgroundColor: "#F1F5F9",
        padding: 12,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    statName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#475569",
        textTransform: "capitalize",
    },

    statValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
    },
});
