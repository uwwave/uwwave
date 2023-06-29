import { Color } from "src/styles/color";
import { FilterState } from "./jobsFilterEval";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export const getFilterChipIcon = (state: FilterState) => {
  switch (state) {
    case FilterState.plus:
      return <CheckCircleIcon style={{ color: `${Color.primaryButton}` }} />;
    case FilterState.minus:
      return <RemoveCircleIcon style={{ color: "red" }} />;
    case FilterState.none:
      return (
        <RadioButtonUncheckedIcon style={{ color: "gray", padding: "0px" }} />
      );
    default:
      return (
        <RadioButtonUncheckedIcon style={{ color: "white", padding: "0px" }} />
      );
  }
};
