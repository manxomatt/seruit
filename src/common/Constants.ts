import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export enum ResponseCode {
  OK = 200,
  NOT_FOUND = 404,
}

export enum CurrencyType {
  FIAT = 'FIAT',
  CRYPTO = 'CRYPTO',
}

export enum CurrencyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum IsDefault {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'User Status Enum',
});

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User Role Enum',
});
