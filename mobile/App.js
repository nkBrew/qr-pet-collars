import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    COLLAR_VIEW,
    HOME_VIEW,
    SCAN_QR_HOME,
    SCAN_QR_VIEW,
    CREATE_COLLAR_VIEW,
    UPDATE_COLLAR_VIEW,
} from './src/navigation/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CollarView } from './src/CollarView';
import { ScanQrView } from './src/ScanQrView';
import HomeView from './src/HomeView';
import { UpdateCollarView } from './src/UpdateCollarView';
import { CreateCollarView } from './src/CreateCollarView';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={HOME_VIEW}
                        component={HomeView}
                        options={{
                            headerTitle: 'Home View',
                            headerStyle: { backgroundColor: 'rgba(34,40,49,0.29)' },
                        }}
                    />
                    <Stack.Screen
                        name={SCAN_QR_VIEW}
                        component={ScanQrView}
                        options={{
                            headerTitle: 'Scan Qr View',
                            headerStyle: { backgroundColor: 'rgba(34,40,49,0.29)' },
                        }}
                    />
                    <Stack.Screen
                        name={COLLAR_VIEW}
                        component={CollarView}
                        options={{
                            headerTitle: '',
                            headerStyle: { backgroundColor: 'rgba(34,40,49,0.29)' },
                        }}
                    />
                    <Stack.Screen
                        name={UPDATE_COLLAR_VIEW}
                        component={UpdateCollarView}
                        options={{
                            headerTitle: '',
                            headerStyle: { backgroundColor: 'rgba(34,40,49,0.29)' },
                        }}
                    />
                    <Stack.Screen
                        name={CREATE_COLLAR_VIEW}
                        component={CreateCollarView}
                        options={{
                            headerTitle: '',
                            headerStyle: { backgroundColor: 'rgba(34,40,49,0.29)' },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}
