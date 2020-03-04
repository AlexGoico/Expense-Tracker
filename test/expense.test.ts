import { Estimate, Expense, Purchase, RecurringExpense } from "../src/expense";
import { expect } from "chai";

describe("Expense", function () {
  describe("Expense", function () {
    it("is constructible", function () {
      new Expense("expense", "cat");
    });
  });

  describe("Purchase", function () {
    it("is constructible", function () {
      new Purchase("purchase", new Date(), 1, 5.5);
    });
  });

  describe("Estimate", function () {
    it("is constructible", function () {
      new Estimate("Estimate", new Date(), 1, 1);
    });
  });

  describe("RecurringExpense", function () {
    let recur_exp: RecurringExpense = null;

    beforeEach(function () {
      recur_exp = new RecurringExpense("expense", "cat", "Tester");
    });

    it("is constructable", function () {

    });

    it("can add purchases", function () {
      const pur1 = new Purchase("expense", new Date(), 1, 3);
      const pur2 = new Purchase("expense", new Date(), 1, 5);

      [pur1, pur2].forEach(recur_exp.addPurchase, recur_exp);

      expect(recur_exp.purchases).to.be.length(2);
    });

    it("can add estimates", function () {
      const est1 = new Estimate("expense", new Date(), 5, 1);
      const est2 = new Estimate("expense", new Date(), 5, 5);

      [est1, est2].forEach(recur_exp.addEstimate, recur_exp);

      expect(recur_exp.estimates).to.be.length(2);
    });

    it("cannot add estimates with to the wrong expense", function () {
      const msg = "Estimate does not have the same name as recurring expense";
      expect(() => {
        recur_exp.addEstimate(new Estimate("exp2", new Date(), 5, 1));
      }).to.throw(Error, msg);
    });
  });
});
