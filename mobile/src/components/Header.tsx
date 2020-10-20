import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

interface Props {
    title: string
    cancelButton: boolean
}

export default function Header(props: Props) {
    const navigation = useNavigation();

    function handleGoBackToHomeScreen() {
        navigation.navigate('OrphanagesMap');
    }

    return (
        <View style={styles.containter}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color='#15b6d6' />
            </BorderlessButton>

            <Text style={styles.title}>{props.title}</Text>

            { props.cancelButton ? (
                <BorderlessButton onPress={handleGoBackToHomeScreen}>
                    <Feather name="x" size={24} color='#ff669d' />
                </BorderlessButton>
            ) : (<View />)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 30,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        color: '#8fa7b3',
        fontSize: 16
    }
})