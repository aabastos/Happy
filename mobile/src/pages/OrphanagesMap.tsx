import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons'
import mapMarker from '../images/map-marker.png';

import api from '../services/api';

interface Image {
    id: number,
    url: string
}

interface Orphanage {
    id: number,
    name: string,
    about: string,
    latitude: number,
    longitude: number,
    instructions: string,
    opening_hours: string,
    open_on_weekends: boolean,
    images: Image[]
}

export default function OrphanagesMap() {
    const navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    function handleOrphanageDetailNavigation(orphanage_id: string) {
        navigation.navigate('OrphanageDetail', {
            orphanage_id
        });
    }

    function handleCreateOrphanage() {
        navigation.navigate('SelectMapPosition');
    }

    useEffect(() => {
        api.get("/orphanages").then(response => {
            setOrphanages(response.data);
        })
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -19.8321945,
                    longitude: -43.9378459,
                    latitudeDelta: 0.0008,
                    longitudeDelta: 0.0008
                }}
            >
                {
                    orphanages.map(orphanage => {
                        return (
                            <Marker
                                key={orphanage.id}
                                icon={mapMarker}
                                coordinate={{
                                    latitude: orphanage.latitude,
                                    longitude: orphanage.longitude,
                                }}
                                calloutAnchor={{
                                    x: 3.1,
                                    y: 1.0
                                }}
                            >
                                <Callout tooltip onPress={() => handleOrphanageDetailNavigation(orphanage.id)}>
                                    <View style={styles.calloutContainter}>
                                        <Text style={styles.calloutText}>{orphanage.name}</Text>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })
                }
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{`${orphanages.length} orfanatos encontrados.`}</Text>

                <RectButton style={styles.createOrphanageButton} onPress={handleCreateOrphanage}>
                    <Feather name='plus' size={20} color='#FFF' />
                </RectButton>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: '100%'
    },
    calloutContainter: {
        width: 200,
        height: 66,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    calloutText: {
        color: '#15C3D6',
        fontSize: 26,
        fontWeight: 'bold'
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: '#FFF',

        height: 56,
        paddingLeft: 24,
        borderRadius: 16,

        elevation: 3
    },
    footerText: {
        fontSize: 15,
        lineHeight: 25,
        color: '#8FA7B2'
    },
    createOrphanageButton: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#15C3D6',
        borderRadius: 16
    }
});