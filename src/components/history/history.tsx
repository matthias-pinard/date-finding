import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IHistory {
  id: number;
  time: number;
  nb_response: number;
  total_response: number;
  date: number;
  bad_date: string | undefined;
}

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  useEffect(() => {
    invoke("get_history").then((h: unknown) => setHistory(h as IHistory[]));
  }, []);
  return (
    <div className="flex flex-col">
      <div className="overflow-y-auto">
        {history.reverse().map((h) => (
          <HistoryElement history={h} key={h.id} />
        ))}
        <button
          className="bg-orange-200 rounded-sm py-2 px-4"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

const HistoryElement = ({ history }: { history: IHistory }) => {
  const date = new Date(history.date);
  const win = history.nb_response === history.total_response;
  return (
    <div className="flex justify-center my-3">
      <div
        className={`flex flex-col rounded-sm max-w-sm content-center w-full ${
          win ? "bg-green-200" : "bg-red-200"
        }`}
      >
        {date.toLocaleString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        {history.nb_response}/{history.total_response} {"->"}{" "}
        {Math.round(history.time / 1000)}
        {!win && <div>{history.bad_date?.substring(0, 10)}</div>}
      </div>
    </div>
  );
};
export default History;
