import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const projects = [
    {
        title: "Coastal Mangrove Restoration",
        location: "Philippines",
        area: "100 acres / Mangrove",
        planted: "2023-05-15",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAIlWzdAUTdOmG3mXYm4Wkq9IvvuU9BA7NPYREB2NSisqXDjRkC3nGV0NFlDOxa_-8leXRqAUXBJGge9bGUQgaJpxSdzjY7rUm9Ldtj8ObHrqDJ0fhk_FzlzLLHVXDoMBE8NiGJCcw6kP5nWM9kr_K9nS5JcJ7lvRTJqigRewcHBswYEn9pEN52XGqLEN74CvTGaJ-YnWyGfpGctoS23-xAhAvmKy9788CRPYoY_Xo6o9dDPEWOFbY7D3d36r-6yIWzFKD3bCOZL8Q",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDhq6PVQfTebm8Vv6S0HeFp5jlfnlP630-q86gS93pgpazxsE7_pNygWHfxNAzK9ufLQ7kkoRANJnbIVmiPwFXAWPp7ragLAcx4egXIA7P_e5EH6oXA7jZ9ZV_I63efzZb5GQi74jAP5i3Tod5_wUWme8NucMZcgrZgwgAnkX3LjI9plmmEptU81j6_iDta5m4YtZn_uSGUIXZLJI7oMtIUk7eX9X97K8VXkc6qANcfDwYGH89rY0-LJD9pmVI68BTYVKziYk9OrRw"
        ]
    },
    {
        title: "Seagrass Bed Restoration",
        location: "Indonesia",
        area: "50 acres / Seagrass",
        planted: "2023-08-22",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuACZ7qhr_t7Thurhm7biyFBh4POQJpIYQ0N_4encrO1BbRKp3nv1Qr0tPde3uf1UEOvUV2OUWhCfSH9aS2_aflgjIhf7HGKuPG_n3bykgtaXOUyiLQdkdaqzOLkzi5JExDehrr5_-i2HxCXL8cGGeyIxV5oFi-GZxchO4oSBbjV8sXMVAGZdR-hwAaIQNbYfwlXz35BxxTD1ZcOWpMmNkcf2j6vaSiNSz94BI6xtUMKPbllgASASkHp559hz5PldrVH1AodC6DSXaw",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAjm6c-_-bQ4hueq_Ev8XYtEa9QZpjdxWyBEmpD1DILACFg02FybkdCZ2it8OBerazao_uNVTQgKGjHuaFBj5vPlFLpYZ1sfxn9zqlqngSugb5rJzYdSSeR-mG73HBJmiKGwsP5dw0332GIOkCyhiu8bdRjznxYAt99rpNFlodv3VEfjkiV_1gAEN1qtGNH5DTIgo3dF92rhqNFDgcSn3p8UQih4vdU4l98VSBto5zUnP6ueWK1BJJnti3k0tlfSp-CvwAarxo3KMM"
        ]
    },
    {
        title: "Coral Reef Restoration",
        location: "Fiji",
        area: "20 acres / Coral Reef",
        planted: "2024-01-10",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCRR2UBZ1bQFoldPgA8s35k7dJvWAqdUPoTl_OnvB7GuOUzwJHcMDOsJRu_XHhHoj4IkVVlENU6H7cltUT-J0cg4QWUdUb_Ke_LV9AnKMvLwvmgbuiv8JNYx8mtEUuoFoDgY8Hhnpx0Yt3cvZ8gYCK9Udtv6y7v88ELrKLpcfu0uWmThmsyHgDsllvYb29ZCwuGvZU0U08owjDcRxYAnnzQQMf2ZGkoarVSEBgfgLecX-wyH5Z70jzBIAjyLtVWDxGTyvvXR3MpFn8",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCjkTNHO8L03E_fZY8RNK98JKUmuPXV2XCCxLfm7c0hSwzFbCUNvPoemOnFLwBueDnVxuMOP5iOmmcOofYZde6rTesBuDqO-3RxD7xZF6SszA56ZpY4ljLPIhsJ10aFiR8bF0NIfaEfCxITFOm4UwCUJu8NEXVOA07oEgHbmhPAtYJ7o0yWysYHy68-wtJgkIHQIkSlZKl2HCj5yEpZ0Su3W-iXm6zQZPVl727CILOj_E-S2nmkNwoReNDHhz_hE8Bk17M5Bs2NeOg"
        ]
    }
];

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            {/* @ts-ignore */}
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <MaterialIcons name="waves" size={32} color="#1E88E5" />
                <View style={styles.wallet}>
                    <MaterialIcons name="account-balance-wallet" size={20} color="#43A047" />
                    <Text style={styles.walletText}>1200 CC</Text>
                </View>
            </View>

            {/* Main */}
            <ScrollView style={styles.main} contentContainerStyle={{ paddingBottom: 80 }}>
                <Text style={styles.title}>My Projects</Text>

                {projects.map((project, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.imageRow}>
                            {project.images.map((img, idx) => (
                                <Image key={idx} source={{ uri: img }} style={styles.image} />
                            ))}
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{project.title}</Text>
                            <View style={styles.cardInfo}>
                                <View style={styles.infoRow}>
                                    <MaterialIcons name="location-on" size={16} color="#6B7280" />
                                    <Text>{project.location}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <MaterialIcons name="area-chart" size={16} color="#6B7280" />
                                    <Text>{project.area}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <MaterialIcons name="calendar-today" size={16} color="#6B7280" />
                                    <Text>Planted: {project.planted}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem}>
                    <MaterialIcons name="home" size={24} color="#1E88E5" />
                    <Text style={styles.footerTextActive}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <MaterialIcons name="folder" size={24} color="#6B7280" />
                    <Text style={styles.footerText}>Projects</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <MaterialIcons name="person" size={24} color="#6B7280" />
                    <Text style={styles.footerText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    wallet: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },
    walletText: { fontSize: 14, fontWeight: 'bold', color: '#1F2937', marginLeft: 4 },
    main: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
    card: { marginBottom: 24, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, overflow: 'hidden', backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
    imageRow: { flexDirection: 'row' },
    image: { width: '50%', height: 160, resizeMode: 'cover' },
    cardContent: { padding: 16, paddingTop: 8 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
    cardInfo: { gap: 4 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
    footer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 8, borderTopWidth: 1, borderTopColor: '#E5E7EB', backgroundColor: 'rgba(255,255,255,0.8)' },
    footerItem: { alignItems: 'center' },
    footerText: { fontSize: 12, fontWeight: '500', color: '#6B7280' },
    footerTextActive: { fontSize: 12, fontWeight: '500', color: '#1E88E5' },
});
