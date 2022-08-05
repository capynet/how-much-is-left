import type Income from "@/models/Income";
import { FirestoreDocs } from "@/services/FirestoreDocs";
import type { Where, OrderBy } from "@/services/FirestoreDocs";

class IncomeService {
  private docsManager: FirestoreDocs;

  constructor() {
    this.docsManager = new FirestoreDocs("incomes");
  }

  async get(id?: string, where?: Where, orderBy?: OrderBy) {
    return await this.docsManager.get<Income>(id, where, orderBy);
  }

  async create(income: Income) {
    // Ensure no "id" gets sent when we create a new document.
    "id" in income && delete income.id;

    return this.docsManager.create<Income>(income);
  }

  async update(income: Income, id: string) {
    return this.docsManager.update<Income>(income, id);
  }

  async delete(id: string) {
    return this.docsManager.delete(id);
  }
}

export default new IncomeService();
