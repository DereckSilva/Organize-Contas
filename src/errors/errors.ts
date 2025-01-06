export class ErrorInvalidPassword extends Error {
  constructor() {
    super('Senha inválida');
  }
}

export class ErrorInvalidOldPassword extends Error {
  constructor() {
    super('Senha atual inválida');
  }
}

export class ErrorFoundUser extends Error {
  constructor() {
    super('Usuário não encontrado');
  }
}

export class ErrorInsertUser extends Error {
  constructor() {
    super('Houve um erro ao realizar a inserção do usuário');
  }
}

export class ErrorUpdateUser extends Error {
  constructor() {
    super('Houve um erro ao realizar a atualização do usuário');
  }
}
