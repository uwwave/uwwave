import {
  JobFilters,
  DurationFilterTags,
  AppDocFilterTags,
  SpecialReqFilterTags,
  JobFilterTags,
} from "src/lib/extension/jobFilters";

export enum FilterState {
  none = 0,
  plus = 1,
  minus = 2,
}

export enum FilterOperator {
  and = 0,
  or = 1,
  not = 2,
}

export interface FilterStates {
  [JobFilters.durationFilter]: {
    [key in DurationFilterTags]: FilterState;
  };
  [JobFilters.appDocFilter]: {
    [key in AppDocFilterTags]: FilterState;
  };
  [JobFilters.specialReqFilter]: {
    [key in SpecialReqFilterTags]: FilterState;
  };
}

export interface FormulaNode {
  operator: FilterOperator;
  operands: (FormulaNode | FilterOperand)[];
}

export interface FilterOperand {
  category: JobFilters;
  tag: string;
}

export function getFormula(filterStates: FilterStates): FormulaNode {
  const formula: FormulaNode = {
    operator: FilterOperator.and,
    operands: [],
  };

  for (const [category, tags] of Object.entries(filterStates)) {
    const subFormula: FormulaNode = {
      operator: FilterOperator.and,
      operands: [],
    };
    const orFormula: FormulaNode = {
      operator: FilterOperator.or,
      operands: [],
    };
    const orNotFormula: FormulaNode = {
      operator: FilterOperator.or,
      operands: [],
    };

    for (const [tag, state] of Object.entries(tags)) {
      const term: FilterOperand = {
        category: category as JobFilters,
        tag: tag,
      };

      if (state == FilterState.plus) {
        orFormula.operands.push(term);
      } else if (state == FilterState.minus) {
        orNotFormula.operands.push(term);
      }
    }
    if (orFormula.operands.length > 0) {
      subFormula.operands.push(orFormula);
    }
    if (orNotFormula.operands.length > 0) {
      subFormula.operands.push({
        operator: FilterOperator.not,
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
  formula: FormulaNode | FilterOperand,
  filterTags: JobFilterTags
): boolean {
  if (filterTags === undefined) {
    return false;
  }

  // formulaNode
  if ("operator" in formula) {
    if (formula.operator === FilterOperator.and) {
      return formula.operands.every(operand =>
        isJobMatched(operand, filterTags)
      );
    } else if (formula.operator === FilterOperator.or) {
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
