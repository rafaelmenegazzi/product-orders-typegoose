import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 10);

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    //   getters: true,
    // },
  },
})
export abstract class BaseModel {
  @prop({
    default: () => nanoid(),
  })
  _id: string;

  id: string; // _id getter as string

  @prop()
  createdAt: Date; // provided by schemaOptions.timestamps

  @prop()
  updatedAt: Date; // provided by schemaOptions.timestamps
}
