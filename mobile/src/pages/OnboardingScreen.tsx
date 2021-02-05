import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Onboarding from 'react-native-onboarding-swiper';

//@ts-ignore
import image1 from '../images/Onboarding01.png';
//@ts-ignore
import image2 from '../images/Onboarding02.png';

export default function OnboardingScreen({ navigation }) {
    // const navigation = useNavigation();
    const NextButton = ({ ...props }) => (
        <TouchableOpacity style={styles.nextButton} {...props}>
            <Feather name='arrow-right' size={40} color='#15B6D6' />
        </TouchableOpacity>
    )

    const DoneButton = ({ ...props }) => (
        <TouchableOpacity style={styles.nextButton} {...props}>
            <Feather name='arrow-right' size={40} color='#15B6D6' />
        </TouchableOpacity>
    )

    return (
        <Onboarding
            showSkip={false}
            bottomBarHighlight={false}
            NextButtonComponent={NextButton}
            DoneButtonComponent={DoneButton}
            onDone={() => navigation.replace('OrphanagesMap')}
            containerStyles={{
                padding: 50
            }}
            pages={[
                {
                    backgroundColor: '#FFF',
                    image: <Image source={image1} />,
                    title: 'Leve felicidade para o mundo',
                    subtitle: 'Visite orfanatos e mude o dia de muitas crianças',
                    titleStyles: styles.firstScreenTitle,
                    subTitleStyles: styles.firstScreenSubtitle
                },
                {
                    backgroundColor: '#FFF',
                    image: <Image source={image2} />,
                    title: 'Escolha um orfanato no mapa e faça uma visita',
                    subtitle: '',
                    titleStyles: styles.secondScreenTitle
                }
            ]}
        />
    )
}

const styles = StyleSheet.create({
    nextButton: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 16,
        backgroundColor: '#D1EDF2',

        marginRight: 40,
        marginBottom: 50
    },

    firstScreenTitle: {
        color: '#0089A5',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 48,
        lineHeight: 48,
        textAlign: 'left'
    },

    firstScreenSubtitle: {
        marginTop: 24,

        color: '#5C8599',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 30,
        textAlign: 'left'
    },

    secondScreenTitle: {
        color: '#0089A5',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 30,
        lineHeight: 36,
        textAlign: 'right'
    }
})