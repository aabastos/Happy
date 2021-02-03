import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';

import { Context } from '../../contexts/Context';

import { useNavigation } from '@react-navigation/native';
import { RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

//@ts-ignore
import mapMarkerImg from '../../images/map-marker.png';
//@ts-ignore
import cursorImg from '../../images/cursor.png';

export default function SelectMapPosition() {
    const { setMapHeaderVisibility } = useContext(Context);
    const navigation = useNavigation();
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    const [positionSelected, setPositionSelected] = useState(false);
    const [instructionVisible, setInstructionVisible] = useState(true);

    function handleNextStep() {
        navigation.navigate('OrphanageData1', {
            position: position
        });
    }

    function handleSelectMapPosition(event: MapEvent) {
        setPositionSelected(true);
        setPosition(event.nativeEvent.coordinate);
    }

    function handleFirstScreenTouch() {
        setInstructionVisible(false);
        setMapHeaderVisibility(true);
    }

    useEffect(() => {
        setMapHeaderVisibility(false);
    }, [])

    return (
        <View style={styles.container}>
            {
                instructionVisible ? (
                    <View style={styles.firstScreen}>
                        <TouchableWithoutFeedback style={{ zIndex: 101, width: '100%', height: '100%' }} onPress={handleFirstScreenTouch} >
                            <View style={styles.firstScreenButtonContainer}>
                                <Image source={cursorImg} />
                                <Text style={styles.firstScreenButtonText}>Toque no mapa para adicionar um orfanato</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )
                    : null
            }

            <MapView
                initialRegion={{
                    latitude: -19.8323469,
                    longitude: -43.9399492,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
                style={styles.mapStyle}
                onPress={handleSelectMapPosition}
            >
                {
                    (position.latitude !== 0 || position.longitude !== 0) && (
                        <Marker
                            icon={mapMarkerImg}
                            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
                        />
                    )
                }
            </MapView>

            {
                positionSelected ? (
                    <RectButton style={styles.nextButton} onPress={handleNextStep}>
                        <Text style={styles.nextButtonText}>Próximo</Text>
                    </RectButton>

                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },

    firstScreen: {
        backgroundColor: '#15B6D6',
        opacity: 0.75,

        position: 'absolute',
        left: 0,
        top: 0,

        zIndex: 100,

        width: Dimensions.get('window').width,
        height: '100%'
    },

    firstScreenButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    firstScreenButtonText: {
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 34,
        textAlign: 'center',

        color: 'white',

        width: '50%',
        marginTop: 20
    },

    mapStyle: {
        width: Dimensions.get('window').width,
        height: '100%'
    },

    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,

        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 40
    },

    nextButtonText: {
        fontSize: 16,
        color: '#FFF'
    }
})