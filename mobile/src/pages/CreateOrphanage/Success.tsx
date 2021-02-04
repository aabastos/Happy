import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'

//@ts-ignore
import successImg from '../../images/success.png';

export default function Success() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={successImg} />
            <Text style={styles.mainText}>Ebaaa!</Text>
            <Text style={styles.secondaryText}>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrphanagesMap')}>
                <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#39CC83'
    },

    mainText: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 32,
        lineHeight: 34,
        color: 'white',

        marginTop: 24
    },

    secondaryText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 30,
        color: 'white',

        textAlign: 'center',
        width: '75%',
        marginTop: 24
    },

    button: {
        marginTop: 24,

        justifyContent: 'center',
        alignItems: 'center',
        width: 128,
        height: 56,

        backgroundColor: '#19C06D',
        borderRadius: 16
    },

    buttonText: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 34,
        color: 'white'
    }
})