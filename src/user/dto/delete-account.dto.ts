import { ObjectType, PartialType } from '@nestjs/graphql';
import { CreateAccountOutput } from './create-account.dto';

@ObjectType()
export class DeleteAccountOutput extends PartialType(CreateAccountOutput) {}
