import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, SafeAreaView, Text, View, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import styles from "./styles";
import Addform from "./addExpense";
import ExpenseComponent from "./expenseComponent";

export default function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const categories = ["Food", "Clothes", "Bills", "Others"];
  const screenWidth = Dimensions.get("window").width;

  // Chart data: numeric amounts only
  const [chartData, setChartData] = useState([
    { name: "Food", amount: 0, color: "#c30010" },
    { name: "Clothes", amount: 0, color: "#0e4c92" },
    { name: "Bills", amount: 0, color: "darkGreen" },
    { name: "Others", amount: 0, color: "#967bb6" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}>
        <Text style={styles.heading}>Native Task Checker</Text>
        <Text style={styles.heading2}>Check your budget and log them daily!</Text>

        {/* PieChart */}
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <PieChart
            data={chartData}
            width={screenWidth * 0.9}
            height={200}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
          />
        </View>

        {/* Custom Legend */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
          {chartData.map(item => (
            <View key={item.name} style={{ flexDirection: "row", alignItems: "center", marginRight: 15, marginBottom: 5 }}>
              <View style={{ width: 15, height: 15, backgroundColor: item.color, marginRight: 5 }} />
              <Text style={{ fontSize: 14 }}>{item.name} (${item.amount})</Text>
            </View>
          ))}
        </View>

        {/* Add Form */}
        {addForm ? (
          <Addform
            name={name}
            setName={setName}
            amount={amount}
            setAmount={setAmount}
            category={category}
            setCategory={setCategory}
            categories={categories}
            expenses={expenses}
            setExpenses={setExpenses}
            chartData={chartData}
            setChartData={setChartData}
            setAddForm={setAddForm}
          />
        ) : (
          <View style={styles.row}>
            <Button onPress={() => setAddForm(true)} color="green" title="Add Expense" />
          </View>
        )}

        {/* Expense list */}
        <ExpenseComponent
          expenses={expenses}
          setExpenses={setExpenses}
          chartData={chartData}
          setChartData={setChartData}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
