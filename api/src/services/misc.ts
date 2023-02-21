class MiscService {
  constructor() {
    this.clearDataArray = this.clearDataArray.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  public async clearDataArray(data: any[], params: string[]): Promise<any[]> {
    for (const element of data) {
      for (const param of params) {
        if (element[param]) {
          delete element[param];
        }
      }
    }

    return data;
  }

  public async clearData(data: any, params: string[]): Promise<object> {
    for (const element in data) {
      for (const param of params) {
        if (element === param) {
          delete data[element];
        }
      }
    }
    return data;
  }
}

export default MiscService;
