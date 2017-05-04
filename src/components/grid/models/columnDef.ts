export class ColumnDef {
  fieldName: string;
  width?: number;
  headerTitle?: string;
  template?: string;
  sortable? = false;
  centered? = false;
}
