import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLLAR_VIEW, SCAN_QR_HOME, SCAN_QR_VIEW } from './src/navigation/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CollarView } from './src/CollarView';
import axios from 'axios';
import { ScanQrView } from './src/ScanQrView';
import HomeView from './src/HomeView';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
    axios.defaults.baseURL = 'http://192.168.1.71:8000';
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={SCAN_QR_HOME}
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
                            headerTitle: 'Collar View',
                            headerStyle: { backgroundColor: 'rgba(34,40,49,0.29)' },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}
