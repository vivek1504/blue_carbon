import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={{ width: 40 }} /> {/* placeholder for right */}
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Avatar */}
                <View style={styles.avatarContainer}>
                    <Image
                        source={{
                            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo3YByqBbfx7GIV5JMfe36fTIITIdPZXlmyW1WMFHRxMX6jBPOf6otr-efh27bf5BEhZ9aewtpr-e9T90tQonrhvnA_EwPCEZrlvATb7zgwyr0p9slEiHRa0--KAd_OqgAKO6UNzorbMDssM2iKEQcGHZfBWXx7IEWrraKlu0rzJPhWorCHsfbex2f3lMWz65RkyyUpGyEwvMB6jrDT3bkFK-Der1VKzj8NDiPzMcttCrFyUMs-n0z921pZsJ3CPcMQrRCbCc0h5M"
                        }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>Ocean Conservation Initiative</Text>
                    <View style={styles.infoRow}>
                        <MaterialIcons name="location-on" size={16} color="#6B7280" />
                        <Text style={styles.infoText}>San Diego, CA</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <MaterialIcons name="layers" size={16} color="#6B7280" />
                        <Text style={styles.infoText}>4 Projects</Text>
                    </View>
                </View>

                {/* Wallet Section */}
                <View style={styles.walletCard}>
                    <Text style={styles.cardTitle}>Wallet</Text>

                    {/* Wallet Address */}
                    <View style={styles.walletRow}>
                        <View style={[styles.walletIcon, { backgroundColor: '#1E88E5' }]}>
                            <MaterialIcons name="wallet" size={24} color="white" />
                        </View>
                        <View style={styles.walletTextContainer}>
                            <Text style={styles.walletLabel}>Wallet Address</Text>
                            <Text style={styles.walletValue}>0x123...456</Text>
                        </View>
                        <TouchableOpacity>
                            <MaterialIcons name="content-copy" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    {/* Total Carbon Credits */}
                    <View style={styles.walletRow}>
                        <View style={[styles.walletIcon, { backgroundColor: '#43A047' }]}>
                            <MaterialIcons name="eco" size={24} color="white" />
                        </View>
                        <View style={styles.walletTextContainer}>
                            <Text style={styles.walletLabel}>Total Carbon Credits</Text>
                            <Text style={styles.carbonCredits}>1,234</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer Navigation */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem}>
                    <MaterialIcons name="home" size={24} color="#6B7280" />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <MaterialIcons name="list-alt" size={24} color="#6B7280" />
                    <Text style={styles.footerText}>Projects</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <MaterialIcons name="person" size={24} color="#1E88E5" />
                    <Text style={[styles.footerText, { color: '#1E88E5' }]}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 128,
        height: 128,
        borderRadius: 128 / 2,
        marginBottom: 12,
        borderWidth: 4,
        borderColor: 'white',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    infoText: {
        color: '#6B7280',
        fontSize: 14,
        marginLeft: 4,
    },
    walletCard: {
        width: '100%',
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
    },
    walletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    walletIcon: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    walletTextContainer: {
        flex: 1,
    },
    walletLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    walletValue: {
        fontSize: 14,
        color: '#6B7280',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginVertical: 8,
    },
    carbonCredits: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#43A047',
    },
    footer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    footerItem: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6B7280',
        marginTop: 2,
    },
});
