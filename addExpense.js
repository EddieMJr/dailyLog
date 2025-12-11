import { Picker } from "@react-native-picker/picker";
import { Button, Text, TextInput, View } from "react-native";
import styles from "./styles";

export default function Addform({
  name, setName,
  amount, setAmount,
  category, setCategory,
  categories,
  expenses, setExpenses,
  chartData, setChartData,
  setAddForm
}) {
  const handleAdd = () => {
    const amountNumber = parseInt(amount);
    if (!name || isNaN(amountNumber) || amountNumber <= 0) {
      alert("Please enter a valid name and amount");
      return;
    }

    const newExpense = { id: Date.now(), name, category, amount: amountNumber };
    setExpenses([...expenses, newExpense]);

    const updatedChartData = chartData.map(item =>
      item.name === category ? { ...item, amount: item.amount + amountNumber } : item
    );
    setChartData([...updatedChartData]);

    setName("");
    setAmount("");
    setCategory("Food");
    setAddForm(false);
  };

  return (
    <View>
      <Text style={styles.heading3}>Add Expense</Text>

      <Text style={styles.label}>Expense Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.textInput} placeholder="Enter expense name" />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        value={amount}
        keyboardType="numeric"
        onChangeText={value => setAmount(value.replace(/[^0-9]/g, ""))}
        style={styles.textInput}
        placeholder="Amount"
      />

      <Text style={styles.label}>Category</Text>
      <Picker selectedValue={category} onValueChange={setCategory} style={styles.textInput}>
        {categories.map((cat, idx) => <Picker.Item key={idx} label={cat} value={cat} />)}
      </Picker>

      <View style={styles.row}>
        <Button title="Add Expense" onPress={handleAdd} />
        <Button title="Cancel" onPress={() => setAddForm(false)} />
      </View>
    </View>
  );
}
