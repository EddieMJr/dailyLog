import { Alert, Button, ScrollView, Text, View } from "react-native";
import styles from "./styles";

export default function ExpenseComponent({ expenses, setExpenses, chartData, setChartData }) {
  return (
    <ScrollView style={{ marginBottom: 80 }}>
      {expenses.map(expense => (
        <ExpenseListTile
          key={expense.id}
          expense={expense}
          expenses={expenses}
          setExpenses={setExpenses}
          chartData={chartData}
          setChartData={setChartData}
        />
      ))}
    </ScrollView>
  );
}

const ExpenseListTile = ({ expense, expenses, setExpenses, chartData, setChartData }) => {
  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete?", [
      {
        text: "Yes",
        onPress: () => {
          const updatedExpenses = expenses.filter(e => e.id !== expense.id);
          setExpenses(updatedExpenses);

          const updatedChartData = chartData.map(item =>
            item.name === expense.category
              ? { ...item, amount: Math.max(item.amount - expense.amount, 0) }
              : item
          );
          setChartData([...updatedChartData]);
        }
      },
      { text: "No" }
    ]);
  };

  return (
    <View style={styles.expenseTile}>
      <Text style={styles.expenseTileText}>{expense.name}</Text>
      <Text style={styles.expenseTileText}>{expense.category}</Text>
      <Text style={styles.expenseTileText}>${expense.amount}</Text>
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};
