import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../services/api';

interface Params {
    position: {
        latitude: number,
        longitude: number
    },
    name: string,
    about: string,
    images: string[]
}

export default function OrphanageData2() {
    const navigation = useNavigation();

    const route = useRoute();
    const params = route.params as Params;
    const [instructions, setInstructions] = useState("");
    const [opening_hours, setOpeningHours] = useState("");
    const [open_on_weekends, setOpenOnWeekends] = useState(true);

    const [allDataSetted, setAllDataSetted] = useState(false);

    function handleSaveOrphanage() {
        const { latitude, longitude } = params.position;

        const data = new FormData();
        data.append('name', params.name);
        data.append('about', params.about);
        data.append('instructions', instructions);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));
        params.images.forEach((image, index) => {
            data.append('images', {
                name: `image_${index}.jpg`,
                type: 'image/jpg',
                uri: image
            } as any)
        });

        api.post('orphanages', data).then((response) => {
            if (response.status === 201) {
                navigation.navigate('Success');
            } else {
                alert('Falha na realização do cadastro!');
            }
        })
    }

    useEffect(() => {
        if (instructions !== '' && opening_hours !== '') setAllDataSetted(true);
        else setAllDataSetted(false);
    }, [instructions, opening_hours,]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
            <View style={styles.subHeaderContainer}>
                <Text style={styles.title}>Dados</Text>
                <View style={styles.indexContainer}>
                    <Text style={{ ...styles.index, opacity: 0.4 }}>01 - </Text>
                    <Text style={{ ...styles.index }}>02</Text>
                </View>
            </View>

            <Text style={styles.label}>Instruções</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={instructions}
                onChangeText={(text) => setInstructions(text)}
            />

            <Text style={styles.label}>Horario de visitas</Text>
            <TextInput
                style={styles.input}
                value={opening_hours}
                onChangeText={(text) => setOpeningHours(text)}
            />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Atende final de semana?</Text>
                <Switch
                    thumbColor="#fff"
                    trackColor={{ false: '#ccc', true: '#39CC83' }}
                    value={open_on_weekends}
                    onValueChange={() => setOpenOnWeekends(!open_on_weekends)}
                />
            </View>

            <RectButton style={{ ...styles.nextButton, opacity: allDataSetted ? 1 : 0.5 }} onPress={handleSaveOrphanage} enabled={allDataSetted}>
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    subHeaderContainer: {
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: '#D3E2E6',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },

    indexContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        color: '#5c8599',
        fontSize: 24
    },

    index: {
        color: '#5c8599',
        fontSize: 16,
        fontWeight: 'bold'
    },

    label: {
        color: '#8fa7b3',
        marginBottom: 8,
    },

    comment: {
        fontSize: 11,
        color: '#8fa7b3',
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },

    selectedImagesContainer: {
        flexDirection: 'row'
    },

    uploadedImage: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginBottom: 32,
        marginRight: 8
    },

    imagesInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderStyle: 'dashed',
        borderColor: '#96D2F0',
        borderWidth: 1.4,
        borderRadius: 20,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },

    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },

    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,
    },

    nextButtonText: {
        fontSize: 16,
        color: '#FFF',
    }
})