import { useContext } from "react";

import HistoryContext from "../storage/HistoryProvider";

function useHistory() {
  return useContext(HistoryContext);
}

export default useHistory;
