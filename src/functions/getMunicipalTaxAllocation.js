import municipalTaxBudgetAllocation from "../data/municipal-tax-budget";

export default async function getMunicipalTaxBudgetAllocation({ income }) {
    return {
        education: calculateExpense(income, municipalTaxBudgetAllocation.preschoolPrimarySecondaryAndAdultEducation),
        elderlyCare: calculateExpense(income, municipalTaxBudgetAllocation.elderlyCareAndCareForPersonsWithDisabilities),
        individualAndFamilyCare: calculateExpense(income, municipalTaxBudgetAllocation.individualAndFamilyCare),
        cultureAndRecreationalActivities: calculateExpense(income, municipalTaxBudgetAllocation.cultureAndRecreationalActivities),
        infrastructureAndProtection: calculateExpense(income, municipalTaxBudgetAllocation.infrastructureAndProtection),
        otherActivities: calculateExpense(income, municipalTaxBudgetAllocation.otherActivities)
    };
}

function calculateExpense(income, percentage) {
    return income * percentage;
}