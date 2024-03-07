import { StyleSheet, Text, View, Pressable } from'react-native';
import { Link } from 'expo-router';


export default function App(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome. Login to use all features.</Text>
            <Link href="app/index.js">Home</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
})