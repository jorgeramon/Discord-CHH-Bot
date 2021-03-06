export enum CHHRoles {
  MOD = '483880311004987412',
  ADMIN = '482741985606893568',
  BOT = '781743355725217792',
}

export enum PHCRoles {
  MOD = '797947892790460436',
  ADMIN = '797279536764682240',
  BOT = '797293702695092235',
}

export enum RBERoles {
  MOD = '772885153994244196',
  ADMIN = '772885922311176193',
  BOT = '776466124652019751',
}

export type Roles = typeof CHHRoles | typeof PHCRoles | typeof RBERoles;
