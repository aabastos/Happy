import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Context } from './contexts/Context';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetail from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData1 from './pages/CreateOrphanage/OrphanageData1';
import OrphanageData2 from './pages/CreateOrphanage/OrphanageData2';
import Success from './pages/CreateOrphanage/Success';
import CreateCancel from './pages/CreateOrphanage/CreateCancel';
import Header from './components/Header';

export default function Routes() {
    const { selectMapHeaderVisible } = useContext(Context);
    const { Navigator, Screen } = createStackNavigator();
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen
                    name="OrphanagesMap"
                    component={OrphanagesMap}
                />

                <Screen
                    name="OrphanageDetail"
                    component={OrphanageDetail}
                    options={{
                        headerShown: true,
                        header: () => <Header cancelButton={false} title="Orfanato" />
                    }}
                />

                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: selectMapHeaderVisible,
                        header: () => <Header cancelButton={true} title="Selecione no mapa" />
                    }}
                />

                <Screen
                    name="OrphanageData1"
                    component={OrphanageData1}
                    options={{
                        headerShown: true,
                        header: () => <Header cancelButton={true} title="Preencha os dados" />
                    }}
                />

                <Screen
                    name="OrphanageData2"
                    component={OrphanageData2}
                    options={{
                        headerShown: true,
                        header: () => <Header cancelButton={true} title="Preencha os dados" />
                    }}
                />

                <Screen
                    name='Success'
                    component={Success}
                    options={{
                        headerShown: false
                    }}
                />

                <Screen
                    name='CreateCancel'
                    component={CreateCancel}
                    options={{
                        headerShown: false
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}