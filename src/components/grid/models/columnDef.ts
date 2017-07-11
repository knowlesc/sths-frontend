export class ColumnDef {
  fieldName: string;
  width?: number;
  maxWidth?: number;
  headerTitle?: string;
  title?: string;
  template?: string;
  sortable?: 'asc' | 'desc';
  centered? = false;
  wrap? = false;
}
