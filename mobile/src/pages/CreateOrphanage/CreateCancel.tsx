import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CreateCancel() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Feather name='x' size={35} color='#FF669D' />
            </View>
            <Text style={styles.mainText}>Cancelar cadastro</Text>
            <Text style={styles.secondaryText}>Tem certeza que quer cancelar esse cadastro?</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={{
                        ...styles.button,
                        backgroundColor: '#FF669D',
                        marginEnd: 5
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.button,
                        backgroundColor: '#D6487B',
                        marginStart: 5
                    }}
                    onPress={() => navigation.navigate('OrphanagesMap')}
                >
                    <Text style={styles.buttonText}>Sim</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#FF669D',

        width: Dimensions.get('window').width,
        height: '100%'
    },

    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 64,
        height: 64,

        backgroundColor: 'white',
        borderRadius: 16
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
        width: '50%',
        marginTop: 24
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        width: '100%',

        marginTop: 24
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 128,
        height: 56,

        borderRadius: 16,
        borderColor: '#D6487B',
        borderWidth: 3
    },

    buttonText: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 34,
        color: 'white'
    }
})