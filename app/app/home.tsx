import { Ionicons } from "@expo/vector-icons"; // Expo icon pack
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
    const [selected, setSelected] = useState("ETH"); // default token
    const [open, setOpen] = useState(false);

    const tokens = ["ETH", "BTC", "MATIC"];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Left icon */}
                <Ionicons name="menu" size={28} color="black" />

                {/* Right side */}
                <View style={styles.rightContainer}>
                    <Text style={styles.tokenLabel}>Tokens:</Text>

                    {/* Dropdown */}
                    <View style={styles.dropdownWrapper}>
                        <TouchableOpacity onPress={() => setOpen(!open)} style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{selected} ⌄</Text>
                        </TouchableOpacity>

                        {open && (
                            <View style={styles.dropdownMenu}>
                                {tokens.map((t) => (
                                    <TouchableOpacity
                                        key={t}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelected(t);
                                            setOpen(false);
                                        }}
                                    >
                                        <Text>{t}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </View>

            {/* Body */}
            <View style={styles.body}>
                <Text style={styles.welcome}>Welcome to the Home Page 🚀</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    tokenLabel: {
        fontSize: 16,
        marginRight: 8,
    },
    dropdownWrapper: {
        position: "relative",
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    dropdownText: {
        fontSize: 16,
    },
    dropdownMenu: {
        position: "absolute",
        top: 40,
        right: 0,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        elevation: 3,
        zIndex: 10,
    },
    dropdownItem: {
        padding: 10,
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcome: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
