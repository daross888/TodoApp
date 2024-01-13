import {StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";

interface ButtonInterface {
    onPress: () => void,
    label: string
}

export default function Button({ onPress, label }: ButtonInterface) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#FB756A',
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#FB756A',
        marginLeft: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    }
});