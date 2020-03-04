import * as v8n from "v8n";

v8n.extend({
  "date": () => (d: Date) => d instanceof Date
});

class Expense {
  name: string;
  category: string;
  description?: string;
  link?: string;

  constructor(name: string, category: string, description?: string, link?: string) {
    this.name = name;
    this.category = category;
    this.description = description;
    this.link = link;
  }

  static isElseThrow(expense: Expense) {
    v8n().schema({
      "name": v8n().string().not.empty(),
      "category": v8n().string().not.empty(),
      "description": v8n().optional(v8n().string()),
      "link": v8n().optional(v8n().string()),
    }).check(expense);
  }
}

class Purchase {
  name: string;
  date: Date;
  noOfUnits: number;
  price: number;
  pictures: string[];

  constructor(name: string, date: Date, noOfUnits: number, price: number, pictures: string[] = []) {
    this.name = name;
    this.date = date;
    this.noOfUnits = noOfUnits;
    this.price = price;
    this.pictures = pictures;
  }

  static isElseThrow(purchase: Purchase) {
    v8n().schema({
      "name": v8n().string(),
      "date": v8n().date(),
      "noOfUnits": v8n().number(),
      "price": v8n().number(),
      "pictures": v8n().array().every.string(),
    }).check(purchase);
  }
}

class Estimate {
  name: string;
  create_date: Date;
  units_per_cycle: number;
  unit_cost: number;

  constructor(name: string, create_date: Date, units_per_cycle: number, unit_cost: number) {
    this.name = name;
    this.create_date = create_date;
    this.unit_cost = unit_cost;
    this.units_per_cycle = units_per_cycle;
  }

  static isElseThrow(estimate: Estimate) {
    v8n().schema({
      "name": v8n().string(),
      "create_date": v8n().date(),
      "unit_cost": v8n().number(),
      "units_per_cycle": v8n().number()
    }).check(estimate);
  }
}

class RecurringExpense extends Expense {
  name: string;
  expense: Expense;
  owner: string;
  purchases: Purchase[];
  estimates: Estimate[];
  scheduled: boolean;
  props?: Object;


  constructor(name: string, category: string,
              owner: string, description?: string, link?: string) {
    super(name, category, description, link);

    Expense.isElseThrow(this);

    this.name = name;
    this.owner = owner;
    this.purchases = [];
    this.estimates = [];
    this.scheduled = false;
    this.props = {};
  }

  addPurchase(purchase: Purchase) {
    Purchase.isElseThrow(purchase);

    this.purchases.push(purchase);
  }

  addEstimate(estimate: Estimate) {
    Estimate.isElseThrow(estimate);
    if (estimate.name !== this.name) {
      throw new Error(`Estimate does not have the same name as recurring expense ${this.name}`);
    }

    this.estimates.push(estimate);
  }
}

export {
  Purchase, Estimate,
  Expense, RecurringExpense
};
