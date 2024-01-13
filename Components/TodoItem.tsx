import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {API_URL} from "../common";

interface TodoItemInterface {
    onDelete: (id: number) => void,
    onMarkDone: (id: number) => void,
    id: number,
    label: string,
    done: boolean
}

export default function TodoItem({ onDelete, onMarkDone, id, label, done }: TodoItemInterface) {

    const handleDeleteTodo = async () => {
        Alert.alert(
            'Confirm Action',
            'Are you sure you want to delete this todo?',
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        const response = await fetch(`${API_URL}/todo/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                            }
                        });
                        if (!response.ok) {
                            console.log(response);
                            alert('ERROR');
                        }

                        const result = await response.json();

                        if (result.success) {
                            onDelete(id)
                        }
                    }
                }
            ]
        );
    }

    const handleMarkDone = async () => {
        const response = await fetch(`${API_URL}/todo/${id}/done`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
            }
        });
        if (!response.ok) {
            console.log(response);
            alert('ERROR');
        }

        const result = await response.json();

        if (result.success) {
            onMarkDone(id)
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handleMarkDone} style={[styles.todo, done && styles.todoDone]}>
            <View style={[ styles.todoItem ]}>
                <Text style={{ color: done? '#FB756A' : '#fff', fontSize: 16 }}>{label}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.deleteButton, { backgroundColor: done? '#FB756A' : '#fff' }]} onPress={handleDeleteTodo}>
                        <Text style={{ color: done? '#FFF' : '#000' }}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo: {
        backgroundColor: '#FB756A',
        borderColor: '#FB756A',
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    todoDone: {
        backgroundColor: '#fff',
        borderColor: '#FB756A'
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deleteButton: {
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 9999,
        paddingHorizontal: 8
    }
});