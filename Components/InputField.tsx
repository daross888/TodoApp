import {StyleSheet, Text, TextInput, View} from "react-native";
import {Dispatch, SetStateAction} from "react";

interface InputFieldInterface {
    onChange: Dispatch<SetStateAction<string>>,
    onSubmit: () => void,
    value: string,
    label?: string|null,
    placeholder?: string|undefined
}

export default function InputField({ onChange, onSubmit, value, label = null, placeholder = undefined }: InputFieldInterface) {
    return (
        <View style={{ flex: 1 }}>
            {label? (
                <Text>{label}</Text>
            ) : null}

            <TextInput onSubmitEditing={onSubmit} returnKeyType={'done'} style={styles.input} onChangeText={onChange} value={value} placeholder={placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 8,
        fontSize: 18,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#cecece'
    }
});