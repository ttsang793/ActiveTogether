import PleaseWait from "/src/Shared/PleaseWait"
import { Pie, PieChart } from "recharts"

export default function Statistic() {
  const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];

  return (
    <main>
      <h1 className="flex-grow-1 text-center fw-bold">TRANG CHỦ</h1>
      <hr />

      <PieChart width={730} height={250}>
        <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label />
      </PieChart>
    </main>
  )
}