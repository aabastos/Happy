import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import * as ImagePicker from 'expo-image-picker';

interface Params {
    position: {
        latitude: number,
        longitude: number
    }
}

export default function OrphanageData1() {
    const navigation = useNavigation();

    const route = useRoute();
    const params = route.params as Params;

    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const [allDataSetted, setAllDataSetted] = useState(false);

    function handleNext() {
        navigation.navigate('OrphanageData2', {
            position: params.position,
            name,
            about,
            images
        });
    }

    async function handleSelectImages() {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

        if (status !== 'granted') {
            alert('Eita, precisamos de acesso à sua galeira...');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });

        if (result.cancelled === false) setImages([...images, result.uri]);
        else return;
    }

    function removeImage(index: number) {
        images.splice(index, 1);
        setImages([...images]);
    }

    useEffect(() => {
        if (name !== '' && about !== '' && images.length > 0) setAllDataSetted(true);
        else setAllDataSetted(false);
    }, [name, about, images]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
            <View style={styles.subHeaderContainer}>
                <Text style={styles.title}>Dados</Text>
                <View style={styles.indexContainer}>
                    <Text style={styles.index}>01</Text>
                    <Text style={{ ...styles.index, opacity: 0.4 }}> - 02</Text>
                </View>
            </View>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Text style={styles.label}>Sobre</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={about}
                onChangeText={(text) => setAbout(text)}
            />

            <Text style={styles.label}>Whatsapp</Text>
            <TextInput
                style={styles.input}
            />

            <Text style={styles.label}>Fotos</Text>
            <View style={styles.selectedImagesContainer}>
                {
                    images.map((image, index) => {
                        return (
                            <LinearGradient
                                key={`view${image}`}
                                style={styles.imageContainer}
                                colors={['rgba(161, 233, 197, 0.5)', 'transparent', 'rgba(214, 72, 123, 0.3)']}
                                start={{ x: 0.0, y: 1.0 }}
                                end={{ x: 1.0, y: 1.0 }}
                                locations={[0, 0.5, 1]}
                            >
                                <Image
                                    key={image}
                                    source={{ uri: image }}
                                    style={styles.uploadedImage}
                                />

                                <BorderlessButton onPress={() => removeImage(index)}>
                                    <Feather name='x' size={35} color='#D6487B' />
                                </BorderlessButton>
                            </LinearGradient>
                        )
                    })
                }
            </View>
            <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
                <Feather name="plus" size={24} color="#15B6D6" />
            </TouchableOpacity>

            <RectButton style={{ ...styles.nextButton, opacity: allDataSetted ? 1 : 0.5 }} onPress={handleNext} enabled={allDataSetted}>
                <Text style={styles.nextButtonText}>Próximo</Text>
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
        flexDirection: 'column'
    },

    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,

        borderRadius: 20,

        marginBottom: 8
    },

    uploadedImage: {
        width: 64,
        height: 64,
        borderRadius: 20
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

    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32
    },

    nextButtonText: {
        fontSize: 16,
        color: '#FFF',
    }
})