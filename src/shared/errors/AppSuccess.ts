class AppSuccess<T> {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly ok: string;
  public readonly json: JSON;
  public readonly objeto: T;

  constructor(message: string, objeto: any = [], statusCode = 200, OK = 'OK') {
    this.message = message;
    this.statusCode = statusCode;
    this.ok = OK;
    this.objeto = objeto;

    const objJson = JSON.stringify(objeto);

    const valor = `{"statusCode":${statusCode},"OK": "${OK}", "message": "${message}", "data":${objJson}}`;
    this.json = JSON.parse(valor);
  }
}

export default AppSuccess;
