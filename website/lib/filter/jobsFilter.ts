import {
  JobFilters,
  durationFilterTags,
  appDocFilterTags,
  specialReqFilterTags,
  JobFilterTags,
} from "src/lib/extension/jobfilters";

export enum filterState {
  none = 0,
  plus = 1,
  minus = 2,
}

export enum operator {
  and = 0,
  or = 1,
  not = 2,
}

export interface filterStates {
  [JobFilters.durationFilter]: {
    [key in durationFilterTags]: filterState;
  };
  [JobFilters.appDocFilter]: {
    [key in appDocFilterTags]: filterState;
  };
  [JobFilters.specialReqFilter]: {
    [key in specialReqFilterTags]: filterState;
  };
  // Tech
  // Industry
}

export interface formulaNode {
  operator: operator;
  operands: (formulaNode | filter)[];
}

export interface filter {
  category: JobFilters;
  tag: string;
}

export function getFormula(filterStates: filterStates): formulaNode {
  const formula: formulaNode = {
    operator: operator.and,
    operands: [],
  };

  for (const [category, tags] of Object.entries(filterStates)) {
    const subFormula: formulaNode = {
      operator: operator.and,
      operands: [],
    };
    const orFormula: formulaNode = {
      operator: operator.or,
      operands: [],
    };
    const orNotFormula: formulaNode = {
      operator: operator.or,
      operands: [],
    };

    for (const [tag, state] of Object.entries(tags)) {
      const term: filter = {
        category: category as JobFilters,
        tag: tag,
      };

      if (state == filterState.plus) {
        orFormula.operands.push(term);
      } else if (state == filterState.minus) {
        orNotFormula.operands.push(term);
      }
    }
    if (orFormula.operands.length > 0) {
      subFormula.operands.push(orFormula);
    }
    if (orNotFormula.operands.length > 0) {
      subFormula.operands.push({
        operator: operator.not,
        operands: [orNotFormula],
      });
    }

    if (subFormula.operands.length > 0) {
      formula.operands.push(subFormula);
    }
  }

  return formula;
}

export function isJobMatched(
  formula: formulaNode | filter,
  filterTags: JobFilterTags
): boolean {
  if (filterTags === undefined) {
    return false;
  }

  // formulaNode
  if ("operator" in formula) {
    if (formula.operator === operator.and) {
      return formula.operands.every(operand =>
        isJobMatched(operand, filterTags)
      );
    } else if (formula.operator === operator.or) {
      return formula.operands.some(operand =>
        isJobMatched(operand, filterTags)
      );
    } else {
      // Not
      // Should only contain 'or' formula node
      if (formula.operands.length !== 1) {
        throw new Error("invalid number of operands for NOT");
      }

      return !isJobMatched(formula.operands[0], filterTags);
    }
  } else {
    // Filter
    return filterTags[formula.category].includes(formula.tag);
  }
}
