import { CartesianChart, Line } from "victory-native";
type Props = {
  data: [];
};
export default function Chart() {
  const DATA = [
    { xValues: 1, yValues: 10 },
    { xValues: 2, yValues: 30 },
    { xValues: 3, yValues: 20 },
    { xValues: 4, yValues: 40 },
  ];

  //   const DATA = Array.from({ length: 31 }, (_, i) => ({
  //     day: i,
  //     highTmp: 40 + 30 * Math.random(),
  //   }));
  return (
    <CartesianChart data={DATA} xKey={"xValues"} yKeys={["yValues"]}>
      {({ points }) => <Line points={points.yValues} color="red" strokeWidth={3} />}
    </CartesianChart>
  );
}
