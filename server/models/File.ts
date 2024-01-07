import { Schema, model, Document, SchemaTypes } from "mongoose";

const FileSchema: Schema<any> = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: "" },
  date: { type: Date, default: Date.now() },
  user: { type: SchemaTypes.ObjectId, ref: "User" },
  parent: { type: SchemaTypes.ObjectId, ref: "File", default: null },
  childs: [{ type: SchemaTypes.ObjectId, ref: "File" }],
});

const FileModel = model("File", FileSchema);

export default FileModel;
